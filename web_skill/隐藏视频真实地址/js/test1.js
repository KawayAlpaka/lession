// 这种方案没有真正隐藏，用户还是可以下载到文件
var video = document.getElementById("video");
window.URL = window.URL || window.webkitURL; //用来判断电脑系统window.webkitURL和window.URL是一样的，window.URL标准定义，window.webkitURL是webkit内核的实现，一般手机上就是使用这个，还有火狐等浏览器的实现。
var xhr = new XMLHttpRequest();  // 实现数据请求 进行http协议的通信
var play_url = '/video/movie.mp4'; //网上的视频地址
xhr.open("GET", play_url, true);  //打开一个地址，请求类型 地址 异步或同步 
xhr.responseType = "blob";  // 设置返回值 为blob对象
xhr.onload = function (e) { //请求后要执行的函数
    if (this.status == 200) { //成功 
        var blob = this.response;  // 请求成功获取的参数 赋值给 “blob”
        console.log(blob);
        // video.onload = function () { //获取到video 后执行的函数 ？
        //   console.log("video.onload");
        //     window.URL.revokeObjectURL(video.src); //释放这个对象
        // };
        video.src = window.URL.createObjectURL(blob); //创建一个对象 视频只需要获取一次， 获取一次后，就需要释放这个对象。
    }
}
xhr.send(); //发送请求