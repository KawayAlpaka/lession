$(function () {
    setTimeout(function () {
        alert("一秒后弹出的提示");
    },1000);
    layer.prompt("您的名字是:",function(name, index1){
        layer.close(index1);
        layer.alert("早上好"+name, function(index2){
            layer.close(index2);
            layer.confirm('您要登录吗?', {icon: 3, title:'提示'}, function(index3){
                layer.close(index3);
                layer.alert("登录成功:"+name);
            });
        });
    });
    // var name = layer.prompt("您的名字是:",function(name, index1){});
    // layer.alert("早上好"+name, function(index2){});
    // var r = layer.confirm('您要登录吗?', {icon: 3, title:'提示'}, function(index3){});
    // r && layer.alert("登录成功:"+name);
});
