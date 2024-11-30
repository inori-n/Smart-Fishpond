<template>
	<!-- <scroll-view scroll-y="false">'' -->
	<view class="blur-pannel"></view>
	<view class="page">
		<!-- <view class="NavBarTop">数据一览</view> -->
		<view class="time">
			<view class="currentTime">{{current_time}}</view>
			<view class="currentDay">{{current_day}}</view>
		</view>
		<!-- <view class="blur-pannel"></view> -->
		<!-- <view class="device_status"></view> -->
		<!-- <uni-transition ref="ani" custom-class="transition" :mode-class="fade" show="show"><text class="text">示例元素</text></uni-transition> -->
		<view class="pannel">
			<view class="text" id="warn-text">异常信息 ({{abnormal_count}})</view>
			<view class="warn-pannel">
				<uni-transition :mode-class='fade' show="show" class="warn" v-if="abnormal_1">
					<view class="circle-container">
						<image src="@/static/assets/image/warn_light.png" class="warn_logo" alt="" />
					</view>
					<view class="warn_information">
						<view class="warn_detail">平均水深层水温有过高风险</view>
						<view class="warn_detail_1">即将超出水温阈值上限 {{warn_value}} ℃</view>
					</view>
				</uni-transition>
				<uni-transition :mode-class='fade' show="show" class="warn" v-if="abnormal_2">
					<view class="circle-container">
						<image src="@/static/assets/image/warn_light.png" class="warn_logo" alt="" />
					</view>
					<view class="warn_information">
						<view class="warn_detail">平均水深层水温有过低风险</view>
						<view class="warn_detail_1">即将超出水温阈值下限 {{warn_value}} ℃</view>
					</view>
				</uni-transition>
				<uni-transition :mode-class='fade' show="show" class="warn" v-if="abnormal_3">
					<view class="circle-container">
						<image src="@/static/assets/image/warn_light.png" class="warn_logo" alt="" />
					</view>
					<view class="warn_information">
						<view class="warn_detail">平均水深层水温过高</view>
						<view class="warn_detail_1">超出水温阈值上限 {{warn_value_1}} ℃</view>
					</view>
				</uni-transition>
				<uni-transition :mode-class='fade' show="show" class="warn" v-if="abnormal_4">
					<view class="circle-container">
						<image src="@/static/assets/image/warn_light.png" class="warn_logo" alt="" />
					</view>
					<view class="warn_information">
						<view class="warn_detail">平均水深层水温过低</view>
						<view class="warn_detail_1">超出水温阈值下限 {{warn_value_1}} ℃</view>
					</view>
				</uni-transition>
				<uni-transition :mode-class='fade' show="show" class="warn" v-if="abnormal_5">
					<view class="circle-container">
						<image src="@/static/assets/image/warn_light.png" class="warn_logo" alt="" />
					</view>
					<view class="warn_information">
						<view class="warn_detail">深层水温过高</view>
						<view class="warn_detail_1">超出水温阈值上限 {{warn_value_2}} ℃</view>
					</view>
				</uni-transition>
				<uni-transition :mode-class='fade' show="show" class="warn" v-if="abnormal_6">
					<view class="circle-container">
						<image src="@/static/assets/image/warn_light.png" class="warn_logo" alt="" />
					</view>
					<view class="warn_information">
						<view class="warn_detail">深层水温过低</view>
						<view class="warn_detail_1">超出水温阈值下限 {{warn_value_2}} ℃</view>
					</view>
				</uni-transition>
				<uni-transition :mode-class='fade' show="show" class="warn" v-if="abnormal_information">
					<view class="circle-container_none">
						<image src="@/static/assets/image/haha.png" class="warn_logo_none" alt="" />
					</view>
					<view class="warn_information">
						<view class="warn_detail">您的鱼塘目前非常健康！</view>
					</view>
				</uni-transition>
			</view>
			<view class="text" id="data-text">我的渔场<br>
				<view id="status" class="item-tag" :class="ChangeStatusLogo(device_status)"></view>
				<view id="status_text" class="item-tag" :class="ChangeStatusText(device_status)">{{device_status}}
				</view>
			</view>
			<view class="last_time_online">
				<image src="@/static/assets/image/clock.png" class="clock_logo"
					style="height: 30rpx;width: 30rpx;margin-top: 0rpx;" alt="" />
				<view>上次在线时间 : {{device_online_last_time}}</view>
			</view>
			<view class="data">
				<view class="data-card" @click="gotoTemperature()">
					<view class="data-info">
						<view class="data-name">气温</view>
						<view class="value">{{temp}} ℃</view>
					</view>
					<view class="data-info">
						<view class="circle_container_2">
							<image class="data-logo" src="@\static\assets\image\air_temperature.png" alt="" />
						</view>
					</view>
				</view>
				<view class="data-card" @click="gotoHumidity()">
					<view class="data-info">
						<view class="data-name">湿度</view>
						<view class="value">{{humi}} %</view>
					</view>
					<view class="data-info">
						<view class="circle_container_2">
							<image class="data-logo" src="@\static\assets\image\humi.png" alt="" />
						</view>
					</view>
				</view>
				<view class="data-card" @click="gotoDepth()">
					<view class="data-info">
						<view class="data-name">水深</view>
						<view class="value">{{water_depth}} m</view>
					</view>
					<view class="data-info">
						<view class="circle_container_2">
							<image class="data-logo" src="\static\assets\image\depth_logo.png"
								style="height: 70rpx;width: 70rpx;" alt="" />
						</view>
					</view>
				</view>
				<view class="data-card" @click="gotoWaterTemperature()">
					<view class="data-info">
						<view class="data-name">水温</view>
						<view class="value">{{temp_water}} ℃</view>
					</view>
					<view class="data-info">
						<view class="circle_container_2">
							<image class="data-logo" src="\static\assets\image\water_temperature.png" alt="" />
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- <view class="temperature" id="temperature"></view> -->
		<!-- </view> -->
	</view>
