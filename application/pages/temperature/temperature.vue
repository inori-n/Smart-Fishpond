<template>
	<view class="main-page">
	<echart class="echarts" :style="{width:'100%',height:'250px'}" :option="Options"></echart>
		<view class="chart" id="chart_2"></view>
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
	</view>
</template>

<script>
	import echart from "@/component/echart.vue";
	// import * as echarts from 'echarts' // 引入ECharts库
	// import {CanvasRenderer} from 'echarts/renderers';
	// import {TitleComponent,TooltipComponent,GridComponent, DatasetComponent, TransformComponent, LegendComponent,LineChart,LabelLayout} from 'echarts/components';
	export default {
		components: {
			'echart': echart
		},
		data() {
			return {
				Options: {
				    backgroundColor: 'rgba(241, 246, 245, 1)',
				    color: color,
				    legend: {
						// bottom: 20,
					    x: 'center',  // 图例水平位置，可以是left、center或right
					    y: 'bottom',  // 图例垂直位置，可以是top、middle或bottom
				    },
				    tooltip: {
				        trigger: "axis",
				        extraCssText: 'background: #fff; border-radius: 0;box-shadow: 0 0 3px rgba(0, 0, 0, 0.2);color: #333;',
				        axisPointer: {
				            type: 'shadow',
				            shadowStyle: {
				                color: '#ffffff',
				                shadowColor: 'rgba(225,225,225,1)',
				                shadowBlur: 5
				            }
				        }
				    },
				    grid: {
						left:"10%",
						right:"10%",
				        top:"20%",
						bottom:"20%",
				        containLabel: true
				    },
				    xAxis: [{
				        type: "category",
				        // boundaryGap: false,
				        axisLabel: {
							interval: 0,
				            fontSize:10,
				            textStyle: {
				                color: "#333"
				            }
				        },
				        axisLine: {
				            lineStyle: {
				                color: "#D9D9D9"
				            }
				        },
				        data: this.xData,
				    }],
				    yAxis: [{
				        type: "value",
						splitNumber: 3,
						nameGap: 1,
				        name: '气温 (单位：℃)',
				        axisLabel: {
				            textStyle: {
				                color: "#666"
				            }
				        },
				        nameTextStyle: {
				            color: "#666",
				            fontSize: 12,
				            lineHeight: 40
				        },
				        // 分割线
				        splitLine: {
				            lineStyle: {
				                type: "dashed",
				                color: "#E9E9E9"
				            }
				        },
				        axisLine: {
				            show: false
				        },
				        axisTick: {
				            show: false
				        }
				    }],
				    series: [{
				        name: "当前气温",
				        type: "line",
				        smooth: true,
				        symbolSize: 8,
				        zlevel: 3,
				        lineStyle: {
				            normal: {
				                color: color[1],
				                shadowBlur: 3,
				                shadowColor: hexToRgba(color[1], 0.5),
				                shadowOffsetY: 8
				            }
				        },
				        symbol: 'circle',//数据交叉点样式 (实心点)
				        areaStyle: {
				            normal: {
				                color: new echarts.graphic.LinearGradient(
				                    0,
				                    0,
				                    0,
				                    1,
				                    [{
				                            offset: 0,
				                            color: hexToRgba(color[1], 0.3)
				                        },
				                        {
				                            offset: 1,
				                            color: hexToRgba(color[1], 0.1)
				                        }
				                    ],
				                    false
				                ),
				                shadowColor: hexToRgba(color[1], 0.1),
				                shadowBlur: 10
				            }
				        },
				        data: this.yData
				    }]
				},
				color:[
				    "#00CA69",
				    "#00CA69"
				],
				prediction_data:"",
				xData:'',
				yData:'',
				Highest:'',
				Average:'',
				Lowest:'',
			}
		},
		onLoad(){

		},
		
		
		mounted() {
			uni.showLoading({
				title: '加载中'
			});
			setTimeout(function(){
				uni.hideLoading()
			},2000)
			let that = this
			this.TemperatureChart()
			this.GetHighest()
			this.GetAverage()
			this.GetLowest()
			setInterval(function() {
				that.TemperatureChart()
			}, 1000);
			setInterval(function() {
				that.GetHighest()
				that.GetAverage()
				that.GetLowest()
			}, 5000);
			this.TemperatureChart() //在Vue的mounted生命周期中，创建一个ECharts实例
		},
		onShow(){
			let that = this
			this.TemperatureChart()
			this.GetHighest()
			this.GetAverage()
			this.GetLowest()
			setInterval(function() {
				that.TemperatureChart()
			}, 1000);
			setInterval(function() {
				that.GetHighest()
				that.GetAverage()
				that.GetLowest()
			}, 5000);
			this.TemperatureChart() //在Vue的mounted生命周期中，创建一个ECharts实例
		},
		methods: {
			ChangeFont(value){
				if (value > 28 || value < 24) {
					return 'temp-warn';
				} else {
					return 'temp';
				}
			},
			GetHighest(){
				uni.request({
					url: "*****",
					method: 'GET',
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
					url: "*****",
					method: 'GET',
					success: (res) => {
						// this.Average = (res.data[0].AirTemperature + res.data[1].AirTemperature + res.data[2].AirTemperature + res.data[3].AirTemperature + res.data[4].AirTemperature) / 5
						this.Average = res.data[0].AirTemperature
					}
				})
			},
			GetLowest(){
				uni.request({
					url: "http://json.moyu-home.cn/prediction",
					method: 'GET',
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
			GetDataFromMySqlTime: function() {
				var time
				let that = this
				this.time
				uni.request({
					url: "*****",
					method: 'GET',
					success: (res) => {
						that.time = [res.data[4].Time.slice(11,19),res.data[3].Time.slice(11,19),res.data[2].Time.slice(11,19),res.data[1].Time.slice(11,19),res.data[0].Time.slice(11,19)]
						// console.log(res.data[0].Time.slice(11,19));
						// this.time = day
						// this.time = JSON.stringify(this.time)
						// this.time = JSON.parse(this.time)
					}
				})
				return this.time;
			},
			hexToRgba(hex, opacity){
			    let rgbaColor = "";
			    let reg = /^#[\da-f]{6}$/i;
			    if (reg.test(hex)) {
			        rgbaColor = `rgba(${parseInt("0x" + hex.slice(1, 3))},${parseInt(
			      "0x" + hex.slice(3, 5)
			    )},${parseInt("0x" + hex.slice(5, 7))},${opacity})`;
			    }
			    return rgbaColor;
			},
			GetDataFromMySqlData: function() {
				var data
				let that = this
				this.data
				uni.request({
					url: "*****",
					method: 'GET',
					success: (res) => {
						that.data = [res.data[4].AirTemperature,res.data[3].AirTemperature,res.data[2].AirTemperature,res.data[1].AirTemperature,res.data[0].AirTemperature]
						// this.time = day
						// this.time = JSON.stringify(this.time)
						// this.time = JSON.parse(this.time)
					}
				})
				return this.data;
			},
			TemperatureChart() {
				var prediction_data = this.prediction_data
				var data = this.GetDataFromMySqlData()
				var time = this.GetDataFromMySqlTime();
				let myChart = echarts.init(document.getElementById('chart_2'));
				let color = [
				    "#00CA69",
				    "#00CA69"
				];
				this.xData = time;
				this.yData = data;
				// let xAxisData = time;
				// let yAxisData2 = data;
				
				// let xAxisData = [this.time[0].Time,this.time[1].Time,this.time[2].Time,this.time[3].Time,this.time[4].Time];
				// let yAxisData2 = [this.time[0].WaterTemperature,this.time[1].WaterTemperature,this.time[2].WaterTemperature,this.time[3].WaterTemperature,this.time[4].WaterTemperature];
				
				const hexToRgba = (hex, opacity) => {
				    let rgbaColor = "";
				    let reg = /^#[\da-f]{6}$/i;
				    if (reg.test(hex)) {
				        rgbaColor = `rgba(${parseInt("0x" + hex.slice(1, 3))},${parseInt(
				      "0x" + hex.slice(3, 5)
				    )},${parseInt("0x" + hex.slice(5, 7))},${opacity})`;
				    }
				    return rgbaColor;
				}
				
			},
		}
	}
</script>

<style>
	.main-page{
		display: flex;
		z-index: 1;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		flex-wrap: nowrap;
		background-color:rgba(241, 246, 245, 1);
		height: 100vh;
		width: 100vw;
		gap: 30rpx;
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
	
	.chart {
		position: absolute;
		top: 10rpx;
		height: 35vh;
		width: 100vw;
		background-color:rgba(241, 246, 245, 1);
	}
</style>
