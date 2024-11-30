<template>
	<view class="forget">
		<view class="content">
			<!-- 主体 -->
			<view class="main">
				<view class="tips">若你忘记了密码，可在此重置新密码。</view>
				<input
					class="inputd"
					v-model="phoneData"
					type="text"
					maxlength="20"
					placeholder="请输入邮箱"
				/>
				<input
					class="inputd"
					v-model="passData"
					type="password"
					maxlength="20"
					placeholder="请输入新密码"
					isShowPass
				/>
				<view class="vercode">
				<input
					class="inputv"
					v-model="verCode"
					type="text"
					maxlength="6"
					placeholder="验证码"
				/>
				<button class="vercode_button" v-if="showbutton" @click="getVerCode()">获取验证码</button>
				<button class="vercode_button" v-if="!showbutton" @click="repeat()" >{{countdown}}</button>
				</view>
			</view>
			
			<button 
				class="wbutton"
				:rotate="isRotate" 
				@click.native="startRePass()"
			>重置密码</button>

		</view>
	</view>
</template>

<script>
	let _this;
	export default {
		data() {
			return {
				phoneData: "", //电话/邮箱
				passData: "", //密码
				verCode:"", //验证码
				isRotate: false, //是否加载旋转
				showbutton:true,
				countdownSeconds:30,
				countdown: 0,
				timer:null,
			}
		},
		methods: {
			repeat(){
				uni.showToast({
				    icon: 'none',
					position: 'bottom',
				    title: '请勿频繁发送验证码'
				});
			},
			countDown(){
				this.countdown = this.countdownSeconds;
				if (this.timer) {
					clearInterval(this.timer);
				}
				this.timer = setInterval(() => {
				if (this.countdown > 0) {
					this.countdown--;
				} else {
					this.showbutton = !this.showbutton;
					clearInterval(this.timer);
				}
				}, 1000);
			},
			getVerCode(){
				this.showbutton = false;
				//获取验证码
				console.log("获取验证码")
				uni.request({
					url: '*****',
					method:"POST",
					data:{
						"account":this.phoneData,
						"password":this.passData,
						"vercode":this.verCode
					},
					success: (res) => {
					},
				});
				uni.showToast({
				    icon: 'none',
					position: 'bottom',
				    title: '验证码已发送'
				});
				this.countDown()
			},
			startRePass() {
				//重置密码
				if(this.isRotate){
					//判断是否加载中，避免重复点击请求
					return false;
				}
			    if (this.passData.length < 6) {
			        uni.showToast({
			            icon: 'none',
						position: 'bottom',
			            title: '密码不得小于6位'
			        });
			        return false;
			    }
				if (this.verCode.length != 6) {
				    uni.showToast({
				        icon: 'none',
						position: 'bottom',
				        title: '验证码不正确'
				    });
				    return false;
				}
				uni.request({
					url: '*****',
					method:"POST",
					data:{
						"account":this.phoneData,
						"password":this.passData,
						"vercode":this.verCode
					},
					success: (res) => {
						if(res.data == "Update Successful"){
							uni.showToast({
							    icon: 'success',
								position: 'center',
							    title: '更新成功'
							});
							uni.reLaunch({
								url:'/pages/login/login'
							})
						}else{
							uni.showToast({
							    icon: 'none',
								position: 'bottom',
							    title: '验证码错误'
							});
						}
					},
				});
				// console.log("重置密码成功")
				_this.isRotate=true
				setTimeout(function(){
					_this.isRotate=false
				},3000)
			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		justify-content:center;
		/* margin-top: 128rpx; */
	}
	
	/* 头部 logo */
	.header {
		width:161rpx;
		height:161rpx;
		/* box-shadow:0rpx 0rpx 60rpx 0rpx rgba(0,0,0,0.1); */
		border-radius:50%;
		/* background-color: #000000; */
		margin-top: 108rpx;
		margin-bottom: 72rpx;
		margin-left: auto;
		margin-right: auto;
	}
	.header image{
		width:161rpx;
		height:161rpx;
		margin-top: -50rpx;
		border-radius:50%;
	}
	
	/* 主体 */
	.main {
		display: flex;
		flex-direction: column;
		border: none;
		gap: 50rpx;
	}
	.tips {
		text-align: center;
		color: #999999;
		font-size: 28rpx;
		margin-top: 64rpx;
		margin-left: 48rpx;
	}
	
	/* 登录按钮 */
	.wbutton{
		margin-top: 96rpx;
		background-color: rgba(90,90,90,1);
		height: 120rpx;
		width: 80%;
		margin-left: auto;
		margin-right: auto;
		border: none;
		border-radius: 90rpx;
		box-shadow:0rpx 0rpx 60rpx 0rpx rgba(0,0,0,0.1);
		color: #fff;
		text-align: center;
		line-height: 120rpx;
		font-weight: 300;
		
	}
	
	.inputd{
		height: 120rpx;
		width: 80%;
		margin-left: auto;
		margin-right: auto;
		border: none;
		border-radius: 90rpx;
		box-shadow:0rpx 0rpx 60rpx 0rpx rgba(0,0,0,0.1);
		text-indent: 50rpx;
		outline: none;
		font-weight: 300;
	}
	
	.inputv{
		flex: 2;
		height: 120rpx;
		margin-left: auto;
		margin-right: auto;
		border: none;
		border-radius: 90rpx;
		border-top-right-radius: 0;
		border-bottom-right-radius: 0;
		box-shadow:0rpx 0rpx 60rpx 0rpx rgba(0,0,0,0.1);
		text-indent: 50rpx;
		outline: none;
		font-weight: 300;
	}
	
	button::after{
		border: none;
	}
	
	.vercode_button{
		font-size: 90%;
		font-weight: 400;
		height: 120rpx;
		background-color: rgba(125, 125, 125, 0.5);
		border-radius: 90rpx;
		border-top-left-radius: 0;
		border-bottom-left-radius: 0;
		line-height: 120rpx;
		flex: 1;
	}
	
	.vercode{
		margin-left: auto;
		margin-right: auto;
		width: 80%;
		align-items: center;
		justify-content: center;
		display: flex;
		flex-direction: row;
	}
	
	/* 底部 */
	.footer{
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		font-size: 28rpx;
		margin-top: 64rpx;
		color: rgba(0,0,0,0.7);
		text-align: center;
		height: 40rpx;
		line-height: 40rpx;
	}
	.footer text{
		font-size: 24rpx;
		margin-left: 15rpx;
		margin-right: 15rpx;
	}
</style>
