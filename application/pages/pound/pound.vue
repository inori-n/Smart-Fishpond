<template>
	<view class="page">
		<view class="accuountpannle">
			<view class="accountimage">
				<view class="circle_container">
					<image src="@/static/assets/image/account.png" mode="" style="height: 150rpx;width: 150rpx;"></image>
				</view>
			</view>
			<input type="text" v-model="accountname"  @blur="saveAccountName()" placeholder="用户"  style="text-align: center;font-size: 40rpx;margin-bottom: 10rpx;">
			<view class="account">
				{{account}}
			</view>
		</view>
		<button class="detail" @click="warnpage()">水温报警历史</button>
		<button class="detail" @click="QA()">鳗鱼养殖Q&A</button>
		<button class="detail" @click="application()">关于我们</button>
		<!-- <button style="height: 200rpx;width: 600rpx;margin: auto;" @click="warnpage()">预测水温报警历史</button> -->
		<button class="detail"  @click="clearDate()">退出登录</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				logindetail:'',
				account:'',
				accountname:'',
			}
		},
		onLoad() {
			uni.getStorage({
				key:'phoneData',
				success: (res) => {
					this.account = res.data
					console.log(res.data)
				}
			}),
			uni.getStorage({
				key:'accountname',
				success: (res) => {
					this.accountname = res.data
					console.log(res.data)
				}
			})
		},
		onShow() {
		},
		methods: {
			QA(){
				uni.navigateTo({
					url:'/pages/QuestionAndAnswer/QuestionAndAnswer'
				})
			},
			application(){
				uni.navigateTo({
					url:'/pages/application/application'
				})
			},
			saveAccountName() {
				uni.setStorage({
					key: 'accountname',
					data: this.accountname,
					success: function() {
						console.log('保存成功');
					}
				});
			},
			clearDate(){
				uni.clearStorage('islogin')
				uni.reLaunch({
					url:"/pages/login/login"
				})
			},
			warnpage(){
				uni.navigateTo({
					url:'/pages/log/log'
				})
			}
		}
	}
</script>

<style>
	.page{
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 30rpx;
	}
	
	.detail{
		height: 100rpx;
		width: 600rpx;
		text-align: center;
		font-size: 40rpx;
		background-color: #fff;
		border-radius: 20rpx;
		box-shadow: 0 0 20rpx -4rpx rgba(0, 0, 0, 0.5);
		z-index: 1;
	}
	
	.accuountpannle{
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-top: 60rpx;
		margin-bottom: 120rpx;
		height: 400rpx;
		width: 600rpx;
		font-size: 40rpx;
		background-color: #fff;
		border-radius: 20rpx;
		box-shadow: 0 0 20rpx -4rpx rgba(0, 0, 0, 0.5);
		border-radius: 10rpx;
		z-index: 1;
	}
	
	.circle_container {
		display: flex;
		justify-content: center;
		align-items: center;
		margin-right: 15rpx;
		margin-top: 60rpx;
		margin-bottom: 20rpx;
		height: 150rpx;
		width: 150rpx;
		border-radius: 50%;
		background-color: rgba(241, 246, 245, 1);
		z-index: 1;
	}
	
	button::after{
		border: none;
	}
</style>
