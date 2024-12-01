<!-- 设备页 -->
<template>
	<view class="navbar">设备详情
<!-- 		<image src="@/static/assets/image/scan.png"
			style="height: 40rpx;width: 40rpx;position: absolute;right: 30rpx;z-index: 100;" @click="scanQRcode()"
			alt="" /> -->
		<view>
			<uni-fab
				:pattern="pattern"
				:content="content"
				:horizontal="horizontal"
				:vertical="vertical"
				:direction="direction"
				@trigger="trigger"
			></uni-fab>
		</view>
	</view>
	<view class="page">
		<view class="count_pannel">
				<view class="total_device">
					<view class="text">当前设备数量</view>
					<view class="count">{{id}}</view>
				</view>
<!-- 				<view class="total_online">
					<view class="text">在线设备数量</view>
					<view class="count" v-if="device_status == '在线'">{{id}}</view>
					<view class="count" v-if="device_status == '离线'">{{id}}</view>
				</view> -->
		</view>
		<view class="item-box" v-for="(item, index) in list" >
			<view class="data-info">
				<input class="device_text" type="text" v-model="device_name_group[index]"  @blur="saveDeviceName(index)" placeholder="未命名设备">
				<view class="device_status">
					<view id="status" class="item-tag" :class="ChangeStatusLogo(device_status)"></view>
					<view id="status_text" class="item-tag" :class="ChangeStatusText(device_status)">在线
					</view>
				</view>
			</view>
			<view class="data-info">
				<view class="circle_container">
					<image class="device-logo" src="@/static/assets/image/device_logo.png"
						style="height: 70rpx;width: 70rpx;" alt="" />
				</view>
			</view>

			<!-- <input type="text" placeholder="请输入姓名" @input="handleInput" /> -->
			<!-- <input class="device_text" type="text" placeholder="输入设备名称" @input="handleInput" /> -->
		<!-- click.stop必须加stop阻止事件冒泡否则出现bug无法传值给首页！！！！注意！！！ -->
		<button type="primary" @click.stop="selectDevice(index)" class="button_left">使用</button>
		<button type="warning" @click="delItem(index)" class="button_right">删除</button>
		</view>
		<view class="black" style="width: 320rpx;"></view>


	</view>
<!-- 	<button type="warning" @click="delItem(item)">删除</button> -->
	<!-- <button type="primary" @click="addItem">新增</button> -->
</template>

