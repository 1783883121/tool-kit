<template>
	<view class="acqui_navbar_input" :style="{ 'padding-top': menuButtonInfo.top + menuButtonInfo.height / 9 + 'px', 'border-bottom': '1px solid ' + borderColor }">
		<image src="/static/icons/left_arrow.png" class="left_arrow" v-if="isShowLeftArrow" @tap="returnBeforPage"></image>
		<view class="search_inputs">
			<block v-if="isSearch && seachValue">
				<text class="tags" @tap="cancelSearch">{{ seachValue }} ×</text>
			</block>
			<input
				type="text"
				:value="seachValue"
				:style="{
					width: isShowLeftArrow ? '85%' : '90%',
					'padding-left': seachValue == '' && isShowSearchIcon ? '60rpx' : '',
					'padding-right': seachValue != '' && isShowSearchIcon ? '60rpx' : '',
					'background-color': inputBackground
				}"
				:placeholder="inputPlaceholder"
				class="search_input"
				@tap="focuss"
				@confirm="submitSearch"
			/>
			<image src="/static/icons/search.png" class="search_icon" v-if="seachValue.length == 0 && isShowSearchIcon"></image>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		isShowLeftArrow: {
			type: Boolean,
			default: true
		},
		isShowSearchIcon: {
			type: Boolean,
			default: false
		},
		borderColor: {
			type: String,
			default: 'rgba(0,0,0,0)'
		},
		inputBackground: {
			type: String,
			default: '#f2f2f2'
		},
		inputPlaceholder: {
			type: String,
			default: '输入你要搜索的内容'
		},
		inputVal: {
			type: String
		}
	},
	data() {
		return {
			isSearch: false,
			seachValue: '',
			menuButtonInfo: {} //右上角胶囊信息
		};
	},
	created() {
		let menuButtonInfo = uni.getMenuButtonBoundingClientRect();
		console.log(menuButtonInfo);
		this.menuButtonInfo = menuButtonInfo;
	},
	methods: {
		// 搜索
		submitSearch(e) {
			if (e.detail.value.length > 1) {
				this.isSearch = true;
				this.seachValue = e.detail.value;
			}
			this.$emit('submitSearch', { value: e.detail.value });
		},
		// 清除搜索词
		cancelSearch() {
			this.seachValue = '';
			this.$emit('clearSearch');
		},
		returnBeforPage() {
			uni.navigateBack({
				delta: 1
			});
		},
		focuss() {
			this.isSearch = false;
		}
	},
	watch: {
		inputVal(val) {
			this.seachValue = val;
			this.isSearch = true;
		}
	}
};
</script>

<style lang="stylus" scoped>
.acqui_navbar_input
	width 100%
	display flex
	align-items center
	padding 0 30rpx
	background-color white
	position fixed
	top 0px
	left 0px
	padding-bottom 30rpx
	.left_arrow
		width 21rpx
		height 31rpx
		margin-right 20rpx
	.search_inputs
		height 64rpx
		position relative
		.search_input
			width 70%
			height 64rpx
			border-radius 32rpx
			padding 0 30rpx
			font-size 32rpx
		.search_icon
			width 32rpx
			height 32rpx
			position absolute
			left 20rpx
			top 18rpx
		.tags
			height 32rpx
			position absolute
			top 10rpx
			left 10rpx
			padding 10rpx 20rpx
			background #777777
			border-radius 26rpx
			text-align center
			line-height 32rpx
			font-size 32rpx
			color #ffffff
			z-index 999
</style>
