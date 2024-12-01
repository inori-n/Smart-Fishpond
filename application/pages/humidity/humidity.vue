<template>
<!-- 	<view class="contain">
	<view class="navbar"><image src="@/static/assets/image/back.png" style='height: 4vh;width: 8vw;position: absolute;left: 2vw;'  mode="" @click="gotoIndex()"></image>湿度详情</view>
	</view> -->
	<view class="page">
		<echart class="echarts" :style="{width:'100vw',height:'35vh',}" :option="Options"></echart>
		<view class="unit" style="position: absolute;font-size: 30rpx;right: 5vw;top: 42.5vh;">单位: RH</view>
		<view class="detail">
			<view class="card">
				<view class="temp">{{Lowest}} %</view>
				<view class="name">最低值</view>
			</view>
			<view class="card">
				<view class="temp">{{Average}} %</view>
				<view class="name">当前值</view>
			</view>
			<view class="card-end">
				<view class="temp">{{Highest}} %</view>
				<view class="name">最高值</view>
			</view>
		</view>
		<view class="tips">* 适宜鳗鱼养殖的湿度应在60% ~ 80%</view>
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
							 name: '湿度 (单位：%RH)',
							 splitNumber: 3,
							 nameGap: 15,
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
					         name: '当前湿度',
					         type: 'line',
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
						 // {
					  //        name: '昨日',
					  //        type: 'line',
					  //        smooth: true,
					  //        showSymbol: false,
					  //        symbol: 'circle',
					  //        symbolSize: 6,
					  //        data: ['1200', '1400', '808', '811', '626', '488', '1600', '1100', '500', '300', '1998', '822'],
					  //        areaStyle: {
					  //            normal: {
					  //                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
					  //                    offset: 0,
					  //                    color: 'rgba(216, 244, 247,1)'
					  //                }, {
					  //                    offset: 1,
					  //                    color: 'rgba(216, 244, 247,1)'
					  //                }], false)
					  //            }
					  //        },
					  //        itemStyle: {
					  //            normal: {
					  //                color: '#58c8da'
					  //            }
					  //        },
					  //        lineStyle: {
					  //            normal: {
					  //                width: 3
					  //            }
					  //        }
					  //    },
						 ]
				},
				//echarts 设置结束
				Lowest:'',
				Average:'',
				Highest:'',
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
			this.GetHighest()
			this.GetAverage()
			this.GetLowest()
			this.tim_1 = setInterval(function() {
				that.GetHighest()
				that.GetAverage()
				that.GetLowest()
			}, 1000);
			this.tim = setInterval(function() {
				that.GetDatafromStorage()
				that.GetDataFromMySqlData()
				that.GetDataFromMySqlTime()
			}, 1000);
		},
		onShow() {
			// let that = this
			// this.GetDataFromMySqlData()
			// this.GetDataFromMySqlTime()
			// this.GetHighest()
			// this.GetAverage()
			// this.GetLowest()
			// setInterval(function() {
			// 	that.GetHighest()
			// 	that.GetAverage()
			// 	that.GetLowest()
			// 	that.GetDataFromMySqlData()
			// 	that.GetDataFromMySqlTime()
			// }, 5000);
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
				if (value > 80 || value < 60) {
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
						High = res.data[0].Humidity
						for(var i = 0;i < 5;i++){
							if(res.data[i].Humidity > High){
								High = res.data[i].Humidity
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
						this.Average = res.data[0].Humidity
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
						Low = res.data[0].Humidity
						for(var i = 0;i < 5;i++){
							if(res.data[i].Humidity < Low){
								Low = res.data[i].Humidity
							}
						}
						this.Lowest = Low
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
						that.time = [res.data[4].Time.slice(10,19),res.data[3].Time.slice(10,19),res.data[2].Time.slice(10,19),res.data[1].Time.slice(10,19),res.data[0].Time.slice(10,19)]
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
						that.data = [res.data[4].Humidity,res.data[3].Humidity,res.data[2].Humidity,res.data[1].Humidity,res.data[0].Humidity]

					}
				})
				this.Options.series[0].data = this.data
				return this.data;
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
		gap: 80rpx;
	}
	
	.detail{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		/* gap: rpx; */
		width: 80vw;
		height: 15vh;
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
		height: 15vh;
		width: 27vw;
		/* background-color: red; */
		border-right: 1px solid rgba(0, 0, 0, 0.1);
	
	}
	
	.card-end{
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		height: 15vh;
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
	
	.tips {
		text-align: center;
		color: #999999;
		font-size: 28rpx;
	}
</style>
