<template>
<!-- 	<view class="contain">
	<view class="navbar"><image src="@/static/assets/image/back.png" style='height: 4vh;width: 8vw;position: absolute;left: 2vw;'  mode="" @click="gotoIndex()"></image>水温详情</view>
	</view> -->
	<view class="page">
		<view class="text" style="margin-top: 20rpx;">浅水区水温</view>
		<view class="detail">
			<view class="card">
				<view class="temp">{{Lowest}} ℃</view>
				<view class="name">最低值</view>
			</view>
			<view class="card">
				<view class="item-tag" :class="ChangeFont(Average)">{{Average}} ℃</view>
				<view class="name">当前值</view>
			</view>
			<view class="card-end">
				<view class="temp">{{Highest}} ℃</view>
				<view class="name">最高值</view>
			</view>
		</view>
		<view class="text">平均水深区水温</view>
		<echart class="echarts" :style="{width:'100vw',height:'35vh',}" :option="Options"></echart>
		<view class="text">深水区水温</view>
		<view class="detail">
			<view class="card">
				<view class="temp">{{Lowest_1}} ℃</view>
				<view class="name">最低值</view>
			</view>
			<view class="card">
				<view class="item-tag" :class="ChangeFont(Average_1)">{{Average_1}} ℃</view>
				<view class="name">当前值</view>
			</view>
			<view class="card-end">
				<view class="temp">{{Highest_1}} ℃</view>
				<view class="name">最高值</view>
			</view>
		</view>
		<view class="tips">* 适宜鳗鱼养殖的水温应在 24℃ ~ 28℃</view>
	</view>
</template>

