<template>
	<view class="reachBottom_tips">
		<block v-if="noDataTips">
			<view class="no_data">{{ noDataTips }}</view>
		</block>
		<view class="preloader_4" v-show="isShowLoadMore && !noDataTips">
			<text></text>
			<text></text>
			<text></text>
		</view>
	</view>
</template>

<script>
export default {
	name: 'reachBottom-tips',
	props: {
		noDataTips: {
			type: String,
			default: ''
		}
	},
	data() {
		return {
			isShowLoadMore: true
		};
	},
	created() {
		const query = uni.createSelectorQuery().in(this);
		query
			.select('.reachBottom_tips')
			.boundingClientRect(data => {
				if (data.top < 750) {
					this.isShowLoadMore = false;
				}
			})
			.exec();
		let timer = setInterval(() => {
			query
				.select('.reachBottom_tips')
				.boundingClientRect(data => {
					if (data.top > 750) {
						clearInterval(timer);
						this.isShowLoadMore = true;
					}
				})
				.exec();
		}, 2000);
	}
};
</script>

<style lang="less">
.reachBottom_tips {
	line-height: 50rpx;
	color: gray;
	font-size: 30rpx;
	height: 50rpx;
	padding-bottom: 10rpx;
	.no_data {
		text-align: center;
	}
}

.preloader_4 {
	position: relative;
	left: 45%;
}
.preloader_4 text {
	position: absolute;
	width: 20px;
	height: 20px;
	background: #3498db;
	opacity: 0.5;
	border-radius: 20px;
	animation: preloader_4 1s infinite ease-in-out;
}
.preloader_4 text:nth-child(2) {
	left: 20px;
	animation-delay: 0.2s;
}
.preloader_4 text:nth-child(3) {
	left: 40px;
	animation-delay: 0.4s;
}
.preloader_4 text:nth-child(4) {
	left: 60px;
	animation-delay: 0.6s;
}
.preloader_4 text:nth-child(5) {
	left: 80px;
	animation-delay: 0.8s;
}
@keyframes preloader_4 {
	0% {
		opacity: 0.3;
		transform: translateY(0px);
		box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.1);
	}
	50% {
		opacity: 1;
		transform: translateY(-10px);
		background: #f1c40f;
		box-shadow: 0px 20px 3px rgba(0, 0, 0, 0.05);
	}
	100% {
		opacity: 0.3;
		transform: translateY(0px);
		box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.1);
	}
}
</style>
