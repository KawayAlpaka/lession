console.log("popup.js");
var btnGoBackground = document.querySelector("#go-background");
btnGoBackground.addEventListener("click",function(){
  window.open(chrome.extension.getURL('html/background.html'));
});
var find = document.querySelector("#find");
find.addEventListener("click",function(){
  var url = chrome.extension.getURL('html/show-img.html');
  window.open(url);
});