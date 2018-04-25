(function () {

    var bindDom0Dom2Dom3 = function (o) {
        // 相同事件，先注册的先触发
        // dom2
        o.addEventListener("click", function () {
            console.log("window dom2 onclick1");
        });
        // dom0
        o.onclick = function () {
            console.log("window dom0 onclick");
        };
        // dom2
        o.addEventListener("click", function () {
            console.log("window dom2 onclick2");
        });
        // dom3 与dom2的区别是，dom3多了更多的事件
        o.addEventListener("mousedown", function () {
            console.log("window dom3 mousedown");
        });
        o.addEventListener("mouseup", function () {
            console.log("window dom3 mouseup");
        });
    };
    // bindDom0Dom2Dom3(window);


    // 事件流 
    wai.addEventListener("click", function (e) {
        console.log("wai click 冒泡");
        console.log(e);
    }, false);
    wai.addEventListener("click", function (e) {
        console.log("wai click 捕获");
        console.log(e);
    }, true);
    nei.addEventListener("click", function (e) {
        console.log("nei click 捕获");
        console.log(e);
        // //阻止冒泡后，wai的冒泡事件就不会触发
        e.stopPropagation();
        //立即阻止后，nei的其他事件就不会触发，也不会继续冒泡
        e.stopImmediatePropagation();
    }, true);
    nei.addEventListener("click", function (e) {
        console.log("nei click 冒泡");
        console.log(e);
    }, false);



    //自定义事件-点击3次就会触发的事件
    var click3Event = new Event("click3");
    var setClick3 = function (element,cb) {
        element.addEventListener("click3", cb);
        var num = 0;
        element.addEventListener("click", function (e) {
            e.stopPropagation();
            num++;
            if (num == 3) {
                element.dispatchEvent(click3Event);
                num = 0;
            }
        });
    };
    setClick3(document.querySelector("#click3Element .nei"),function(e){
        console.log("nei click3 event");
        console.log(e);
    });
    setClick3(document.querySelector("#click3Element .wai"),function(e){
        console.log("wai click3 event");
        console.log(e);
    });


    //CustomEvent-定义CustomEvent时，可以设置其属性，比如是否冒泡
    var click3CustemEvent = new CustomEvent("click3CustemEvent", {
        detail: "detail",
        bubbles :true
    });
    var setClick3CustemEvent = function (element,cb) {
        element.addEventListener("click3CustemEvent", cb);
        var num = 0;
        element.addEventListener("click", function (e) {
            e.stopPropagation();
            num++;
            if (num == 3) {
                element.dispatchEvent(click3CustemEvent);
                num = 0;
            }
        });
    };
    setClick3CustemEvent(document.querySelector("#click3CustomElement .nei"),function (e) {
        console.log("net click3CustemEvent");
        console.log(e.detail);
    });
    setClick3CustemEvent(document.querySelector("#click3CustomElement .wai"),function (e) {
        console.log("wai click3CustemEvent");
        console.log(e.detail);
    });

})();

