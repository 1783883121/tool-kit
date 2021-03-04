<template>
	<view class="acqui-pv-preview" :style="'height:' + windowInfo.screenHeight + 'px'">
		<!-- <view class="header_show"></view> -->

		<movable-area style="width: 100%;height: 100%;">
			<swiper :indicator-dots="true" class="body_show">
				<swiper-item v-for="(item, index) in resourcesList" :key="index">
					<movable-view :scale="true" style="width: 100%;height: 100%;" class="body_show_swiper_item">
						<block v-if="item.type === 'imgs'">
							<image
								:src="item.url"
								:mode="item.imgMode"
								:style="{ height: item.imgMode == 'heightFix' ? '100%' : 0 }"
								lazy-load
								:data-imgindex="index"
								class="preview_img"
								@load="loadImg"
							></image>
						</block>
						<block v-else><video :src="item.url" controls class="preview_video"></video></block>
					</movable-view>
				</swiper-item>
			</swiper>
		</movable-area>

		<!-- <view class="bottom_show"></view> -->
	</view>
</template>

<script>
export default {
	data() {
		return {
			resourcesList: [
				'https://cdjdlhb.cdfytzkj.com/uploads/goods/18821609749030.jpg',
				'https://zmyr.cdfytzkj.com/uploads/file/51861611717505.mp4',
				'https://zmyr.cdfytzkj.com/uploads/goods/image/77671611282302.jpg',
				'https://zmyr.cdfytzkj.com/uploads/goods/image/56851611546894.png',
				'https://cdjdlhb.cdfytzkj.com/uploads/user/avatar/21441611912353.jpg',
				'https://cdjdlhb.cdfytzkj.com/uploads/user/avatar/53811611912380.jpg'
			], //资源列表
			resourcesType: {
				//资源类型配置
				imgs: ['jpeg', 'png'],
				videos: ['mp4']
			},
			windowInfo: {}, //窗口、页面信息
			isFullScreen: false //是否全屏
		};
	},
	onLoad() {
		uni.getSystemInfo({
			success: res => {
				this.windowInfo = res;
			}
		});
		this.resetResourcesList();
	},
	methods: {
		// 重置信息
		resetResourcesList() {
			let resetNewResourcesList = []; //重置后的数组
			let keys = Object.keys(this.resourcesType); //资源类型列表
			this.resourcesList.map(item => {
				let resourcesType = null; //当前的资源类型
				let suffix = item.substring(item.lastIndexOf('.') + 1); //取后缀
				// 后缀分类
				keys.map(item2 => {
					if (this.resourcesType[item2].indexOf(suffix) != -1) {
						resourcesType = item2;
						return;
					}
				});
				resetNewResourcesList.push({
					//重置资源
					url: item,
					type: resourcesType ? resourcesType : 'imgs',
					imgMode: 'widthFix'
				});
			});
			console.log(resetNewResourcesList);
			this.resourcesList = resetNewResourcesList;
		},
		// 图片加载完成
		loadImg(e) {
			console.log(e);
			// 根据图片的大小设置裁剪方式
			if (e.detail.height > this.windowInfo.screenHeight) {
				this.resourcesList[e.target.dataset.imgindex].imgMode = 'heightFix';
			}
			if (e.target.dataset.imgindex >= this.resourcesList.length) {
				this.resourcesList = [...this.resourcesList];
			}
		}
	}
};
</script>

<style lang="stylus" scoped>
.acqui-pv-preview
	display flex
	flex-wrap wrap
	justify-content center
	background-color #000000
	.body_show
		width 750rpx
		height 100%
		.body_show_swiper_item
			display flex
			align-items center
			justify-content center
			.preview_video, .preview_img
				width 750rpx
</style>