<script>
	import * as echarts from 'echarts' // 引入ECharts库
	import echart from "@/component/echart.vue";
	export default {
		components: {
			'echart': echart
		},
		data() {
			return {
				yData:'',
				Options: {
					    // title: {
					    //      text: '今日&昨日',
					    //      left: '50%',
					    //      textAlign: 'center'
					    //  },
					     tooltip: {
					         trigger: 'axis',
					         axisPointer: {
					             lineStyle: {
					                 color: '#ddd'
					             }
					         },
					         backgroundColor: 'rgba(255,255,255,1)',
					         padding: [5, 10],
					         textStyle: {
					             color: '#00CA69',
					         },
					         extraCssText: 'box-shadow: 0 0 5px rgba(0,0,0,0.3)'
					     },
					     legend: {
							x: 'center',  // 图例水平位置，可以是left、center或right
							y: 'bottom',  // 图例垂直位置，可以是top、middle或bottom
					     },
						 grid: {
						 	left:"8%",
						 	right:"14%",
						    top:"20%",
						 	bottom:"13%",
						    containLabel: true
						 },
					     xAxis: {
					         type: 'category',
					         data: [],
					         // boundaryGap: false,
					         splitLine: {
					             show: true,
					             interval: 0,
					             lineStyle: {
					                 color: ['#D4DFF5']
					             }
					         },
					         axisTick: {
					             show: false
					         },
					         axisLine: {
					             lineStyle: {
					                 color: '#7b7b7b'
					             }
					         },
					         axisLabel: {
					             margin: 10,
					             textStyle: {
					                 fontSize: 14
					             }
					         }
					     },
					     yAxis: {
					         type: 'value',
							 name: '气温 (单位：℃)',
							 splitNumber: 3,
							 nameGap: 15,
							 min: 15,
							 max: 35,
					         splitLine: {
					             lineStyle: {
					                 color: ['#D9D9D9']
					             }
					         },
					         axisTick: {
					             show: false
					         },
					         axisLine: {
					             lineStyle: {
					                 color: '#666'
					             }
					         },
					         axisLabel: {
					             margin: 10,
					             textStyle: {
					                 fontSize: 14
					             }
					         }
					     },
					     series: [{
					         name: '当前水温',
					         type: 'line',
							 markLine: {
							       symbol: 'none',
							       data: [
							         {
							           yAxis: 24, // 自定义下限值
							           // name: '最小值', // 基准线名称
							           label: { // 不显示基准线名称
							             show: true,
							           },
							           lineStyle: {
							             type: 'dashed', // 基准线样式为虚线
							             color: '#b12929',
							           },
							         },
							         {
							           yAxis: 28, // 上限值
							           // name: '最大值',
							           label: {
							             show: true,
							           },
							           lineStyle: {
							             type: 'dashed',
							             color: '#b12929',
							           },
							         },
							       ],
							     },
							 zlevel:2,
					         smooth: true,
					         symbol: 'circle',
					         symbolSize: 8,
					         data:[123],
					         areaStyle: {
					             normal: {
					                 color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
					                     offset: 0,
					                     color: 'rgba(199, 237, 250,0.5)'
					                 }, {
					                     offset: 1,
					                     color: 'rgba(199, 237, 250,0.2)'
					                 }], false)
					             }
					         },
					         itemStyle: {
					             normal: {
					                 color: '#00CA69'
					             }
					         },
					         lineStyle: {
					             normal: {
					                 width: 3
					             }
					         }
					     }, 
						 {
					         name: '预测水温',
					         type: 'line',
					         smooth: true,
					         symbol: 'circle',
					         symbolSize: 8,
					         data: [],
					         areaStyle: {
					             normal: {
					                 color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
					                     offset: 0,
					                     color: 'rgba(199, 237, 250,0.5)'
					                 }, {
					                     offset: 1,
					                     color: 'rgba(199, 237, 250,0.2)'
					                 }], false)
					             }
					         },
					         itemStyle: {
					             normal: {
					                 color: '#aa00ff'
					             }
					         },
					         lineStyle: {
					             normal: {
					                 width: 3
					             }
					         }
					     },
						 ]
				},
				//echarts 设置结束
				Lowest:'',
				Average:'',
				Highest:'',
				Lowest_1:'',
				Average_1:'',
				Highest_1:'',
				deviced_id:'',
				line_limit:10,
				tim:null,
				tim_1:null,
			}
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
			uni.showLoading({
				title: '加载中'
			});
			setTimeout(function(){
				uni.hideLoading()
			},2000) 
			let that = this
			this.GetDatafromStorage()
			this.GetDataFromMySqlData()
			this.GetDataFromMySqlTime()
			this.GetPredictionDataFromMySqlData()
			this.GetHighest()
			this.GetAverage()
			this.GetLowest()
			this.GetHighest_1()
			this.GetAverage_1()
			this.GetLowest_1()
			this.tim_1 = setInterval(function() {
				that.GetHighest()
				that.GetAverage()
				that.GetLowest()
				that.GetHighest_1()
				that.GetAverage_1()
				that.GetLowest_1()
			}, 1000);
			this.tim = setInterval(function() {
				that.GetDatafromStorage()
			    that.GetDataFromMySqlData()
			    that.GetDataFromMySqlTime()
			    that.GetPredictionDataFromMySqlData()
			}, 1000);
		},
		onShow() {
			// let that = this
			// this.GetDataFromMySqlData()
			// this.GetDataFromMySqlTime()
			// this.GetPredictionDataFromMySqlData()
			// this.GetHighest()
			// this.GetAverage()
			// this.GetLowest()
			// this.GetHighest_1()
			// this.GetAverage_1()
			// this.GetLowest_1()
			// setInterval(function() {
			// 	that.GetHighest()
			// 	that.GetAverage()
			// 	that.GetLowest()
			// 	that.GetDataFromMySqlData()
			// 	that.GetDataFromMySqlTime()
			// 	that.GetPredictionDataFromMySqlData()
			// 	that.GetHighest_1()
			// 	that.GetAverage_1()
			// 	that.GetLowest_1()
			// }, 1000);
		},
		methods: {
			GetDatafromStorage(){
				uni.getStorage({
					key:'device_selected',
					success: (res) => {
						this.deviced_id = res.data
						console.log(res.data)
					}
				})
			},
			gotoIndex(){
				uni.reLaunch({
					url: '/pages/index/index'
				});
			},
			ChangeFont(value){
				if (value > 28 || value < 24) {
					return 'temp-warn';
				} else {
					return 'temp';
				}
			},
			GetHighest(){
				uni.request({
					url: '*****',
					method:"POST",
					data:{
						"name":this.deviced_id,
						"limit":this.line_limit
					},
					success: (res) => {
						var High
						High = res.data[0].AirTemperature
						for(var i = 0;i < 5;i++){
							if(res.data[i].AirTemperature > High){
								High = res.data[i].AirTemperature
							}
						}
						this.Highest = High
					}
				})
				
			},
			GetAverage(){
				uni.request({
					url: '*****',
					method:"POST",
					data:{
						"name":this.deviced_id,
						"limit":this.line_limit
					},
					success: (res) => {
						// this.Average = (res.data[0].AirTemperature + res.data[1].AirTemperature + res.data[2].AirTemperature + res.data[3].AirTemperature + res.data[4].AirTemperature) / 5
						this.Average = res.data[0].AirTemperature
					}
				})
			},
			GetLowest(){
				uni.request({
					url: '*****',
					method:"POST",
					data:{
						"name":this.deviced_id,
						"limit":this.line_limit
					},
					success: (res) => {
						var Low
						Low = res.data[0].AirTemperature
						for(var i = 0;i < 5;i++){
							if(res.data[i].AirTemperature < Low){
								Low = res.data[i].AirTemperature
							}
						}
						this.Lowest = Low
					}
				})
				
			},
			GetHighest_1(){
				uni.request({
					url: '*****',
					method:"POST",
					data:{
						"name":this.deviced_id,
						"limit":this.line_limit
					},
					success: (res) => {
						var High
						High = res.data[0].WaterTemperature_BOTTOM
						for(var i = 0;i < 5;i++){
							if(res.data[i].WaterTemperature_BOTTOM > High){
								High = res.data[i].WaterTemperature_BOTTOM
							}
						}
						this.Highest_1 = High
					}
				})
				
			},
			GetAverage_1(){
				uni.request({
					url: '*****',
					method:"POST",
					data:{
						"name":this.deviced_id,
						"limit":this.line_limit
					},
					success: (res) => {
						// this.Average = (res.data[0].AirTemperature + res.data[1].AirTemperature + res.data[2].AirTemperature + res.data[3].AirTemperature + res.data[4].AirTemperature) / 5
						this.Average_1 = res.data[0].WaterTemperature_BOTTOM
					}
				})
			},
			GetLowest_1(){
				uni.request({
					url: '*****',
					method:"POST",
					data:{
						"name":this.deviced_id,
						"limit":this.line_limit
					},
					success: (res) => {
						var Low
						Low = res.data[0].WaterTemperature_BOTTOM
						for(var i = 0;i < 5;i++){
							if(res.data[i].WaterTemperature_BOTTOM < Low){
								Low = res.data[i].WaterTemperature_BOTTOM
							}
						}
						this.Lowest_1 = Low
					}
				})
				
			},
			GetDataFromMySqlTime: function() {
				let that = this
				this.time
				uni.request({
					url: '*****',
					method:"POST",
					data:{
						"name":this.deviced_id,
						"limit":this.line_limit
					},
					success: (res) => {
						if(res.data[0].Prediction_Time != null){
							that.time = [res.data[4].Time.slice(10,19),res.data[3].Time.slice(10,19),res.data[2].Time.slice(10,19),res.data[1].Time.slice(10,19),res.data[0].Time.slice(10,19),res.data[0].Prediction_Time.slice(2,10),res.data[0].Prediction_Time.slice(14, 22),res.data[0].Prediction_Time.slice(26, 34)]
						}else{
							that.time = [res.data[4].Time.slice(10,19),res.data[3].Time.slice(10,19),res.data[2].Time.slice(10,19),res.data[1].Time.slice(10,19),res.data[0].Time.slice(10,19)]
						}
						
					}
				})
				this.Options.xAxis.data = this.time
				return this.time;
			},
			GetDataFromMySqlData: function() {

				let that = this
				this.data
				uni.request({
					url: '*****',
					method:"POST",
					data:{
						"name":this.deviced_id,
						"limit":this.line_limit
					},
					success: (res) => {
						that.data = [res.data[4].WaterTemperature,res.data[3].WaterTemperature,res.data[2].WaterTemperature,res.data[1].WaterTemperature,res.data[0].WaterTemperature]

					}
				})
				this.Options.series[0].data = this.data
				return this.data;
			},
			GetPredictionDataFromMySqlData: function() {
				let that = this
				this.prediction
				uni.request({
					url: '*****',
					method:"POST",
					data:{
						"name":this.deviced_id,
						"limit":this.line_limit
					},
					success: (res) => {
						if(res.data[0].Prediction_Time != null){
						that.prediction = res.data[0].Temperature_Prediction
						that.prediction = JSON.parse(that.prediction)
						that.prediction = [null,null,null,null,res.data[0].WaterTemperature,that.prediction[0],that.prediction[1],that.prediction[2]]
						}else{
							
						}
			
					}
				})
				this.Options.series[1].data = this.prediction
				return this.prediction;
			},

			
		}
	}
