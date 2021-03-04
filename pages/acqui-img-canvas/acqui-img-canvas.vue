<template>
	<view><canvas style="width: 22px; height: 22px;" canvas-id="firstCanvas" id="firstCanvas"></canvas></view>
</template>

<script>
export default {
	data() {
		return {};
	},
	onReady: function(e) {
		let ctx = uni.createCanvasContext('firstCanvas');
		let imgWidth=0,imgHeight=0;
		
		uni.getImageInfo({
			src:"/static/imgs/bg.png",
			success: (res) => {
				console.log(res);
				imgWidth=res.width;
				imgHeight=res.height;
			}
		})
		
		
		ctx.drawImage("/static/imgs/bg.png",0,0,imgWidth,imgHeight);
		ctx.draw(false,()=>{
			uni.canvasGetImageData({
				canvasId: 'firstCanvas',
				x: 0,
				y: 0,
				width: imgWidth,
				height: imgHeight,
				success: res => {
					console.log(res);
			
					let colorArr = [];
			
					let imgObj = res.data; //图像的rgba数组对象
					let colorObjList = []; //rgba列表
					let colorObj = []; //当前rgba
					let ctxX = 0; //当前ctx  x轴坐标
					let ctxY = 0; //当前ctx  x轴坐标
			
					console.time('map'); 
					imgObj.map((item, index) => {
						colorObj.push((index + 1) % 4 === 0?(item/255):item);
						if ((index + 1) % 4 === 0) {
							++ctxX;
							// colorObjList.push(colorObj);
							if (ctxX >= res.width) {
								ctxX = 0;
								++ctxY;
							}
							ctx.setFillStyle('rgba(' + [...colorObj] + ')');
							ctx.fillRect(ctxX, ctxY, 1, 1);
							ctx.draw(true);
							colorObj = []; //重置当前rgb
						}
						
						if(index==5) return;
					});
					console.timeEnd('map');
				}
			});
		})

		
	},
	methods: {
		// drawPixel(data){
		// 	data.map()
		// }
	}
};
</script>

<style></style>
