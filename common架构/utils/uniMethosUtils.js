const uniUtils = class UniMethosUtils {
	constructor() {

	}
	/**
	 * @description 获取节点信息
	 * @param {IDString} select 选择器
	 * @param {object} _this 当前页面实例
	 * @returns {Promise} 返回节点信息
	 */
	node(select, _this) { 
		return new Promise((resolv) => {
			const query = uni.createSelectorQuery().in(_this);
			query
				.select(select)
				.boundingClientRect((data) => {
					resolv(data);
				})
				.exec();
		});
	};


	/**
	 * @description 地图直线距离计算
	 * @param {number|string} lat2 纬度
	 * @param {number|string} lng2 经度
	 * @returns {Promise} 返回两端之间的距离,单位米
	 */
	straightDistance(lat2, lng2) {
		return new Promise((resolv) => {
			uni.getLocation({
				type: 'gcj02',
				success: (res) => {
					let EARTH_RADIUS = 6378137.0;
					let PI = Math.PI;

					function getRad(d) {
						return (d * PI) / 180.0;
					}
					let radLat1 = getRad(res.latitude);
					let radLat2 = getRad(lat2);
					let a = radLat1 - radLat2;
					let b = getRad(res.longitude) - getRad(lng2);
					let s =
						2 *
						Math.asin(
							Math.sqrt(
								Math.pow(Math.sin(a / 2), 2) +
								Math.cos(radLat1) *
								Math.cos(radLat2) *
								Math.pow(Math.sin(b / 2), 2)
							)
						);
					s = s * EARTH_RADIUS;
					s = Math.round(s * 10000) / 10000.0;
					resolv(Math.floor(s)); // m
				},
			});
		});
	};

	/**
	 * @description 页面实例获取
	 * @param { Number | String } num 默认获取上一页面实例，数字几就返回前几页的实例
	 * @return {Object} 返回页面实例
	 */
	getPageInstance(num = 1) {
		const pages = getCurrentPages();
		return pages[pages.length - 1 - num].$vm;
	};
	/**
	 * 返回上一页
	 * @delta {Number} 延迟时间
	 */
	returnBeforePage(delta=1000) {
		let timer = setTimeout(() => {
			clearTimeout(timer);
			uni.navigateBack({
				delta: 1
			});
		}, delta);
	};
	/**
	 * 调用微信支付
	 */
	requestPay(obj) {
		let payResult = new Promise(resolve => {
			uni.requestPayment({
				provider: 'wxpay',
				timeStamp: obj.timestamp,
				nonceStr: obj.nonceStr,
				package: obj.package,
				signType: obj.signType,
				paySign: obj.paySign,
				success: function(res) {
					console.log('success:' + JSON.stringify(res));
					resolve({code:200});
				},
				fail: function(err) {
					console.log(err);
					resolve(err);
				}
			});
		});
		return payResult;
	};

	/**
	 * 微信授权订阅消息
	 */
	applySubscribeMessage() {
		return new Promise(resolve => {
			uni.requestSubscribeMessage({
				tmplIds: ['6ID1rhJpYvepKmMylAuqcfH8RPSeYxwt_Ix-u7ZBOCw'],
				success: res => {
					console.log(res);
					if (Object.values(res).indexOf('reject') >= 0) {
						// 授权被拒绝
						uni.showModal({
							title: '提示',
							content: '您拒绝了订阅消息的授权，您将接受不到来自官方的消息信息，是否重新授权',
							success: response => {
								if (response.confirm) {
									uni.requestSubscribeMessage({
										tmplIds: ['6ID1rhJpYvepKmMylAuqcfH8RPSeYxwt_Ix-u7ZBOCw'],
										success: res => {
											console.log(res);
										},
										complete() {
											resolve();
										}
									});
								} else {
									resolve();
								}
							},

						});
					} else {
						uni.showToast({
							title: '授权成功！',
							icon: "none"
						});
						resolve();
					}
				}
			});
		})
	};
	/**
	 * @param {Object} urls 跳转地址
	 */
	uniNavigator(urls) {
		uni.navigateTo({
			url: urls
		})
	}
}
module.exports={
	uniUtils
}