</template>


<script>
	import * as echarts from 'echarts' // 引入ECharts库
	import {
		CanvasRenderer
	} from 'echarts/renderers'; // 引入 Canvas 渲染器，没有这个Echart不显示
	export default {
		data() {
			return {
				temp: '',
				humi: '',
				temp_water: '',
				temp_water_bottom: '',
				water_depth: '',
				prediction_data: '',
				device_status: '',
				device_online_last_time: '',
				current_day: '',
				current_time: '',
				current_time_moment: '',
				abnormal_information: '',
				abnormal_count: '',
				abnormal_1: '', //预测水温过高报警
				abnormal_2: '', //预测水温过低报警
				abnormal_3: '', //当前水温过高报警
				abnormal_4: '', //当前水温过低报警
				abnormal_5: '', //当前深层水温过高报警
				abnormal_6: '', //当前深层水温过低报警
				warn_value: '', //预测报警差值
				warn_value_1: '', //中层（平均层）当前报警差值
				warn_value_2: '', //深层当前报警差值
				line_limit:5,
				form_name:'PondWaterMetrics',
				deviced_id:'-1',
				tim:null,
				tim_1:null,
				isShowModal:false,
			}
		},
		onLoad() {
			
		},
		onHide() {
			clearInterval(this.tim);
			clearInterval(this.tim_1);
		},
		onUnload() {
			clearInterval(this.tim);
			clearInterval(this.tim_1);
		},
		mounted() {
		},
		onReady() {
			setTimeout(this.checkHaveDeviceOrNot(this.isShowModal),1500)
			// this.checkHaveDeviceOrNot(this.isShowModal)
		},
		onShow() {
			let that = this
			this.checkHaveDeviceOrNot(this.isShowModal)
			this.GetDatafromStorage()
			this.GetData()
			this.GetDataFromMySql()
			this.GetDeviceStatus()
			this.GetTime()
			this.GetAbnormalInformation()
			this.ChangeStatusLogo()
			this.ChangeStatusText()
			this.tim = setInterval(function() {
				that.checkHaveDeviceOrNot(this.isShowModal)
				that.GetDatafromStorage()
				that.GetData()
				that.GetDataFromMySql()
				that.GetDeviceStatus()
				that.GetAbnormalInformation()
				that.ChangeStatusLogo()
				that.ChangeStatusText()
			}, 2000);
			this.tim_1 = setInterval(function() {
				that.GetTime()
			}, 1000);
		},
		methods: {
			async checkHaveDeviceOrNot(isShow){
				let that = this
				this.isShowModal
				console.log(this.isShowModal)
				let check = await uni.getStorageSync('device_selected')
				if(check == '' && isShow == false){
					that.isShowModal = true
					uni.showModal({
						title: '提示',
						content: '你还没有绑定并选中一台设备！请先添加并选择设备！',
						showCancel: false,
						success: function (res) {
						    if (res.confirm) {
						        // 用户点击了确定，跳转页面
						        uni.switchTab({
						            url: '/pages/device/device' 
						        });
						    }
						},
						complete:function(){
							console.log("重置成功")
							that.isShowModal = false
						}
					})
				}
			},
			GetDatafromStorage(){
				uni.getStorage({
					key:'device_selected',
					success: (res) => {
						this.deviced_id = res.data
						console.log(res.data)
					}
				})
				// let tempinfo = uni.getStorageSync('device_selected');
				// console.log(tempinfo);
			},
			gotoTemperature() {
				//使用uni.navigateTo()或uni.redirectTo()不会销毁实例，会导致echart实例抢占
				uni.navigateTo({
					url: '/pages/Airtemperature/Airtemperature'
				})
			},
			gotoDepth() {
				uni.navigateTo({
					url: '/pages/depth/depth'
				});
			},
			gotoHumidity() {
				uni.navigateTo({
					url: '/pages/humidity/humidity'
				});
			},
			gotoWaterTemperature() {
				uni.navigateTo({
					url: '/pages/water_temperatu/water_temperatu'
				});
			},
			ChangeStatusLogo(status) {
				if (status == '在线') {
					return 'online';
				} else {
					return 'offline';
				}
			},
			ChangeStatusText(status) {
				if (status == '在线') {
					return 'online_text';
				} else {
					return 'offline_text';
				}
			},
			GetAbnormalInformation() {
				var count = 0;
				if(this.deviced_id != "-1"){
					if (this.prediction_data > 28) {
						count += 1
						this.abnormal_1 = true
						this.warn_value = (this.prediction_data - 28).toFixed(1)
					}else{
						this.abnormal_1 = false
					}
					if (this.prediction_data < 24 && this.prediction_data > 0) {
						count += 1
						this.abnormal_2 = true
						this.warn_value = (24 - this.prediction_data).toFixed(1)
					}else{
						this.abnormal_2 = false
					}
					
					if (this.temp_water > 28) {
						count += 1
						this.abnormal_3 = true
						this.warn_value_1 = (this.temp_water - 28).toFixed(1)
					}else{
						this.abnormal_3 = false
					}
					
					if (this.temp_water < 24 && this.temp_water >= 0) {
						count += 1
						this.abnormal_4 = true
						this.warn_value_1 = (24 - this.temp_water).toFixed(1)
					}else{
						this.abnormal_4 = false
					}
					
					if (this.temp_water_bottom > 28) {
						count += 1
						this.abnormal_5 = true
						this.warn_value_2 = (this.temp_water_bottom - 28).toFixed(1)
					}else{
						this.abnormal_5 = false
					}
					
					if (this.temp_water_bottom < 24 && this.temp_water_bottom >= 0) {
						count += 1
						this.abnormal_6 = true
						this.warn_value_2 = (24 - this.temp_water_bottom).toFixed(1)
					}else{
						this.abnormal_6 = false
					}
					
					if (count == 0) {
						this.abnormal_information = true
					} else {
						this.abnormal_information = false
					}
				}
				
				else{
					this.abnormal_1 = false
					this.abnormal_2 = false
					this.abnormal_3 = false
					this.abnormal_4 = false
					this.abnormal_5 = false
					this.abnormal_6 = false
				}
				this.abnormal_count = count;
			},
			GetTime() {
				const UpperNum = ['日', '一', '二', '三', '四', '五', '六']
				let currentDate = new Date(); //返回当前日期和时间
				let that = this;
				var current_month = currentDate.getMonth() + 1
				var current_day = currentDate.getDate()
				var current_hour = currentDate.getHours()
				var current_minutes = currentDate.getMinutes()
				var current_seconds = currentDate.getSeconds()
				var current_week = UpperNum[currentDate.getDay()]
				// 格式化分针
				if (current_minutes >= 10) {
					this.current_time = current_hour.toString() + ":" + current_minutes.toString()
				} else {
					this.current_time = current_hour.toString() + ":" + "0" + current_minutes.toString()
				}
				if (current_hour > 0 && current_hour < 6) {
					this.current_time_moment = '凌晨'
				} else if (current_hour >= 6 && current_hour < 12) {
					this.current_time_moment = '早上'
				} else if (current_hour >= 12 && current_hour < 18) {
					this.current_time_moment = '下午'
				} else if (current_hour >= 18 && current_hour < 24) {
					this.current_time_moment = '晚上'
				}
				this.current_day = current_month.toString() + "月" + current_day.toString() + "日" + " " + "星期" +
					current_week.toString() + this.current_time_moment.toString()
			},
			//从onennet取数据
			// GetData: function() {
			// 	uni.request({
			// 		url: 'https://iot-api.heclouds.com/thingmodel/query-device-property',
			// 		data: {
			// 			product_id: 'eG0Js21avQ',
			// 			device_name: 'test',
			// 			// // identifier:'temp',
			// 			// start_time: '',
			// 			// end_time: '',
			// 		},
			// 		method: 'GET',
			// 		header: {
			// 			'authorization': 'version=2018-10-31&res=products%2FeG0Js21avQ%2Fdevices%2Ftest&et=2051238716&method=md5&sign=GoFVEG%2BvvE0BW1Dubc1ydg%3D%3D', //自定义请求头信息
			// 		},
			// 		success: (res) => {
			// 			this.text = 'request success';
			// 			this.humi = res.data.data[0].value;
			// 			this.temp = res.data.data[1].value;
			// 			this.temp_water = res.data.data[2].value;
			// 			this.water_depth = res.data.data[4].value;
			// 		}
			// 	});
			// },
			//从数据库取数据
			GetData: function() {
				uni.request({
					url: '*****',
					method:"POST",
					data:{
						"name":this.deviced_id,
						"limit":this.line_limit
					},
					success: (res) => {
						this.text = 'request success';
						this.humi = (res.data[0].Humidity).toFixed(1)
						this.temp = (res.data[0].AirTemperature).toFixed(1)
						this.temp_water = (res.data[0].WaterTemperature).toFixed(1)
						this.water_depth = (res.data[0].Depth).toFixed(1)
					}
				});
			},
			GetDataFromMySql: function() {
				let that = this
				uni.request({
					url: "*****",
					method: 'POST',
					data:{
						"name":this.deviced_id,
						"limit":this.line_limit
					},
					success: (res) => {

						// console.log(res.data);
						this.prediction_data = res.data[0].Temperature_Prediction
						this.prediction_data = JSON.parse(this.prediction_data)
						this.prediction_data = this.prediction_data[0]
						this.temp_water_bottom = res.data[0].WaterTemperature_BOTTOM;
						// console.log(this.prediction_data);
					}
				})
			},
			GetDeviceStatus: function() {
				// var devicename;
				// if(this.deviced_id == 111){
				// 	devicename = 'test'
				// 	console.log(this.deviced_id)
				// }else{
				// 	devicename = this.deviced_id
				// }
				// console.log(devicename)
				let that = this
				uni.request({
					url: '*****', //请求设备详细
					data: {
						product_id: '*****',
						// device_name: "device_" + devicename,
						device_name: 'test',
					},
					method: 'GET',
					header: {
						'authorization': '*****', //自定义请求头信息
					},
					success: (res) => {
						console.log(res)
						//获取设备当前状态
						if (res.data.data.status == 1) {
							that.device_status = '在线'
						} else {
							that.device_status = '离线'
						}
						that.device_online_last_time = res.data.data.last_time.substring(0, 10) + " " + res
							.data.data.last_time.substring(11, 19) //切割字符串拼出设备上次在线时间
						// console.log(that.device_online_last_time);
						// console.log(res.data.data.status);
					}
				});
			},
		},

	}
