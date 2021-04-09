<template>
	<view class="page-warp">
		<view class="top-warp">
			<text v-for="(tab, i) in tabs" :key="i" :class="{ active: curIndex === i }" @click="changeTab(i)">{{ tab }}</text>
		</view>

		<swiper class="swiper" :current="curIndex" @change="swiperChange">
			<!--全部 -->
			<swiper-item><mescroll-item :i="0" :index="curIndex"></mescroll-item></swiper-item>

			<!-- 奶粉 -->
			<swiper-item><mescroll-item :i="1" :index="curIndex"></mescroll-item></swiper-item>

			<!-- 面膜 -->
			<swiper-item><mescroll-item :i="2" :index="curIndex"></mescroll-item></swiper-item>

			<!-- 图书 -->
			<swiper-item><mescroll-item :i="3" :index="curIndex"></mescroll-item></swiper-item>
		</swiper>
	</view>
</template>

<script>
import MescrollItem from './mescroll-swiper-item.vue';

export default {
	components: {
		MescrollItem
	},
	data() {
		return {
			tabs: ['全部', '已预约', '进行中', '已完成', '已取消'],
			curIndex: 0 // 当前tab的下标
		};
	},
	methods: {
		// 轮播菜单
		swiperChange(e) {
			this.changeTab(e.detail.current);
		},
		// 切换菜单
		changeTab(i) {
			this.curIndex = i;
		}
	}
};
</script>
<style>
/* 需固定高度 */
page,
.page-warp,
.swiper {
	height: 100%;
}
</style>
<style lang="less" scoped>
.top-warp {
	z-index: 9990;
	position: fixed;
	top: --window-top; /* css变量 */
	left: 0;
	width: 100%;
	height: 60upx;
	background-color: #F5F5F5;
	text-align: center;
	border-bottom: 1upx solid #ddd;
	display: flex;
	justify-content: space-around;
	align-items: center;
	font-size: 28upx;
	padding: 25rpx 0 20rpx 0;
}

.top-warp .active {
	color: #2BC47E;
}
</style>
