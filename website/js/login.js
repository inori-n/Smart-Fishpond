// 登录功能 JS (login.js)
var xhr = new XMLHttpRequest();

// 定义 POST 请求的回调函数
xhr.onreadystatechange = function () {
	if (xhr.readyState === XMLHttpRequest.DONE) {
		if (xhr.status === 200) {
			if (xhr.responseText == "验证码错误！") {
				alert(xhr.responseText);
			} else {
				// 登录成功的情况
				if (xhr.responseText == '登录成功！' || xhr.responseText == "注册成功！") {
					alert(xhr.responseText);

					// 登录成功，设置登录状态
					localStorage.setItem('isLoggedIn', 'true');  // 存储登录状态
					localStorage.setItem('userAccount', document.getElementById('account').value);  // 存储用户的账号信息

					// 获取用户请求的跳转页面（如果有）
					const redirectUrl = localStorage.getItem('redirectUrl') || 'index.html';  // 默认跳转到首页

					// 登录成功后跳转到目标页面
					window.location.href = redirectUrl;
				}
				// 账号密码错误或为空的提示
				else if (xhr.responseText == "账号密码不能为空！" || xhr.responseText == "密码错误！") {
					alert(xhr.responseText);
				}
				console.log(xhr.responseText);
			}
		} else {
			console.error('Request failed: ' + xhr.statusText);
		}
	}
};

// 绑定登录按钮的点击事件
document.getElementById('login').addEventListener('click', function (e) {
	var method = 'POST';
	var url = '*****';

	xhr.open(method, url, true);
	xhr.setRequestHeader('Content-Type', 'application/json');

	const text = document.getElementById('account').value;
	const pwd = document.getElementById('password').value;
	const vercode = document.getElementById('vercode').value;

	var data = {
		account: text,
		password: pwd,
		vercode: vercode
	};

	if (text === '' || pwd === '') {
		alert("账号密码不能为空！");
	} else {
		if (vercode === '') {
			alert("请输入验证码！");
		} else {
			xhr.send(JSON.stringify(data));
			
		}
	}

	e.preventDefault(); // 防止表单默认提交

});

