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

document.getElementById('login').addEventListener('click', function(e) {
	var method = 'POST'; // 请求方法可以是GET或POST等
	var url = '*****' // 请求的目标地址
	xhr.open(method, url, true); // 使用open方法设置请求方法和URL
	xhr.setRequestHeader('Content-Type', 'application/json');
	//获取用户名的value值
	const text = document.getElementById('account').value;
	 
	//获取密码框的value值
	const pwd = document.getElementById('password').value;
	
	//获取验证码的value值
	const vercode = document.getElementById('vercode').value;
	
	
	var data = { 
		account:text,
		password:pwd,
		vercode:vercode
	}; // 请求体中的数据
	xhr.send(JSON.stringify(data)); // 将数据作为参数发送
	
    e.preventDefault()
    console.log(text);
    console.log(pwd);
	console.log(vercode);
})