<script>
	import echart from "@/component/echart.vue";
	export default {
		components: {
			'echart': echart
		},
		data() {
			return {
				id: 0,
				list: [],
				MAC: "",
				device_status: '',
				now_device: [],
				selected_device:'',
				device_name_group:[],
				device_name:'',
				count:'',
				count_online:'',
				account:'',
				show:false,
				content: [{
						iconPath: '/static/assets/image/scan.png',
						selectedIconPath: '/static/assets/image/scan.png',
						text: '相机',
						active: false
					},
					{
						iconPath: '/static/assets/image/pic.png',
						selectedIconPath: '/static/assets/image/pic.png',
						text: '图库',
						active: false
					},{
						iconPath: '/static/assets/image/type.png',
						selectedIconPath: '/static/assets/image/type.png',
						text: '输入',
						active: false
					}],
				horizontal: 'right',
				vertical: 'bottom',
				direction: 'vertical',
				showInput:false,
			}
		},
		onLoad() {
			// uni.removeStorageSync('device_name')
			// uni.removeStorageSync('list')
			// uni.removeStorageSync('id')
			// uni.removeStorageSync('device_info')
			uni.getStorage({
				key:'list',
				success: (res) => {
					this.list = res.data
					console.log(res.data)
				}
			})
			uni.getStorage({
				key:'id',
				success: (res) => {
					this.id = res.data
					console.log(res.data)
				}
			})
			uni.getStorage({
				key:'device_info',
				success: (res) => {
					this.now_device = res.data
					console.log(res.data)
				}
			})
			uni.getStorage({
				key:'device_name',
				success: (res) => {
					this.device_name_group = res.data
					console.log(res.data)
				}
			})
			uni.getStorage({
				key:'phoneData',
				success: (res) => {
					this.account = res.data
					console.log(res.data)
				}
			})
		},
		onShow() {
			let that = this
			this.GetDeviceStatus()
			setInterval(function() {
				that.GetDeviceStatus()
			}, 5000);
		},
		methods: {
			typeDevice(){
				let that = this
				uni.showModal({
				    title: '填写设备ID',
					content:'',
					editable:true,
					placeholderText:"设备MAC码",
				    success: function (res) {
				        if (res.confirm) {
				            this.MAC = res.content
							that.addItem(this.MAC)
							console.log(res.content)
				        } else if (res.cancel) {
				            console.log('用户点击取消');
				        }
				    }
				});
			},
			// scanCode(option) {
			//     let isFlash = false;
			
			//     // 创建一个空的webview
			//     const webview = plus.webview.open(
			//         '',
			//         'webview', {
			//             top: '0px',
			//             width: '100%',
			//             height: '100%',
			//             backButtonAutoControl: "close",
			//             titleNView: {
			//                 backgroundColor: 'rgba(0, 0, 0, 0.5)',
			//                 autoBackButton: true,
			//                 titleColor: '#ffffff',
			//                 titleText: "扫码"
			//             }
			//         })
			
			//     // 创建barcode
			//     const barcode = plus.barcode.create(
			//         'barcode',
			//         [plus.barcode.QR], // 只扫二维码
			//         {
			//             top: 'auto',
			//             left: 'auto',
			//             width: '100%',
			//             height: '100%',
			//             position: 'static',
			//             scanbarColor: '#f1c01f',
			//             frameColor: '#c0ff01'
			//         }
			//     )
			
			//     // 创建按钮“闪光灯”
			//     const bFlash = new plus.nativeObj.View('nbutton', {
			//         bottom: '20px',
			//         left: option.onlyFromCamera ? '30%' : '5%',
			//         width: '40%',
			//         height: '44px'
			//     }, [{
			//         tag: 'rect',
			//         id: 'rect',
			//         rectStyles: {
			//             radius: '8px',
			//             color: 'rgba(0,0,0,0.5)'
			//         }
			//     }, {
			//         tag: 'font',
			//         id: 'text',
			//         text: '闪光灯',
			//         textStyles: {
			//             color: '#FFFFFF'
			//         }
			//     }]);
			
			//     // 创建按钮“相册”
			//     const bAlbum = (!option.onlyFromCamera) && new plus.nativeObj.View('nbutton', {
			//         bottom: '20px',
			//         left: '55%',
			//         width: '40%',
			//         height: '44px'
			//     }, [{
			//         tag: 'rect',
			//         id: 'rect',
			//         rectStyles: {
			//             radius: '8px',
			//             color: 'rgba(0,0,0,0.5)'
			//         }
			//     }, {
			//         tag: 'font',
			//         id: 'text',
			//         text: '相册',
			//         textStyles: {
			//             color: '#FFFFFF'
			//         }
			//     }]);
			
			//     // 控制闪光灯按钮样式
			//     bFlash.addEventListener('touchend', (e) => {
			//         isFlash = !isFlash;
			//         isFlash && bFlash.drawText("闪光灯", null, {color: "#00ccff"}, 'text')
			//         !isFlash && bFlash.drawText("闪光灯", null, {color: "#ffffff"}, 'text')
			//         barcode?.setFlash(isFlash);
			//     }, false);
			
			//     // 相册选取图片进行扫码识别
			//     !option.onlyFromCamera && bAlbum.addEventListener('touchend', (e) => {
			//         plus.gallery.pick(
			//             (path) => {
			//                 plus.barcode.scan(path, barcode.onmarked, barcode.onerror);
			//             },
			//             barcode.onerror
			//         );
			//     }, false);
			
			//     // 监听webview关闭，将相关控件都进行关闭
			//     webview.addEventListener("close", () => {
			//         barcode?.close();
			//         bFlashm?.close();
			//         bAlbum?.close();
			//     });
			
			//     // 扫码的成功回调：关闭webview，并执行success方法
			//     barcode.onmarked = async (type, code, file, charset) => {
			//         webview.close();
			//         await option.success(code);
			//     };
			//     barcode.onerror = async (error) => {
			//         webview.close();
			//         await option.fail(error);
			//     };
			
			//     // 将相关控件添加至webview中
			//     plus.webview.getWebviewById('webview').append(barcode)
			//     plus.webview.getWebviewById('webview').append(bFlash)
			//     !option.onlyFromCamera && plus.webview.getWebviewById('webview').append(bAlbum)
			
			//     // start
			//     barcode.start({
			//         vibrate: true
			//     })
			// },
			openImage(){
				let that=this;
				this.MAC
				// 调用手机相机和获取相册功能
				  uni.chooseImage({
				  count: 1,
				  sizeType: ['original', 'compressed'],// original 原图，compressed 压缩图，默认二者都有
				  sourceType: ['album'], //这要注意，camera是拍照，album是打开手机相册
				  success: (res)=> {
					//官方压缩   不压缩识别报 "code": 8的错误
					plus.zip.compressImage({
						src:res.tempFilePaths[0],     		//你要压缩的图片路径
						dst:'_doc/a'+res.tempFilePaths[0], //你要生成的图片路径，路径不能与src相同，不然app端会报错  
						quality: 70, //压缩比例  图片质量[10-100]
						overwrite: true,
						width: '256px' //图片宽度
					},function(e){
						    plus.barcode.scan(e.target, function(type, result){
							that.textareaVal = result;
							that.addItem(result)
						})
					})
					
				  }
				})
			},
			// chooseImageFromGallery() {
			//       uni.chooseImage({
			//         count: 1, // 默认选取一张图片
			//         sizeType: ['original', 'compressed'], // 图片质量，原图或压缩
			//         sourceType: ['album'], // 图片来源，相册
			//         success: (res) => {
			//           const tempFilePaths = res.tempFilePaths;
			//           this.scanQRcodePicture(tempFilePaths[0]);
			//         },
			//         fail: (err) => {
			//           console.log('选择图片失败：', err);
			//         }
			//       });
			// },
			// openImage(){
			// 	let that=this;
			// 	this.MAC
			// 	// 调用手机相机和获取相册功能
			// 	uni.chooseImage({
			// 	  count: 1,
			// 	  sizeType: ['original', 'compressed'],// original 原图，compressed 压缩图，默认二者都有
			// 	  sourceType: ['album'], //这要注意，camera是拍照，album是打开手机相册
			// 	  success: (res)=> {
			// 		//官方压缩   不压缩识别报 "code": 8的错误
			// 		plus.zip.compressImage({
			// 			src:res.tempFilePaths[0],     		//你要压缩的图片路径
			// 			dst:'_doc/a'+res.tempFilePaths[0], //你要生成的图片路径，路径不能与src相同，不然app端会报错  
			// 			quality: 70, //压缩比例  图片质量[10-100]
			// 			overwrite: true,
			// 			width: '256px' //图片宽度
			// 		},function(e) {
			// 			//调用原生的二维码识别方法
			// 			plus.barcode.scan(e.target, function(type, result) {
			// 				that.textareaVal = result;
			// 				that.MAC = result
			// 				that.addItem()
			// 				uni.showToast({
			// 					title: '识别成功',
			// 					icon:'none',
			// 					duration: 2000
			// 				});
			// 			}, function(e) {
			// 				uni.showToast({
			// 					title: '识别失败',
			// 					icon:'none',
			// 					duration: 2000
			// 				});
			// 			});
			// 		},function(error) {
			// 			uni.showToast({
			// 				title: '识别失败',
			// 				icon:'none',
			// 				duration: 2000
			// 			});
			// 		})

			// 	  }
			// 	})				
			// },
			// chooseImageFromGallery() {
			//       uni.chooseImage({
			//         count: 1, // 默认选取一张图片
			//         sizeType: ['original', 'compressed'], // 图片质量，原图或压缩
			//         sourceType: ['album'], // 图片来源，相册
			//         success: (res) => {
			//           const tempFilePaths = res.tempFilePaths;
			//           // this.scanQRCodeFromPicture(tempFilePaths[0]);
			//         },
			//         fail: (err) => {
			//           console.log('选择图片失败：', err);
			//         }
			//       });
			// },
			async scanQRCodeFromPicture(imagePath) {
				await uni.scanCode({
					onlyFromCamera: true,
					scanType: ['qrCode'],
				}).then(res => {
					this.MAC = res.result
				})
				console.log(this.MAC)
				this.addItem()
			},
			trigger(e){
				if(e.index === 0){
					this.scanQRcode()
				}else if(e.index === 1){
					this.openImage()
				}else if(e.index === 2){
					this.typeDevice()
				}
			},
			saveDeviceName(index) {
				uni.setStorage({
					key: 'device_name',
					data: this.device_name_group,
					success: function() {
						console.log('保存成功');
					}
				});
		    },
			selectDevice(index){
				var device_id = this.now_device[index]
				console.log(index)
				console.log(device_id)
				uni.setStorage({
					key:'device_selected',
					data:device_id,
					success: (res) => {
						console.log(res.data)
					}
				})
				uni.reLaunch({
					url:'/pages/index/index'
				})
				uni.showLoading({
					title: '加载中'
				});
				setTimeout(function(){
					uni.hideLoading()
				},4000)
				// console.log(index)
				// console.log(this.now_device[index])
				// uni.setStorageSync('device_selected',device_id);
			},
			
			
			//异步获取数据并赋值！！！重要！！关键
			async uniappScan() {
				//await标明要等待的函数
				await uni.scanCode({
					onlyFromCamera: false,
					scanType: ['qrCode'],
				}).then(res => {
					this.MAC = res.result
				})
				console.log(this.MAC)
				this.addItem()
			},
			scanQRcode() {
				// #ifdef H5
				// #endif
				// #ifdef MP-WEIXIN||APP-PLUS
				this.uniappScan()
				// #endif
			},
			addItem(mac) {
				console.log(mac)
				if(mac != undefined){ 
					this.MAC = mac;
				}
				if (this.MAC.slice(0,29) == '66 7a 75 7a 6b 79 32 30 32 34') {
					var tempId = this.MAC.slice(30,100)
					console.log(tempId) 
					// this.now_device[tempId] = this.id
					// console.log(this.now_device[tempId])
					//判断设备是否已经添加，通过查找数组是否包含某个元素
					if(this.now_device.includes(tempId)){
						uni.showModal({
							title: "提示",
							content: "设备已经存在！",
							showCancel: false,
						})
					}
					else{
						this.now_device.push(tempId)
						// this.now_device[tempId] = this.id
						//往字典里添加这个设备"设备ID"："列表ID"（废案）
						// console.log(this.now_device[tempId])
						console.log(this.now_device)
						let add = {
							id: parseInt(this.id) + 1
						}
						this.list.push(add)
						this.id = parseInt(this.id) + 1
						uni.showModal({
							title: "提示",
							content: "设备添加成功！",
							showCancel: false,
						})
						uni.request({
							url: "*****",
							method: 'POST',
							data:{
								"account":this.account,
								"name":this.now_device
							},
							success: (res) => {
								console.log(res)
							}
						})
						//将设备数据保存到本地缓存实现跨页面数据传递,异步
						uni.setStorage({
							key:'list',
							data:this.list,
							success: (res) => {
							}
						})
						uni.setStorage({
							key:'id',
							data:this.id,
							success: (res) => {
							}
						})
						uni.setStorage({
							key:'device_info',
							data:this.now_device,
							success: (res) => {
							}
						})
					}
				} 
				else {
					uni.showModal({
						title: "警告",
						content: "设备非法！",
						showCancel: false,
					})
				}
			},
			delItem(index) {
				this.list.splice(index, 1);
				this.now_device.splice(index, 1);
				this.id -= 1;
				uni.setStorage({
					key:'list',
					data:this.list,
					success: (res) => {
					}
				})
				uni.setStorage({
					key:'id',
					data:this.id,
					success: (res) => {
					}
				})
				uni.setStorage({
					key:'device_info',
					data:this.now_device,
					success: (res) => {
					}
				})
				uni.clearStorage('device_selected')
			},
			handleInput(event) {
				this.name = event.target.value;
			},
			ChangeStatusLogo(status) {
				if (status == '在线') {
					return 'online';
				} else {
					return 'online';
				}
			},
			ChangeStatusText(status) {
				if (status == '在线') {
					return 'online_text';
				} else {
					return 'online_text';
				}
			},
			GetDeviceStatus: function() {
				let that = this
				uni.request({
					url: '*****', //请求设备详细
					data: {
						product_id: 'eG0Js21avQ',
						device_name: 'test',
					},
					method: 'GET',
					header: {
						'authorization': '*****', //自定义请求头信息
					},
					success: (res) => {
						if (res.data.data.status == 1) {
							that.device_status = '在线'
						} else {
							that.device_status = '离线'
						}
					}
				});
			},

		}
	}
