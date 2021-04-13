<template>
	<view class="acqui_img" :style="{ width: width + 'rpx', height: height + 'rpx' }">
		<image :src="src" :mode="mode" :style="{ width: width + 'rpx', height: height + 'rpx' }" @error="imgError" @load="imgLoad"></image>
		<!-- 加载图片时 -->
		<view class="load_img_sty" :class="loadResult ? 'load_suc' : ''" :style="{ width: width + 'rpx', height: height + 'rpx', 'background-color': loadBgColor }">
			<view class="sk-spinner-wordpress" :class="!isShowLoding ? 'hide_loading' : ''" v-show="width >= 100 && height >= 100"><text class="sk-inner-circle"></text></view>
			<view class="err_img" :class="!isShowLoding ? 'show_img_err' : ''" :style="width < 120 && height < 120 ? 'font-size:20rpx;' : ''">图片走丢了(¬_¬)</view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'acqui-img',
	props: {
		width: {
			type: Number,
			default: 600
		},
		height: {
			type: Number,
			default: 500
		},
		src: {
			type: String
		},
		mode: {
			type: String
		},
		lazyLoad: {
			type: Boolean
		},
		loadBgColor: {
			//加载时的背景颜色
			type: String
		}
	},
	data() {
		return {
			loadResult: false, //图片加载结果  true加载成功
			isShowLoding: true //是否显示加载效果
		};
	},
	methods: {
		imgError(e) {
			// console.log(e);
			let timer = setTimeout(() => {
				clearTimeout(timer);
				this.isShowLoding = false;
			}, 800);
		},
		imgLoad(e) {
			// console.log(e);
			let timer = setTimeout(() => {
				clearTimeout(timer);
				this.loadResult = true;
			}, 500);
		}
	}
};
</script>

<style lang="less" scoped>
.acqui_img {
	position: relative;
	.load_img_sty {
		padding: 10rpx;
		background-color: #d6d6d6;
		display: flex;
		align-items: center;
		justify-content: center;
		position: absolute;
		top: 0px;
		left: 0px;
		z-index: 1;
		.sk-spinner-wordpress {
			background-color: #33333330;
			width: 60rpx;
			height: 60rpx;
			border-radius: 60rpx;
			position: relative;
			margin: 0 auto;
			animation: sk-innerCircle 1s linear infinite;
		}

		.sk-inner-circle {
			display: block;
			background-color: #fff;
			width: 16rpx;
			height: 16rpx;
			position: absolute;
			border-radius: 16rpx;
			top: 10rpx;
			left: 10rpx;
		}
		@keyframes sk-innerCircle {
			0% {
				transform: rotate(0);
			}
			100% {
				transform: rotate(360deg);
			}
		}

		@keyframes sk-innerCircle {
			0% {
				transform: rotate(0);
			}
			100% {
				transform: rotate(360deg);
			}
		}
	}

	.load_suc {
		animation: hidees 1.5s linear forwards;
	}
	.hide_loading {
		display: none;
	}
	.err_img {
		text-align: center;
		display: none;
		color: gray;
	}
	.show_img_err {
		display: inline-block;
		animation: showErr 1s linear forwards;
		@keyframes showErr {
			0% {
				opacity: 0;
			}
			100% {
				opacity: 1;
			}
		}
	}
	@keyframes hidees {
		0% {
			opacity: 1;
		}
		100% {
			opacity: 0;
			display: none;
		}
	}
}
</style>
