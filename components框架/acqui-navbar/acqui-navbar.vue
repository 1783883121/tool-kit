<template>
	<view class="acqui_navbar" :style="'padding-top:' + (menuButtonInfo.top+(menuButtonInfo.height/6)) + 'px'">
		<image src="/static/icons/left_arrow.png" class="left_arrow"></image>
	</view>
</template>

<script>
export default {
	props: {
		
	},
	data() {
		return {
			menuButtonInfo: {}
		};
	},
	created() {
		let menuButtonInfo = uni.getMenuButtonBoundingClientRect();
		console.log(menuButtonInfo);
		this.menuButtonInfo = menuButtonInfo;
	},
	methods: {
		
	}
};
</script>

<style lang="stylus" scoped>
.acqui_navbar
	padding 0 30rpx
	padding-bottom 30rpx
	background-color #2BC47E
	.left_arrow
		width 21rpx
		height 36rpx
</style>
