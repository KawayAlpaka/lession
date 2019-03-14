(function(window){
  var init = function (ele) {
    ele.classList.add("my-ripple");
    ele.style.position = "relative";
    ele.style.overflow = "hidden";
    var rippleElement = document.createElement("div");
    rippleElement.classList.add("ripple-element");
    setWithAndHeight(ele,rippleElement);
    ele.append(rippleElement);
    ele.addEventListener("click",handle);
  };
  var setWithAndHeight = function(ele,rippleElement){
    var warpRect = ele.getBoundingClientRect();
    var width = Math.max(warpRect.width,warpRect.height) * 3;
    rippleElement.style.width = width + "px";
    rippleElement.style.height = width + "px";
  };
  var handle = function(e){
    var rippleElement = e.target.querySelector(".ripple-element");
    rippleElement.style.top = e.offsetY + "px";
    rippleElement.style.left = e.offsetX + "px";
    setWithAndHeight(e.target,rippleElement);
  };
  window.myRipple = function (dom) {
    if (dom.forEach) {
      dom.forEach(function(ele){
        init(ele);
      });
    }else{
      init(dom);
    }
  };
})(window);

