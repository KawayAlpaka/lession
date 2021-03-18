// 模拟滑动安居客的验证码
// https://www.anjuke.com/captcha-verify/?history=aHR0cDovL2hhbmd6aG91LmFuanVrZS5jb20vY29tbXVuaXR5L2dvbmdzaHUv&namespace=anjuke_xiaoqu_pc&serialID=2a5c636e95bfcffaa40b804c60cb86ec_275ab56f3bde4737a921acb1e514dfb8&callback=shield&from=antispam

// $0.addEventListener("mousemove",function(e){console.log(e.x,e.y)})
var _t = Date.now();
var h = document.querySelector(".dvc-slider__handler");
var downing = false;
var test_res = [];
h.addEventListener("mousedown",function(e){
  downing = true;
  test_res = [];
  _t = Date.now();
});
h.addEventListener("mouseup",function(e){
  downing = false;
  console.log(test_res.length);
  test_res.forEach(element => {
    console.log(element);
  });
});
h.addEventListener("mousemove",function(e){
  if(downing){
    let t = Date.now();
    let dur = t - _t;
    _t = t;
    test_res.push({x:e.x,y:e.y,dur:dur});
    // console.log(e.x,e.y,dur);
  }
});

var go = function(targetX=280){
  var handler = document.querySelector(".dvc-slider__handler")
  var evDownObj = document.createEvent('MouseEvents');
  var rect = handler.getBoundingClientRect();
  var initX = rect.x + 5;
  var initY = rect.y + 5;
  var realTargetX = initX + targetX;
  var realTargetY = initY + Math.floor(Math.random() * 4 + 2);
  var _x = initX;
  var _y = initY;
  var guiji = genData({x:initX,y:initY},{x:realTargetX,y:realTargetY});
  console.log(guiji);
  evDownObj.initMouseEvent("mousedown",true,true,window,0,_x, _y, _x, _y,false,false,false,false,0,null);
  handler.dispatchEvent(evDownObj);
  let timeout = Math.random() * 500 + 1000;
  for(let i=0;i<guiji.length;i++){
    let g = guiji[i];
    let _i = i;
    timeout += g.time;
    setTimeout(() => {
      let evObj = document.createEvent('MouseEvents');
      evObj.initMouseEvent("mousemove",true,true,window,0,g.x, g.y, g.x, g.y,false,false,false,false,0,null);
      // handler.dispatchEvent(evObj);
      document.dispatchEvent(evObj);
      if(_i == guiji.length - 1){
        setTimeout(() => {
          let mouseUp = document.createEvent('MouseEvents');
          mouseUp.initMouseEvent("mouseup",true,true,window,0,g.x, g.y, g.x, g.y,false,false,false,false,0,null);
          document.dispatchEvent(mouseUp);
        }, Math.random() * 100 +500);
      }
    }, timeout);
  }

  // var cishu = 0;
  // var timer = setInterval(() => {
  //   var rect = handler.getBoundingClientRect();
  //   console.log(rect);
  //   var dx = 20;
  //   var dy = 10;
  //   var x = rect.x;
  //   var y = rect.y;
  //   var _x = x + dx;
  //   var _y = y + dy;
  //   console.log(_x,_y)
  //   // _x = 100;
  //   // _y = 10;
  //   if(_x > realTargetX){
  //     _x = realTargetX;
  //   }
  //   var evObj = document.createEvent('MouseEvents');
  //   evObj.initMouseEvent("mousemove",true,true,window,0,_x, _y, _x, _y,false,false,false,false,0,null);
  //   // handler.dispatchEvent(evObj);
  //   document.dispatchEvent(evObj);
  //   cishu++
  //   if(cishu>50){
  //     clearInterval(timer)
  //   }
  //   if( Math.abs(_x - realTargetX) < 1){
  //     setTimeout(() => {
  //       var mouseUp = document.createEvent('MouseEvents');
  //       mouseUp.initMouseEvent("mouseup",true,true,window,0,_x, _y, _x, _y,false,false,false,false,0,null);
  //       document.dispatchEvent(mouseUp);
  //     }, Math.random() * 1000);
  //     clearInterval(timer)
  //   }

  // }, 10);


}


var genData = function(sourcePoint,targetPoint){
  var speed = 0;
  var fullSpeed = 100;
  var currX = sourcePoint.x;
  var currY = sourcePoint.y;
  var guiji = [];
  // 生成x
  for(;currX<=targetPoint.x;currX += Math.floor(Math.random() * 2 + 1) ){
    if(currX > targetPoint.x){
      currX = targetPoint.x;
    }
    let distant = Math.min(Math.abs(targetPoint.x - currX),Math.abs(sourcePoint.x - currX));
    // let time = Math.floor( (Math.random() * 3 + 3) * 1000 / (distant + Math.random() * 10 + 200));
    let time = Math.floor((Math.random() * 150 + 300))
    if(distant >= 3){
      time = Math.floor((Math.random() * 100 + 100))
    }
    if(distant >= 6){
      time = Math.floor((Math.random() * 10 + 5))
    }
    guiji.push({x: currX,time});
  }
  // 修正最后一个x
  let last = guiji[guiji.length-1]
  if(last.x != targetPoint.x){
    last.x = targetPoint.x;
  }


  // 生成y
  let add = 1;
  let fenduan = Math.floor(guiji.length / (targetPoint.y - sourcePoint.y));
  // // 如果y距离大于轨迹点数
  // if(guiji.length <= targetPoint.y - sourcePoint.y){
  //   add = Math.floor((targetPoint.y - sourcePoint.y) / guiji.length);
  // }
  for(let i=0;i<guiji.length;i++){
    let g = guiji[i];
    if(i % fenduan == 0 && currY != targetPoint.y){
      currY += add;
    }
    g.y = currY;
  }
  return guiji;
}


console.log(genData({x:300,y:250},{x:450,y:255}));

// setTimeout(()=>{
//   var rect = handler.getBoundingClientRect();
//   console.log(rect);

//   var dx = 100;
//   var dy = 10;

//   var x = rect.x;
//   var y = rect.y;
//   var _x = x + dx;
//   var _y = y + dy;
//   console.log(_x,_y)
//   // _x = 100;
//   // _y = 10;
//   var evObj = document.createEvent('MouseEvents');
//   evObj.initMouseEvent("mousemove",true,true,window,0,_x, _y, _x, _y,false,false,false,false,0,null);
//   // handler.dispatchEvent(evObj);
//   document.dispatchEvent(evObj);

// },500);

