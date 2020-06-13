// http://www.baobao88.com/lianbo/9.html


var r = []; document.querySelectorAll(".songname a").forEach((a)=>{ r.push({link:a.href,name:a.innerText}) });

var getOne = function(o){
  return new Promise((resolve,reject)=>{
    var c = window.open(o.link);
    setTimeout(()=>{
      o.src = c.document.querySelector("audio").src;
      c.close();
      resolve();
    },5000);
  });
};
var run = async function(){
  for(let i = 0;i<r.length;i++){
    await getOne(r[i]);
  }
  console.log(r.map(o=>o.src).join(",")); 
};


