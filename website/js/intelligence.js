const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');
const prompt = document.getElementById('prompt');
const keywordsContainer = document.getElementById('keywords-container');  // 获取关键词框容器

const apiUrl = '*****';
let firstMessageSent = false;  // 记录是否发送了第一个消息

// 页面加载时的初始化操作
window.onload = function () {
    // 显示提示文字
    const text = "有什么可以帮忙的？";
    let i = 0;
    prompt.style.opacity = 1;
    const interval = setInterval(() => {
        prompt.textContent += text[i];
        i++;
        if (i === text.length) {
            clearInterval(interval);
        }
    }, 100);

    // 页面加载时，检查登录状态
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const loginButton = document.getElementById('loginButton');
    if (isLoggedIn) {
        loginButton.textContent = '退出登录';
    } else {
        loginButton.textContent = '用户登录';
    }

    // 显示关键词框
    keywordsContainer.style.display = 'flex';
};

// 处理登录/退出按钮点击事件
function handleLoginStatus() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (isLoggedIn) {
        // 退出登录
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userAccount');
        alert('已退出登录');
        window.location.reload(); // 重新加载页面以更新登录状态
    } else {
        // 跳转到登录页面
        window.location.href = 'login.html';
    }
}

// 检查登录状态后跳转
function checkLoginAndRedirect(page) {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (isLoggedIn) {
        window.location.href = page;  // 已登录，跳转到目标页面
    } else {
        localStorage.setItem('redirectUrl', page);  // 未登录，保存目标页面的 URL
        window.location.href = 'login.html';  // 跳转到登录页面
    }
}

// 发送消息
async function sendMessage() {
    const message = userInput.value.trim();
    if (!message) return;

    appendMessage(message, 'user-msg');
    userInput.value = '';
    chatBox.scrollTop = chatBox.scrollHeight;

    // 如果是第一次发送消息，调整聊天框高度
    if (!firstMessageSent) {
        document.getElementById('chat-container').style.height = '87vh'; // 增加聊天框的高度
        firstMessageSent = true;
    }

    // 隐藏提示文字
    prompt.style.opacity = 0;  // 隐藏提示文字
    prompt.textContent = '';   // 清空提示文字内容

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ input: message })
        });

        if (!response.ok) throw new Error('网络错误：无法访问接口');

        const data = await response.json();
        const botMessage = data.result || '抱歉，我没有理解您的问题。';

        // 这里修改了头像的链接，使用新的头像 'img/fish.png'
        appendMessage(botMessage, 'bot-msg', 'img/fish.png');
        chatBox.scrollTop = chatBox.scrollHeight;

        // 增加聊天框的高度
        document.getElementById('chat-container').style.height = '87vh';

    } catch (error) {
        console.error('请求失败:', error);
        appendMessage('请求失败，请稍后再试。错误详情: ' + error.message, 'bot-msg', 'img/fish.png');
        chatBox.scrollTop = chatBox.scrollHeight;

        document.getElementById('chat-container').style.height = '87vh'; // 增加聊天框的高度
    }
}

// 发送关键词消息
function sendKeywordMessage(keyword) {
    // 隐藏关键词框
    keywordsContainer.style.display = 'none';

    // 发送消息到聊天框
    appendMessage(keyword, 'user-msg');

    // 调整聊天框高度
    if (!firstMessageSent) {
        document.getElementById('chat-container').style.height = '87vh'; // 增加聊天框的高度
        firstMessageSent = true;
    }

    // 隐藏提示文字
    prompt.style.opacity = 0;
    prompt.textContent = '';

    // 模拟请求发送
    handleBotResponse(keyword);
}

// 处理机器人回复
async function handleBotResponse(userMessage) {
    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ input: userMessage })
        });

        if (!response.ok) throw new Error('网络错误：无法访问接口');

        const data = await response.json();
        const botMessage = data.result || '抱歉，我没有理解您的问题。';

        appendMessage(botMessage, 'bot-msg', 'img/fish.png');
        chatBox.scrollTop = chatBox.scrollHeight;

        // 增加聊天框的高度
        document.getElementById('chat-container').style.height = '87vh';

    } catch (error) {
        console.error('请求失败:', error);
        appendMessage('请求失败，请稍后再试。错误详情: ' + error.message, 'bot-msg', 'img/fish.png');
        chatBox.scrollTop = chatBox.scrollHeight;

        document.getElementById('chat-container').style.height = '87vh'; // 增加聊天框的高度
    }
}

// 添加消息到聊天框
function appendMessage(message, className, avatar) {
    const msgElement = document.createElement('div');
    msgElement.className = `message ${className}`;

    if (avatar) {
        const avatarElement = document.createElement('img');
        avatarElement.src = avatar;
        avatarElement.className = 'avatar';
        msgElement.appendChild(avatarElement);
    }

    const messageElement = document.createElement('div');
    messageElement.className = 'message-content';
    messageElement.textContent = message;

    msgElement.appendChild(messageElement);
    chatBox.appendChild(msgElement);
}

// 绑定按钮点击事件
sendBtn.addEventListener('click', sendMessage);

// 绑定回车键事件
userInput.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
});

