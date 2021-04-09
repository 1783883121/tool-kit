import Request from '@/common/request.js'

const zhttp = new Request().Request;

export default class autoPage {
	/**
	 * @param {string}  url  请求地址
	 * @param {string}  limit  美页显示条数
	 * @param {object}  otherArg  请求附带的其他参数
	 */
	constructor(url, limit = 10, otherArg = {}) {
		this.cureentPage = 1;
		this.limit = limit;
		this.dataTolNum = 0;
		this.url = url;
		this.otherArg = otherArg;
		this.dataList = [];
	}
	/**
	 * 请求数据
	 */
	async pagination(isShowCenterLodin=true) {
		let [res] = await zhttp(this.url, {
			page: this.cureentPage,
			limit: this.limit,
			...this.otherArg
		},isShowCenterLodin);
		this.dataList.push(...res.data); //数据赋值
		this.dataTolNum = res.tolNum; //总条数赋值
		return this.dataList;
	}
	// 加载更多
	/**
	 * @param {Boolean} customizeLoadMore  是否使用自定义无数据
	 */
	zloadMore(customizeLoadMore) {
		if (this.cureentPage * this.limit < this.dataTolNum) {
			++this.cureentPage;
			return this.pagination(false);
		} else {
			if (customizeLoadMore) return 'noMore';
			uni.showToast({
				title: '没有更多了~',
				icon: 'none'
			});
		}
	}
}
