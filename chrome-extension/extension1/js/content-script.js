// console.log("content-script.js");
// console.log("document.cookie:");
// console.log(document.cookie);
// console.log("document.body:");
// console.log(document.appendChild);
// console.log(document.documentElement.body);
// console.log("chrome:");
// console.log(chrome); 
// console.log("window"); 
// window.ABC = 1;
// console.log(window); 
// fetch("/haha");

// 向页面注入JS
function injectCustomJs(jsPath)
{
    jsPath = jsPath || 'js/inject.js';
    var temp = document.createElement('script');
    temp.setAttribute('type', 'text/javascript');
    // 获得的地址类似：chrome-extension://ihcokhadfjfchaeagdoclpnjdiokfakg/js/inject.js
    temp.src = chrome.extension.getURL(jsPath);
    temp.onload = function()
    {
        // 放在页面不好看，执行完后移除掉
        this.parentNode.removeChild(this);
    };
    // document.head.appendChild(temp);
    document.documentElement.appendChild(temp);
}
injectCustomJs();

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse)
{
    // console.log(sender.tab ?"from a content script:" + sender.tab.url :"from the extension");
    if(request.cmd == 'catchImg') {
      // alert(request.value);
      window.postMessage({"type": 'catchImg'}, '*');
    }
    if(request.cmd == 'catchAllImg') {
      // alert(request.value);
      window.postMessage({"type": 'catchAllImg'}, '*');
    }
    sendResponse('我收到了你的消息！');
});

window.addEventListener("message", function(e)
{
  if(e.data.type == "showImg"){
    showImg(e.data.results);
  }
}, false);

var showImg = function(results){
  chrome.runtime.sendMessage({type: 'showImg',results}, function(response) {
    // console.log('收到来自后台的回复：' + response);
  });
}
