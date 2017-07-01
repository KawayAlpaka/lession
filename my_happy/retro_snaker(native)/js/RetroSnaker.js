
var config = {
    speed:8,
    direction:"right"
};
var beanPosition = {
    top:0,
    left:0
};

var getPosition = function (element) {
    return {
        top:parseInt(element.style.top.replace("px","")),
        left:parseInt(element.style.left.replace("px",""))
    };
};
var run = function (snaker,direction) {
    var head = snaker.firstElementChild;
    var headPostion = getPosition(head);
    var _top =  headPostion.top;
    var _left =  headPostion.left;
    if(_top > 600 || _top<0 || _left>1000 || _left<0){
        clearInterval(interval);
        if(config.speed != 0 ){
            alert("撞墙，game over");
        }
        // config.speed = 0;
    }else{
        head.style.top = _top + direction.top +"px";
        head.style.left = _left + direction.left +"px";
        var __top,__left;
        snaker.querySelectorAll(".snaker-body").forEach(function(snakerBody){
            __top = parseInt(snakerBody.style.top.replace("px",""));
            __left = parseInt(snakerBody.style.left.replace("px",""));
            if(__top == _top && __left == _left){
            }else {
                snakerBody.style.top = _top  +"px";
                snakerBody.style.left = _left  +"px";
            }
            _top = __top;
            _left = __left;
        });
        eat();
    }
};

window.addEventListener("keydown",function(event){
    switch (event.code){
        case "ArrowUp":
            if(config.direction != "down"){
                config.direction = "up";
            }
            break;
        case "ArrowDown":
            if(config.direction != "up"){
                config.direction = "down";
            }
            break;
        case "ArrowLeft":
            if(config.direction != "right"){
                config.direction = "left";
            }
            break;
        case "ArrowRight":
            if(config.direction != "left"){
                config.direction = "right";
            }
            break;
    }
});

var interval = setInterval(function () {
    var speed = config.speed;
    switch (config.direction){
        case "up":
            run(mySnaker,{top:-speed,left:0});
            break;
        case "down":
            run(mySnaker,{top:speed,left:0});
            break;
        case "left":
            run(mySnaker,{top:0,left:-speed});
            break;
        case "right":
            run(mySnaker,{top:0,left:speed});
            break;
    }
},50);

var createBean = function () {
    var bean = document.createElement("div");
    bean.className = "bean";
    beanPosition.top = 50 + Math.random() * 500;
    beanPosition.left = 50 + Math.random() * 900;
    bean.style.top = beanPosition.top  +"px";
    bean.style.left = beanPosition.left  +"px";
    wall.append(bean);
};
var removeBean = function (bean) {
    var _parentElement = bean.parentNode;
    if(_parentElement){
        _parentElement.removeChild(bean);
    }
};
var getDistance = function (p1,p2) {
    var h =  Math.abs(p1.top - p2.top);
    var w = Math.abs(p1.left - p2.left);
    return Math.sqrt(Math.pow(h,2) + Math.pow(w,2));
};
var eat = function(){
    // document.querySelector(".bean");
    var myHeadPostion = getPosition(mySnaker.firstElementChild);
    var distance = getDistance(myHeadPostion,beanPosition);
    if(distance<=9){
        removeBean(document.querySelector(".bean"));
        createBean();
        var position = getPosition(mySnaker.lastElementChild);
        var body = document.createElement("div");
        body.className = "snaker-body";
        body.style.top = position.top  +"px";
        body.style.left = position.left  +"px";
        mySnaker.append(body);
    }
};

createBean();