</script>

<style>
	.navbar {
		/* position: absolute; */
		position: fixed;
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
	
	.count_pannel{
		display: flex;
		flex-direction: row;
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
	
	.total_device{
		text-align: center;
		border-radius: 20rpx;
		border-top-right-radius: 0;
		border-bottom-right-radius: 0;
		height: 250rpx;
		flex: 1;
		/* background-color: red; */
		/* border-right: black; */
		z-index: 2;
	}
	
	.total_online{
		text-align: center;
		border-radius: 20rpx;
		border-top-left-radius: 0;
		border-bottom-left-radius: 0;
		height: 250rpx;
		flex: 1;
		/* background-color: green; */
/* 		border-left-width: 100rpx;
		border-left-color: black; */
		z-index: 2;
	}
	
	.text{
		line-height: 125rpx;
	}
	
	.count{
		line-height: 50rpx;
		font-size: 80rpx;
	}


	.item-box {
		display: flex;
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

	.device_text {
		text-align: left;
		margin-top: 5rpx;
		margin-left: 15rpx;
		/* margin: -30rpx 0 20rpx -30rpx; */
		font-size: 35rpx;
	}

	.device_status {
		display: flex;
		margin-top: 5rpx;
		margin-left: 18rpx;
		justify-content: left;
		align-items: center;

	}

	.circle_container {
		display: flex;
		justify-content: center;
		align-items: center;
		margin-right: 15rpx;
		height: 100rpx;
		width: 100rpx;
		border-radius: 50%;
		background-color: rgba(241, 246, 245, 1);
		z-index: 1;
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
		/* margin-left: 35rpx; */
		border-radius: 50%;
		background-color: rgba(0, 202, 0, 1.0);
		color: rgba(0, 202, 0, 1.0);
		z-index: 1;
	}

	.offline {
		width: 15rpx;
		height: 15rpx;
		/* margin-left: 35rpx; */
		border-radius: 50%;
		background-color: rgba(228, 30, 0, 1.0);
		z-index: 1;

	}
	
	button::after{ 
		border: none !important;
	} 

	
	.button_left{
		position: relative;
		border-top-right-radius: 0 !important;
		border-top-left-radius: 0 !important;
		border-bottom-right-radius: 0 !important;
		border-bottom-left-radius: 12px;
		width: 300rpx ;
		bottom: -18rpx;
	}
	
	.button_right{
		position: relative;
		border-top-right-radius: 0 !important;
		border-top-left-radius: 0 !important;
		border-bottom-left-radius: 0 !important;
		border-bottom-right-radius: 12px;
		width: 300rpx ;
		bottom: -18rpx;
	}

</style>