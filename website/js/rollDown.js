function scrollDown(distance) {
    let scrollStep = 8
    let scrollInterval = setInterval(() => {
      window.scrollBy(0, scrollStep);
	  // 滑到底
      // if (window.pageYOffset >= document.body.scrollHeight - window.innerHeight) {
      //   clearInterval(scrollInterval);
      // }
	  // 滑一页
	  if (window.pageYOffset >= window.innerHeight) {
	    clearInterval(scrollInterval);
	  }
    }, 1);
}

//调整导航栏样式
window.addEventListener('scroll', function() {
  var navbar = document.getElementById('navbar');
  var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  
  if (scrollTop >= window.innerHeight) {
	  navbar.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';

  } else if(scrollTop <= window.innerHeight){
	  navbar.style.backgroundColor = 'rgba(0, 0, 0, 0)';
  }else{
	  
  }
  
  
});