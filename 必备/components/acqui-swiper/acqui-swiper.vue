<template>
	<view>
		<swiper :style="'height:' + swiperHeight" style="overflow: hidden;" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
			<swiper-item v-for="(item, index) in imgUrls" :key="index"><image class="swiper_img" :src="item.pic?item.pic:item" mode="aspectFill" :style="imgStyle" @tap="swiperImgClick(item)"></image></swiper-item>
		</swiper>
	</view>
</template>
<script>
export default {
	props: {
		swiperHeight: {
			type: String,
			default: '500rpx'
		},
		imgStyle: {
			type: String
		},
		imgUrls: {
			type: Array
		},
		indicatorDots: {
			type: Boolean,
			default: true
		},
		autoplay: {
			type: Boolean,
			default: true
		},
		interval: {
			type: Number,
			default: 2000
		},
		duration: {
			type: Number,
			default: 500
		}
	},
	data() {
		return {};
	},
	methods: {
		/**Swiper图片被点击
		 * @param {Object} imgUrl 点击的图片路径
		 */
		swiperImgClick(imgInfo) {
			this.$emit('swiperImgClick', { imgInfo: imgInfo });
		}
	}
};
</script>

<style>
	.swiper_img{
		border-radius: 15rpx;
	}
</style>
