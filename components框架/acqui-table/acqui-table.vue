<template>
	<view class="acqui_table">
		<view class="tr" v-for="(item, index) in acquiTable" :key="index">
			<view class="td" v-for="(ite, inde) in item" :key="inde" :style="ite.tdWidth ? 'width:' + ite.tdWidth : ''">{{ ite.text }}</view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		acquiTable: {
			//table配置：一个对象即为一个tr
			type: Array,
			default() {
				return [
					[
						{
							text: '商品参数',
							tdWidth: '' //td的宽度占比   根据td的宽度来写  默认总宽度/td数量
						}
					],
					[
						{
							text: '颜色', //td文字
							tdWidth: '35%' //td的宽度占比   根据td的宽度来写  默认总宽度/td数量
						},
						{
							text: '金色',
							tdWidth: '75%'
						}
					],
					[
						{
							text: '产品型号', //td文字
							tdWidth: '35%' //td的宽度占比   根据td的宽度来写  默认总宽度/td数量
						},
						{
							text: 'KD9901',
							tdWidth: '75%'
						}
					],
					[
						{
							text: '品牌', //td文字
							tdWidth: '35%' //td的宽度占比   根据td的宽度来写  默认总宽度/td数量
						},
						{
							text: '金稻',
							tdWidth: '75%'
						}
					],
					[
						{
							text: '产品尺寸(mm)', //td文字
							tdWidth: '35%' //td的宽度占比   根据td的宽度来写  默认总宽度/td数量
						},
						{
							text: '196',
							tdWidth: '75%'
						}
					],
					[
						{
							text: '产品净重(kg)', //td文字
							tdWidth: '35%' //td的宽度占比   根据td的宽度来写  默认总宽度/td数量
						},
						{
							text: '0.35kg',
							tdWidth: '75%'
						}
					]
				];
			}
		}
	},
	data() {
		return {};
	}
};
</script>

<style lang="stylus" scoped>
.acqui_table
	outline 2px solid #E5E5E5
	width 100%
	.tr
		display flex
		.td
			outline 1px solid #E5E5E5
			text-align center
			padding 20rpx 0
			width 100%
</style>
