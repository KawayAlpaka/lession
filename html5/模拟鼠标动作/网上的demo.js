// https://www.cnblogs.com/rubekid/p/11938753.html


function mockVerify(btnSelector){
  // var btn=document.querySelector(".nc_iconfont.btn_slide");
  var btn=document.querySelector(".dvc-slider__handler");
  var mousedown = document.createEvent('MouseEvents');
  var rect = btn.getBoundingClientRect();
  var x = rect.x;
  var y = rect.y;
  mousedown.initMouseEvent('mousedown',true,true,window,0,  
          x, y, x, y,false,false,false,false,0,null);
  btn.dispatchEvent(mousedown);
  
  var dx = 0;
  var dy = 0;
  var  interval = setInterval(function(){
      var mousemove = document.createEvent('MouseEvents');
      var _x = x + dx;
      var _y = y + dy;
      mousemove.initMouseEvent('mousemove',true,true,window,0,  
              _x, _y, _x, _y,false,false,false,false,0,null);
      btn.dispatchEvent(mousemove);
      
      btn.dispatchEvent(mousemove);
      if(_x - x >= 308){
          clearInterval(interval);
          var mouseup = document.createEvent('MouseEvents');
          mouseup.initMouseEvent('mouseup',true,true,window,0,  
          _x, _y, _x, _y,false,false,false,false,0,null);
          btn.dispatchEvent(mouseup);
          var reloadTimeout = setTimeout(function(){
              location.reload();
          }, 6000);
          var retries = 10;
          var checkInterval = setInterval(function(){
              console.log(btn.className)
              if(btn.className.indexOf('btn_ok') > -1){
                  console.log("btn_ok");
                  clearInterval(checkInterval);
                  // document.querySelector(btnSelector).click();
              }
              else if(retries -- == 0){
                  console.log("btn_error")
                  clearInterval(checkInterval);
              }
          }, 500);
      }
      else{
          dx += Math.ceil(Math.random() * 50);
          
      }
  }, 60); 
}
