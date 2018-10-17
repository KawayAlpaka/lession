console.log("popup.js");
var btnGoBackground = document.querySelector("#go-background");
btnGoBackground.addEventListener("click",function(){
  window.open(chrome.extension.getURL('html/background.html'));
});