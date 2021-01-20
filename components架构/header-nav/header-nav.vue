<template>
	<view class="header" :style="'padding-top:' + (menuButtonInfo.top+(menuButtonInfo.height/6)) + 'px'">
		<view class="licon" @click="jump"><image :src="Licon" mode="widthFix"></image></view>
		<view class="headerTitle">
			<text>{{ HTitle }}</text>
		</view>
		<view class="ricon" @click="jum">
			<view class="subtitle">
				<text>{{ SubTitle }}</text>
			</view>
			<view class="subicon" v-if="Subicon"><image :src="Subicon" mode="widthFix"></image></view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		Licon: {
			//右图标
			type: String,
			default: ''
		},
		HTitle: {
			//主标题
			type: String,
			default: ''
		},
		SubTitle: {
			//副标题
			type: String,
			default: ''
		},
		Subicon: {
			//副图标
			type: String,
			default: ''
		},
		url_l: {
			//左边的跳转地址
			type: String,
			default: null
		},
		url: {
			//右边跳转地址
			type: String,
			default: ''
		},
		otherData: {
			//跳转时要带的参数
			type: [String, Number, Array, Object],
			default: ''
		}
	},
	data: {},
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
		jump() {
			//左边返回按钮
			if (this.url_l) {
				uni.reLaunch({
					url: this.url_l
				});
				console.log(this.url_l);
			} else {
				uni.navigateBack({
					delta: 1
				});
				console.log('history');
			}

			// history.go(-1);
			// history.back();
		},
		jum() {
			//右边的的页面跳转，有时候可能要带参数跳转，如果不需要跳转可以不传url则只传一个触发事件
			if (this.url) {
				if (this.otherData) {
					uni.navigateTo({
						url: this.url + `?otherData=${this.otherData}`
					});
				} else {
					uni.navigateTo({
						url: this.url
					});
				}
			} else {
				this.$emit('Click');
			}
		}
	}
};
</script>

<style lang="scss">
.header {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	padding: 20rpx;
	padding-bottom: 30rpx;
	// height: calc(var(--status-bar-height));
	box-sizing: border-box;
	display: flex;
	align-items: center;
	justify-content: space-between;
	// margin-top: var(--status-bar-height);
	padding: calc(var(--status-bar-height) -10rpx) 40upx 20upx 40upx;
	// padding: var(--status-bar-height) 40upx 0;
	background-color: #2bc47e;
	// border-bottom: 1upx solid #efefef;
	z-index: 50;

	.licon {
		// margin-right: 50upx;
		width: 20%;
		height: 0;
		display: flex;
		align-items: center;

		image {
			width: 30%;
		}
	}

	.headerTitle {
		width: 60%;
		text-align: center;
		// padding-left:20upx ;
		font-size: 36rpx;
		font-weight: bold;
		color: #ffffff;
		// line-height: calc(var(--status-bar-height) + 100upx);
	}

	.ricon {
		display: flex;
		justify-content: flex-end;
		align-items: center;
		text-align: right;
		width: 20%;

		.subtitle {
			text-align: right;
		}

		.subicon {
			width: 30%;
			// height: 40upx;
			// margin-left: 10upx;
			// text-align: center;
			display: flex;
			align-items: center;
			justify-content: center;
			/* image{
					width: 100%;
					height: 100%;
				} */
		}
	}
}
</style>
