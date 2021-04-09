<!-- 使用需先在App.vue中设置globalData.isFirstJoin=true;   通过设置其为true来显示和false隐藏 -->
<template>
	<view class="acqui_ad_popup" v-if="isFirstJoin">
		<view class="ad_continor">
			<!-- ad大图 -->
			<image src="https://cdjdlhb.cdfytzkj.com/uploads/89901614851130.gif" lazy-load class="ad_img" @tap="adTap"></image>
			<!-- 关闭按钮 -->
			<image src="/static/close_icon.png" class="close_icon" @tap="closeAd"></image>
			<!-- 分享/其他按钮 -->
			<view class="share_btn">
				<block v-if="isShare && (isNeedLogin ? isLogin : true)"><button open-type="share"></button></block>
				<block v-else><button @tap.stop="adBtnTap"></button></block>
			</view>
		</view>
		<!-- 倒计时 -->
		<view class="count_down_time" v-if="isShowCountdown">{{ autoCloseTimeLocal }}</view>
	</view>
</template>

<script>
export default {
	props: {
		autoCloseTime: {
			//自动关闭时长单位(s)  0 代表无  isShowCountdown必须为true才能显示
			type: Number
		},
		isShowCountdown: {
			//是否显示倒计时
			type: Boolean,
			default: false
		},
		isNeedLogin: {
			//是否需要验证登录
			type: Boolean,
			default: true
		},
		isLogin: {
			// 是否登录
			type: Boolean,
			default: true
		},
		isShare: {
			//是否是分享操作
			type: Boolean,
			default: true
		}
	},
	data() {
		return {
			isFirstJoin: false,
			autoCloseTimeLocal: null //自动关闭时长
		};
	},
	mounted() {
		let isFirstJoin = getApp().globalData.isFirstJoin;
		this.isFirstJoin = isFirstJoin;
		if (isFirstJoin) {
			uni.hideTabBar();
			// 刚进小程序
			if (this.autoCloseTime != 0) {
				this.autoCloseTimeLocal = this.autoCloseTime;
				let timer2 = setInterval(() => {
					// 倒计时
					this.autoCloseTimeLocal = this.autoCloseTimeLocal - 1;
				}, 1000);
				// 倒计时自动关闭
				let timer = setTimeout(() => {
					clearTimeout(timer);
					clearInterval(timer2);
					this.closeAd();
				}, this.autoCloseTime * 1000);
			}
		}
	},
	methods: {
		// 关闭
		closeAd() {
			this.isFirstJoin = false;
			getApp().globalData.isFirstJoin = false;
			uni.showTabBar({
				animation: true
			});
		},
		// ad整张图片被点击
		adTap() {
			console.log('ad点击');
			this.$emit('adTap');
		},
		// ad非分享按钮点击
		adBtnTap() {
			console.log('ad按钮点击');
			this.$emit('adBtnTap');
		}
	}
};
</script>

<style lang="stylus" scoped>
.acqui_ad_popup
	width 100vw
	height 100vh
	background-color rgba(0, 0, 0, 0.5)
	position fixed
	left 0px
	top 0px
	z-index 9999
	display flex
	flex-direction column
	justify-content center
	align-items center
	.ad_continor
		position relative
		.ad_img
			width 661rpx
			height 750rpx
			margin-left -40rpx
		.close_icon
			width 40rpx
			height 40rpx
			position absolute
			top -15rpx
			right -20rpx
		.share_btn
			position absolute
			bottom 100rpx
			display flex
			align-items center
			width 100%
			opacity 0
			&>button
				width 300rpx
				height 80rpx
	.count_down_time
		width 50rpx
		height 50rpx
		border-radius 50%
		border 2px solid #EAEEF1
		background-color #999999
		position absolute
		top 100rpx
		left 50rpx
		font-size 30rpx
		font-family 'Times New Roman', Times, serif
		color white
		text-align center
		line-height 50rpx
</style>
