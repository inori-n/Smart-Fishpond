var xhr = new XMLHttpRequest();
// 定义 POST 请求的回调函数
xhr.onreadystatechange = function () {
  if (xhr.readyState === XMLHttpRequest.DONE) {
    if (xhr.status === 200) {
      // 请求成功
      console.log(xhr.responseText);
    } else {
      // 请求出错
      console.error('Request failed: ' + xhr.statusText);
    }
  }
};

const send = document.getElementById('timer');

send.addEventListener('click', function () {
	var method = 'POST'; // 请求方法可以是GET或POST等
	var url = '******' // 请求的目标地址
	xhr.open(method, url, true); // 使用open方法设置请求方法和URL
	xhr.setRequestHeader('Content-Type', 'application/json');
	let time = 30;   //初始化禁用时间
	send.style.cursor = 'not-allowed';
	var email = document.getElementById('account').value;
	var data = {
		account:email
	}; // 请求体中的数据
	if(email == ""){
		alert("请先填写邮箱和密码!")
	}else{
		send.disabled = true;
		xhr.send(JSON.stringify(data)); // 将数据作为参数发送
		alert("验证码已发送！")
		const timer = setInterval(function () {
		    if (time == 0) {
				send.disabled = false;
		        //清除定时器
		        clearInterval(timer);
		        send.innerHTML = '获取验证码'; //定时完成恢复发送样式
				send.style.cursor = 'pointer';
		    } else {
		        send.innerHTML = `${time}`; //倒计时不为零时设置文字样式
		        time--;
		    }
		}, 1000);//播放速度
	}
	

});