var socket=io.connect(),//与服务器进行连接
    button=document.getElementById('sendBtn'),
    panel=document.getElementById('panel'),
    userCount=document.getElementById('user-count'),
    messageBox=document.getElementById('message-box'),
    messageBoxWho=document.getElementById('message-box-who'),
    messageBoxText=document.getElementById('message-box-text'),
    text=document.getElementById('text');
button.onclick=function(){
    socket.emit('foo',{text:text.value,who:who.value});//发送一个名为foo的事件，并且传递一个字符串数据‘hello’
};
function showMessageBox(who,text) {
    messageBoxWho.innerText = who;
    messageBoxText.innerText = text;
    messageBox.style.right = "10%";
    setTimeout(hideMessageBox,2000);
}
function hideMessageBox() {
    messageBox.style.right = "-30%";
}

socket.on("foo2",function (data) {
    console.log(data);
    var div = document.createElement("div");
    div.className = "message";
    div.innerHTML = "<div class='message'><div class='who'>"+data.who+"</div><div class='text'>"+data.text+"</div></div>";
    panel.appendChild(div);
    showMessageBox(data.who,data.text);
});
socket.on("userCount",function (count) {
    userCount.innerText = count;
});
