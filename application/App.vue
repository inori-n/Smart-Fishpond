<style lang="scss">
	@import "uview-ui/index.scss";
</style>
<script>
	export default {
		onLaunch: function() {
			var check = uni.getStorageSync('islogin')
			if(check == true){
				uni.reLaunch({
					url:'pages/index/index'
				})
			}else{
				uni.reLaunch({
					url:'/pages/login/login'
				})
			}
			console.log(check)
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import '@/uni_modules/uni-scss/index.scss';
	/* #ifndef APP-NVUE */
	@import '@/static/customicons.css';
	// 设置整个项目的背景色
	page {
		background-color: #f5f5f5;
	}

	/* #endif */
	.example-info {
		font-size: 14px;
		color: #333;
		padding: 10px;
	}
	
	html {
		overflow-x: hidden;
	}
	body::-webkit-scrollbar {
		display: none;
	}
</style>
