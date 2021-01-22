<template>
	<view class="header" :style="{ 'justify-content': !isDispersion ? 'flex-start' : '', 'padding-top': menuButtonInfo.top + menuButtonInfo.height / 8 + 'px','padding-bottom':'20rpx' }">
		<view class="licon" @click="jump" v-if="Licon"><image :src="Licon" mode="widthFix"></image></view>
		<view class="headerTitle" v-if="HTitle">
			<text>{{ HTitle }}</text>
		</view>
		<block v-if="inputText">
			<view class="searchs">
				<block v-if="isSearch && seachValue">
					<text class="tags" @tap="cancelSearch">{{ seachValue }} ×</text>
				</block>
				<view class="search_inputs">
					<input
						type="text"
						:value="seachValue"
						:style="seachValue == '' && isShowSearchIcon ? 'padding-left:70rpx' : ''"
						placeholder="输入你要搜索的内容"
						class="search_input"
						@tap="focuss"
						@confirm="submitSearch"
					/>
					<image src="/static/icons/search.png" class="search_icon" v-if="seachValue.length == '' && isShowSearchIcon"></image>
				</view>
			</view>
		</block>
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
		inputText: {
			//tab输入框
			type: String
		},
		Licon: {
			//左图标
			type: String,
			default: ''
		},
		HTitle: {
			//主标题
			type: String
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
		},
		isDispersion: {
			type: Boolean,
			default: true
		},
		isShowSearchIcon: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			isSearch: false,
			seachValue: '',
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
		},
		// 搜索
		submitSearch(e) {
			if (e.detail.value.length > 1) {
				this.isSearch = true;
				this.seachValue = e.detail.value;
			}
			this.$emit('submitSearch', { value: e.detail.value });
		},
		focuss() {
			this.isSearch = false;
		},
		// 取消搜素
		cancelSearch() {
			this.seachValue = '';
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
	padding-bottom: 50rpx;
	// height: calc(var(--status-bar-height));
	box-sizing: border-box;
	display: flex;
	align-items: center;
	justify-content: space-between;
	// margin-top: var(--status-bar-height);
	padding: calc(var(--status-bar-height) -10rpx) 40upx 20upx 40upx;
	// padding: var(--status-bar-height) 40upx 0;
	background-color: white;
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
	
	.searchs {
		width: 390rpx;
		height: 64rpx;
		position: relative;
		padding-left: 20rpx;
		.search_inputs {
			position: relative;
			.search_input {
				width: 390rpx;
				height: 64rpx;
				background: #f2f2f2;
				border-radius: 32rpx;
				padding: 0 30rpx;
			}
			.search_icon {
				width: 32rpx;
				height: 32rpx;
				position: absolute;
				left: 20rpx;
				top: 18rpx;
			}
		}
	
		.tags {
			height: 32rpx;
			position: absolute;
			top: 10rpx;
			left: 10rpx;
			padding: 10rpx 20rpx;
			background: #777777;
			border-radius: 26rpx;
			text-align: center;
			line-height: 32rpx;
	
			font-size: 32rpx;
			color: #ffffff;
			z-index: 999;
		}
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
