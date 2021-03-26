import config from '@/common/config/config.js'
import reqFilter from '@/common/config/req-filter-config.js'
import Vue from 'vue';

const COMMONURL = config.api_base_url; //公共路径 
const LOGINURL = config.api_login_url; //登录接口
const FILEUPLOADURL = config.file_upload_url; //文件上传接口

const filter = new reqFilter();//filter

// post请求封装
/**
 * 
 * @param {请求地址} url 
 * @param {请求的数据} requestData 
 * @param {请求类型："POST" /  "GET" 默认为 "POST" } requestType 
 */
function Request(url, requestData = {}, requestType = "POST") {
	uni.showLoading({
		title: "正在加载中..."
	});
	let requestHeader = {};
	if (requestType === "POST") {
		requestHeader = {
			"content-type": "application/json",
			// openid: uni.getStorageSync('userinfo').openid,
			// token: uni.getStorageSync('userinfo').token
		}
	}
	try {
		requestData.openid = uni.getStorageSync('userInfos').openid;
		requestData.token = uni.getStorageSync('userInfos').token;
	} catch (e) {

	}

	let promise = new Promise((resolve, reject) => {
		uni.showLoading({
			mask: true,
			title: "正在加载中~"
		})
		uni.request({
			url: COMMONURL + url,
			data: requestData,
			method: requestType,
			header: requestHeader,
			success: async (res) => {
				filter.systemCodeFilter(res.statusCode);
				filter.resCodeFilter(res.data.code);
				resolve([res.data]);
			},
			complete() {
				uni.hideLoading();
			},
			error: function (e) {
				reject("网络出错");
			}
		});
	});
	return promise;
}
/**
 * 微信授权登录
 * 
 */
function logins() {
	uni.showLoading({
		title: "正在登陆中！！！"
	});
	let promis = new Promise((resolve, reject) => {
		uni.login({
			provider: 'weixin',
			success: res2 => {
				resolve(res2);
			},
			fail: () => {
				uni.showToast({
					title: '微信登录授权失败',
					icon: 'none'
				});
				return;
			},
			complete() {
				uni.hideLoading();
			}
		});
	}).then(res => {
		return new Promise(resolve => {
			uni.getUserInfo({
				provider: 'weixin',
				success: info => {
					//这里请求接口
					// console.log(info);
					let authorizeInfos = info.userInfo;
					authorizeInfos.jscode = res.code;
					resolve(authorizeInfos);
				},
				fail: () => {
					uni.showToast({
						title: '微信登录授权失败',
						icon: 'none'
					});
					return;
				},
				complete() {
					uni.hideLoading();
				}
			});
		})

	}).then(res => {
		return new Promise(resolve => {
			uni.request({
				method: "POST",
				url: COMMONURL + LOGINURL,
				data: {
					js_code: res.jscode,
					nickname: res.nickName,
					avatar: res.avatarUrl,
					gender: res.gender,
					country: res.country,
					province: res.province,
					city: res.city,
					language: res.language
				},
				success: (ress) => {
					if (ress.data.code === 200) {
						// 登陆成功
						uni.setStorageSync('userInfos', ress.data.data);
						Vue.prototype.$User = ress.data.data;
						uni.showToast({
							title: "授权成功！！",
							icon: "none",
							success() {
								// console.log("授权成功！！");
								resolve("1");
							}
						})
					} else {
						// 登陆失败，清除授权信息
						uni.showToast({
							title: ress.msg,
							icon: 'none',
							success() {
								resolve("0");
							}
						});
					}
				},
				complete(ress) {
					uni.hideLoading();
				}
			})
		})
	});
	return promis;
}


// 文件上传
async function uploadFileInfos(uploadMaxNum) {
	return new Promise(resolve => {
		uni.chooseImage({
			count: uploadMaxNum, //默认9
			success: chooseImageRes => {
				const tempFilePaths = chooseImageRes.tempFilePaths;
				const uploadTask = uni.uploadFile({
					url: COMMONURL + FILEUPLOADURL, //仅为示例，非真实的接口地址
					filePath: tempFilePaths[0],
					name: 'file',
					header: {
						"content-type": "multipart/form-data",
					},
					formData: {
						path: 'goods'
					},
					success: uploadFileRes => {
						// console.log(uploadFileRes.data);
						// console.log(JSON.parse(uploadFileRes.data));
						resolve(JSON.parse(uploadFileRes.data));
					}
				});
				uploadTask.onProgressUpdate(res => {
					// console.log('上传进度' + res.progress);
					// console.log('已经上传的数据长度' + res.totalBytesSent);
					// console.log('预期需要上传的数据总长度' + res.totalBytesExpectedToSend);
					let showInfo = '';
					if (res.progress <= 3) {
						showInfo = '开始上传';
					} else if (res.progress > 3 && res.progress < 98) {
						showInfo = `已上传${res.progress}%`;
					} else {
						showInfo = `即将完成`;
					}
					uni.showLoading({
						title: showInfo
					});
					if (res.progress === 100) {
						let timer = setTimeout(() => {
							uni.hideLoading();
							uni.showToast({
								title: "上传成功"
							});
							clearTimeout(timer);
						}, 1000);
					}
				});
			}
		});
	})
}


module.exports = {
	Request,
	logins,
	uploadFileInfos
};
