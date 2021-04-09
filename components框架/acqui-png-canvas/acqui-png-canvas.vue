<template>
	<view class="acqui_png_canvas" @longpress="savaQr">
		<canvas :style="{ width: canvasWidth + 'px', height: canvasHeight + 'px' }" canvas-id="qr_canvas"></canvas>
	</view>
</template>

<script>
export default {
	props: {
		canvasWidth: {
			type: Number,
			default: 200
		},
		canvasHeight: {
			type: Number,
			default: 200
		},
		imgBase64: {
			//base64数据
			type: String
		},
		imgWidth: {
			type: Number,
			default: 200
		},
		imgHeight: {
			type: Number,
			default: 200
		},
		canvasBgColor: {
			//canvas背景颜色
			type: String,
			default: '#ffffff'
		},
		isLongTapSave: {
			// 是否长按保存
			type: Boolean,
			default: true
		}
	},
	created() {
		let base64 = this.imgBase64.replace(/^data:image\/\w+;base64,/, ''); //去掉data:image/png;base64,
		let filePath = wx.env.USER_DATA_PATH + '/hym_pay_qrcode.png';
		uni.getFileSystemManager().writeFile({
			filePath: filePath, //创建一个临时文件名
			data: base64, //写入的文本或二进制数据
			encoding: 'base64', //写入当前文件的字符编码
			success: res => {
				// 绘制
				const ctx = uni.createCanvasContext('qr_canvas', this);
				ctx.setFillStyle(this.canvasBgColor);
				ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
				ctx.drawImage(filePath, this.canvasWidth / 2 - this.imgWidth / 2, this.canvasHeight / 2 - this.imgHeight / 2, this.imgWidth, this.imgHeight);
				ctx.draw(true);
			},
			fail: err => {}
		});
	},
	methods: {
		/**
		 * e  		事件对象   传 null 或者  ''  即可
		 * isSave  是否保存 一般用于不允许长按保存而使用按钮驱动来保存
		 */
		savaQr(e, isSave = false) {
			if (!this.isLongTapSave && !isSave) {
				this.$emit('canvasLongTap');
				return;
			}
			// 申请授权
			new Promise(resolve => {
				uni.getSetting({
					success: res => {
						if (res.authSetting['scope.writePhotosAlbum']) {
							this.canvasToImg();
							resolve(true);
						} else {
							resolve(false);
						}
					}
				});
			}).then(result => {
				if (!result) {
					uni.authorize({
						scope: 'scope.writePhotosAlbum',
						success() {
							this.canvasToImg();
						},
						fail(err) {
							uni.showModal({
								content: '您拒绝了保存图片的授权，是否重新授权？',
								success: res2 => {
									if (res2.confirm) {
										uni.openSetting({
											success(res) {
												console.log(res.authSetting);
											},
											complete(e) {
												console.log(e);
											}
										});
									}
								}
							});
						}
					});
				}
			});
		},
		// canvas保存成图片
		canvasToImg() {
			uni.canvasToTempFilePath(
				{
					x: 0,
					y: 0,
					canvasId: 'qr_canvas',
					success: res => {
						// 在H5平台下，tempFilePath 为 base64
						this.saveImageToPhotosAlbum(res.tempFilePath);
					},
					fail(err) {
						uni.showToast({
							title: '保存失败！',
							icon: 'none'
						});
					}
				},
				this
			);
		},
		// 保存至系统相册
		saveImageToPhotosAlbum(path) {
			uni.saveImageToPhotosAlbum({
				filePath: path,
				success: () => {
					uni.showToast({
						title: '保存成功！',
						icon: 'none'
					});
				},
				fail: () => {
					uni.showToast({
						title: '保存失败！',
						icon: 'none'
					});
				}
			});
		}
	}
};
</script>

<style>
.acqui_png_canvas {
	display: flex;
}
</style>