</script>

<style>
	.contain{
/* 		position: fixed; */
		width: 100vw;
		height: 5vh;
	}
	
	.navbar {
		/* position: absolute; */
		position: fixed;
		margin-top: 40rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100vw;
		height: 5vh;
		background-color: #fff;
		z-index: 100;
	}
	.page{
		display: flex;
		z-index: 1;
		align-items: center;
		flex-direction: column;
		flex-wrap: nowrap;
		background-color:rgba(241, 246, 245, 1);
		height: 100vh;
		width: 100vw;
		gap: 60rpx;
	}
	
	.detail{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		/* gap: rpx; */
		width: 80vw;
		height: 12vh;
		padding: 35rpx;
		border-radius: 20rpx;
		background-color: #fff;
		box-shadow: 0 0 20rpx -4rpx rgba(0, 0, 0, 0.5);
		z-index: 100;
	}
	
	.card{
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		height: 12vh;
		width: 27vw;
		/* background-color: red; */
		border-right: 1px solid rgba(0, 0, 0, 0.1);
	
	}
	
	.card-end{
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		height: 12vh;
		width: 27vw;
		/* background-color: red; */
		/* border-right: 2px solid #000; */
	}
	
	.temp{
		font-size: 55rpx; 
		color:rgba(77, 183, 110, 1.0);
	}
	
	.temp-warn{
		font-size: 55rpx; 
		color:rgba(183, 27, 21, 1.0);
	}
	
	.text{
		margin-bottom: -30rpx;
	}
	
	.tips {
		text-align: center;
		color: #999999;
		font-size: 28rpx;
	}
</style>
