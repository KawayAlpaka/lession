// 发起请求
const dama = function(image,imageback){
  const username = "xxxxxx";
  const password = "xxxxxx";
  fetch("https://api.ttshitu.com/imageXY",{
  　  method:"POST",
  　  mode: 'cors',
  　　headers: {
  　　　　'Content-Type': 'application/json;charset=UTF-8'
  　　},
  　　body:JSON.stringify({
    　　username,
        password,
        image,
        imageback
  　　})
　　}).then(response => response.json())
      .then(json => {
        console.log(json);}
      );
}