</script>

<style>
	.page {
		display: flex;
		z-index: 100;
		justify-content: center;
		flex-direction: column;
		flex-wrap: wrap;
		padding: 35rpx;
		overflow: auto;
		/* background-image: url(@/static/assets/image/bgcimage.jpg); */
		/* background-image: linear-gradient(to bottom , pink, skyblue); */
		/* 		background-size: cover;
		background-repeat: no-repeat; */
		/* height: 100vh; */
	}
	
	
	page::-webkit-scrollbar {
	  width: 0;
	  height: 0;
	  background-color: transparent;
	}

	.NavBarTop {
		position: fixed;
		/*fixed为页面上固定不动,absolute页面固定但随着页面滚动滚动*/
		/* background: #000; */
		z-index: 100;
		top: 10rpx;
		/* position: center; */
		/* 		position: absolute; */

	}

	.text {
		display: flex;
		flex-direction: row;
		left: 40rpx;
		font-weight: 500;
		font-family: inherit;
		font-size: 35rpx;
		font-weight: bold;
		z-index: 1;
		/* background-color: #fff; */
	}


	#warn-text {
		/* position: absolute; */
		top: 430rpx;
		z-index: 2;
	}

	.blur-pannel {
		display: flex;
		height: 100vh;
		width: 100vw;
		transform: scale(2);
		background-size: cover;
		/* background-image: linear-gradient(to bottom, pink, skyblue); */
		background-color: rgba(241, 246, 245, 1);
		z-index: 0;
		filter: blur(50rpx);
	}


	.time {
		display: flex;
		flex-wrap: wrap;
		flex-direction: column;
		position: absolute;
		/* top: -1050rpx; */
		left: 35rpx;
		top: 100rpx;
		object-position: 10rpx;
		/* background-color: #fff; */
		z-index: 1;
	}

	.time .currentTime {
		font-size: 95rpx;
	}

	.time .currentDay {
		font-size: 28rpx;
	}

	.device_status {
		display: flex;
		position: absolute;
		top: 500rpx;
		width: 90vw;
		height: 20vh;
		border-radius: 20rpx;
		box-shadow: 0 0 20rpx -4rpx rgba(0, 0, 0, 0.5);
		background-color: #fff;
		z-index: 1;
	}

	.pannel {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		position: absolute;
		top: 300rpx;
		gap: 30rpx;
		/* background-color: black; */
		z-index: 1;
	}

	.warn-pannel {
		display: flex;
		flex-direction: column;
		flex-wrap: wrap;
		gap: 35rpx;
		/* position: absolute; */
		/* top: 500rpx; */
		/* left: rpx; */
		width: 90vw;
		/* height: 10vh; */
		/* 		border-radius: 20rpx;
		box-shadow: 0 0 20rpx -4rpx rgba(0, 0, 0, 0.5); */
		/* background-color: green; */
		z-index: 1;

	}

	.warn {
		display: flex;
		justify-content: left;
		align-items: center;
		flex-direction: row;
		flex-wrap: nowrap;
		padding: 15rpx 35rpx 15rpx 35rpx;
		background-color: #fff;
		border-radius: 20rpx;
		box-shadow: 0 0 20rpx -4rpx rgba(0, 0, 0, 0.5);
		transition: .5s;
		/* width: 100vw; */
		/* height: 10vh; */
		z-index: 2;
	}

	.warn .circle-container {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100rpx;
		height: 100rpx;
		border-radius: 50%;
		background-color: rgba(255, 105, 94, 0.4);

	}

	.warn .circle-container_none {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100rpx;
		height: 100rpx;
		border-radius: 50%;
		/* background-color: rgba(255, 105, 94, 0.4); */

	}

	.warn .circle-container_none .warn_logo_none {
		height: 100rpx;
		width: 100rpx;
	}

	.warn .warn_information {
		display: flex;
		flex-direction: column;
		justify-content: left;
		margin-left: 35rpx;
		/* background-color: green; */
		z-index: 1;
	}

	.warn .warn_information .warn_detail {
		font-size: 35rpx;
		z-index: 2;
	}

	.warn .warn_information .warn_detail_1 {
		font-size: 25rpx;
		color: rgba(255, 43, 1, 1.0);
		z-index: 2;
	}

	.warn .circle-container .warn_logo {
		height: 50rpx;
		width: 50rpx;
	}

	#data-text {
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.last_time_online {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 10rpx;
		font-size: 25rpx;
		color: rgba(0, 0, 0, 1.0);
		margin-top: -20rpx;
		width: 90vw;
	}

	.online_text {
		font-size: 25rpx;
		margin-left: 10rpx;
		margin-bottom: 2.5rpx;
		font-weight: normal;
		color: rgba(0, 202, 0, 1.0);
	}

	.offline_text {
		font-size: 25rpx;
		margin-left: 10rpx;
		font-weight: normal;
		color: rgba(228, 30, 0, 1.0);
	}

	.online {
		width: 15rpx;
		height: 15rpx;
		margin-left: 20rpx;
		border-radius: 50%;
		background-color: rgba(0, 202, 0, 1.0);
		color: rgba(0, 202, 0, 1.0);
		z-index: 1;
	}

	.offline {
		width: 15rpx;
		height: 15rpx;
		margin-left: 20rpx;
		border-radius: 50%;
		background-color: rgba(228, 30, 0, 1.0);
		z-index: 1;

	}

	.data {
		display: flex;
		flex-direction: row;
		/* position: absolute; */
		top: 800rpx;
		width: 90vw;
		/* 		border-radius: 20rpx;
		box-shadow: 0 0 20rpx -4rpx rgba(0, 0, 0, 0.5); */
		justify-content: space-between;
		flex-wrap: wrap;
		/* background-color: #fff; */
	}

	.data-card {
		display: flex;
		justify-content: space-around;
		align-items: center;
		width: 320rpx;
		height: 180rpx;
		margin-bottom: 35rpx;
		background-color: #fff;
		border-radius: 20rpx;
		box-shadow: 0 0 20rpx -4rpx rgba(0, 0, 0, 0.5);
		z-index: 1;
	}

	.data-info {}

	.circle_container_2 {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100rpx;
		width: 100rpx;
		border-radius: 50%;
		background-color: rgba(241, 246, 245, 1);
		z-index: 1;
	}

	.data-logo {
		width: 80rpx;
		height: 80rpx;
		/* margin-left: 10rpx; */
	}

	.data-name {
		text-align: center;
		margin: -30rpx 0 20rpx -30rpx;
		font-size: 40rpx;
	}

	.value {
		text-align: center;
		font-size: 35rpx;
		font-weight: bold;
		color: rgba(77, 183, 110, 1.0);
	}

	.temperature {
		height: 200rpx;
		width: 200rpx;
	}
</style>