var showImg = function(){
  console.log("show-img-load");
  console.log(results);
  var template = document.querySelector(".template");
  var panel = document.querySelector(".imgs-panel"); 
  results.forEach(function(result) {
    var link = template.cloneNode(true);
    console.log(link);
    link.href = result.url;
    var img = link.querySelector(".img");
    img.src = result.url;
    link.classList.remove("template");
    panel.appendChild(link);
  });
};
document.addEventListener("DOMContentLoaded",showImg,false);