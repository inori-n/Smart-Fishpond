<template>
	<view class="page">
		<view class="circle_container">
			<image src="@/static/assets/image/logo.png" style="height: 250rpx;width: 250rpx;" mode=""></image>
		</view>
		<view class="introduction">
			<view class="name">
				大智若渔
			</view>
			<view class="version">
				当前版本号: V 2.0.0.1
			</view>
		</view>
	</view>
	<button class="detail" >
		<view class="numbername">
			联系邮箱
			<view class="number">
				2584670051@qq.com
			</view>
		</view>
		<view class="numbername">
			在线时间
			<view class="number">
				周末 12:00 - 14:00
			</view>
		</view>
	</button>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>
	.page{
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	
	.circle_container {
		display: flex;
		justify-content: center;
		align-items: center;
		/* top: 450rpx; */
		/* margin-right: 15rpx; */
		margin-top: 300rpx;
		margin-bottom: 40rpx;
		height: 300rpx;
		width: 300rpx;
		border-radius: 50%;
		/* background-color: rgba(241, 246, 245, 1); */
		background-color: white;
		z-index: 1;
	}
	
	.introduction{
		margin: auto;
		text-align: center;
		
	}
	
	.name{
		font-size: 35rpx;
		margin-bottom: 5rpx;
		color: black;
	}
	
	.version{
		font-size: 20rpx;
		color: rgba(123, 123, 123, 1.0);
		margin-bottom: 400rpx;
	}
	
	.detail{
		display: flex;
		flex-direction: column;
		height: 200rpx;
		width: 90vw;
		line-height: 100rpx;
		text-align: center;
		font-size: 35rpx;
		background-color: #fff;
		border-radius: 20rpx;
		z-index: 1;
	}
	
	button::after{
		border: none;
	}
	
	.numbername{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		text-align: left;
		color: rgba(123, 123, 123, 1.0);
	}
	
	.number{
		text-align: right;
		color: black;
	}
</style>
