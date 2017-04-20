$(function () {
    setTimeout(function () {
        alert("一秒后弹出的提示");
    },1000);
    var name = prompt("您的名字是:");
    alert("早上好"+name);
    var r = confirm("您要登录吗?");
    r && alert("登录成功:"+name);
});

