(function(){
  const selectName = "free-copy-select";
  window.addEventListener("message", function(e)
  {
    if(e.data.type == "catchImg"){
      console.log(e.data);
      startFind();
    }
  }, false);
  var selectRange = function(e){
    // console.log("mouseover");
    // console.log(e.target.style.outline= "#00FF00 solid 2px;");
    // e.target.style.outline = "#00FF00 solid 2px";
    e.target.classList.add(selectName);
  };
  var unSelectRange = function(e){
    // console.log("mouseout");
    e.target.classList.remove(selectName);
  };
  var regUrl = /^url\(['"]([\S]+)['"]\)$/;
  var findImg = function(e){
    endFind();
    var rs = [];
    var nodes = e.target.querySelectorAll("*");
    var insert = function(node,url){
      // console.log(node);
      // console.log(url);
      if(rs.findIndex(function(r){ return r.url == url }) < 0){
        rs.push({
          tag: node.tagName,
          url
        });
      }
    };
    var deal = function(node){
      // img src
      if(node.src && node.tagName === "IMG"){
        insert(node,node.src);
      }
      // * background-image
      var backgroundImage = node.computedStyleMap().get("background-image").toString();
      if(regUrl.test(backgroundImage)){
        insert(node,backgroundImage.replace(regUrl,"$1"));
      }
      // svg
      if (node.tagName == "SVG"){
        insert(node,node.outerHTML);
      }
    }
    nodes.forEach(deal);
    deal(e.target);
    console.log(rs);
    if(rs.length > 0){
      showResult(rs);
    }else{
      alert("没有找到图片");
    }
  };
  var startFind = function(){
    document.addEventListener("mouseover",selectRange,false);
    document.addEventListener("mouseout",unSelectRange,false);
    document.addEventListener("click",findImg,false);  
  };
  var endFind = function(){
    document.querySelector("."+selectName).classList.remove(selectName);
    document.removeEventListener("mouseover",selectRange,false);
    document.removeEventListener("mouseout",unSelectRange,false);
    document.removeEventListener("click",findImg,false);
  };
  var showResult = function(results){
    window.postMessage({"type": 'showImg',results}, '*');
  };
})();
