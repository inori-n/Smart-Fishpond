<template>
	<view class="page">
	<view class="navbar">实际水温报警历史
	<image src="@/static/assets/image/back.png"
		style="height: 40rpx;width: 40rpx;position: absolute;left: 30rpx;z-index: 100;" @click="back()"
		alt="" />
	</view>
	<view>
		<view class="tips">仅展示最近的50条</view>
		<view class="item-box" v-for="(item, index) in list">
			<view class="warntime">
				报警时间：{{item.Time}}
			</view>
			<view class="datapannel">
				<view class="smallpannel">
					<view class="">
						平均水深层水温
					</view>
					<view class="warndata" :class="ChangeFont(item.WaterTemperature)">
						{{item.WaterTemperature}} ℃
					</view>
				</view>
				<view class="smallpannel">
					<view class="">
						深层水温
					</view>
					<view class="warndata" :class="ChangeFont(item.WaterTemperature_BOTTOM)">
						{{item.WaterTemperature_BOTTOM}} ℃
					</view>
				</view>
			</view>
		</view>
	</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list:[],
				deviced_id:'',
				tim:null,
			}
		},
		onUnload() {
			clearInterval(this.tim);
		},
		onHide() {
			clearInterval(this.tim);
		},
		onLoad() {
			uni.showLoading({
				title: '加载中'
			});
			setTimeout(function(){
				uni.hideLoading()
			},2200)
		},
		onShow() {
			let that = this
			this.list
			this.deviced_id
			this.GetDatafromStorage()
			this.GetWarnData()
			this.tim = setInterval(function() {
				console.log(that.list)
				// console.log(that.deviced_id)
				that.GetDatafromStorage()
				that.GetWarnData()
			}, 2000);
		},
		methods: {
			ChangeFont(value){
				if (value > 28 || value < 24) {
					return 'warndata-warn';
				} else {
					return 'warndata';
				}
			},
			back(){
				uni.reLaunch({
					url:'/pages/pound/pound'
				})
			},
			GetDatafromStorage(){
				uni.getStorage({
					key:'device_selected',
					success: (res) => {
						this.deviced_id = res.data
						console.log(res.data)
					}
				})
			},
			GetWarnData(){
				uni.request({
					url: '*****',
					method:"POST",
					data:{
						"name":this.deviced_id,
					},
					success: (res) => {
						this.list = res.data
					}
				});
			}
			
		}
	}
</script>

<style>
	.navbar {
		/* position: absolute; */
		position: fixed;
		top: 0;
		/* margin-top: -30rpx; */
		padding-top: 30px;
		/* margin-top: 40rpx; */
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100vw;
		height: 5vh;
		font-size: 17px;
		background-color: rgb(248, 248, 248);
		z-index: 100;
	}
	
	.page {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: center;
		padding-top: 20%;
		gap: 20rpx;
	
	}
	
	.item-box {
			margin-left: auto;
			margin-right: auto;
			top: 200rpx;
			display: flex;
			flex-direction: column;
			justify-content: space-around;
			flex-wrap: wrap;
			align-items: center;
			width: 600rpx;
			height: 250rpx;
			margin-top: 35rpx;
	/* 		margin-bottom: 5rpx; */
			background-color: #fff;
			border-radius: 20rpx;
			box-shadow: 0 0 20rpx -4rpx rgba(0, 0, 0, 0.5);
			z-index: 1;
	}
	
	.warndata{
		text-align: center;
		width: 300rpx;
		color: black;
	}
	
	.warntime{
		margin-left: auto;
		margin-right: auto;
		text-align: center;
		width: 600rpx;
	}
	
	.warndata-warn{
		text-align: center;
		width: 300rpx;
		color: red;
	}
	
	.datapannel{
		display: flex;
		flex-direction: row;
	}
	
	.smallpannel{
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		/* margin-left: 20rpx; */
	}
	
	.tips {
		
		text-align: center;
		color: #999999;
		font-size: 28rpx;
		margin: auto;
	}
</style>
