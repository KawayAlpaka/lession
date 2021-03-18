// 获取图片 base64

// // 方案1，行不通，原因:
// // 1、跨域限制无法异步下载图片；
// // 2、就算没有异步限制，也下不到，应该是服务端限制二次请求
// const getImageBase64 = function(url){
//   var img = new Image();
//   img.setAttribute('crossOrigin', 'anonymous');
//   img.onload = ()=>{
//     try {
//       var canvas = document.createElement("canvas");
//       canvas.width = img.width;
//       canvas.height = img.height;
//       var ctx = canvas.getContext("2d");
//       ctx.drawImage(img, 0, 0, img.width, img.height);
//       var dataURL = canvas.toDataURL("image/png");
//       // console.log("dataURL",dataURL.slice(0,100));
//       console.log(dataURL);
//       // resolve(dataURL);
//     } catch (e) {
//       console.log(e);
//       // reject(e);
//     }
//   }
//   img.src = url;
// }
// getImageBase64(document.querySelector("img.dvc-captcha__puzzleImg").src);



// 方案1，勉强可行，原因:
// 虽然跨域限制了无法获取跨域图片的img，但是有方法解除chrome跨域限制 
// --args --disable-web-security  --user-data-dir=D:\chrome
// https://www.cnblogs.com/nongzihong/p/9991249.html
const getImageBase64_2 = function(img){
  return new Promise((resolve,reject)=>{
    try {
      var canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      var ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, img.width, img.height);
      var dataURL = canvas.toDataURL("image/png");
      // console.log("dataURL",dataURL.slice(0,100));
      // console.log(dataURL);
      resolve(dataURL.replace("data:image/png;base64,",""));
    } catch (e) {
      console.log(e);
      reject(e);
    }
  });
}

// getImageBase64_2(document.querySelector("img.dvc-captcha__puzzleImg")).then((code)=>{
//   console.log(code);
// });
// getImageBase64_2(document.querySelector("img.dvc-captcha__bgImg")).then((code)=>{
//   console.log(code);
// });

Promise.all([
  getImageBase64_2(document.querySelector("img.dvc-captcha__puzzleImg")),
  getImageBase64_2(document.querySelector("img.dvc-captcha__bgImg"))
]).then(([code1,code2])=>{
  // console.log(code1);
  // console.log(code2);
  dama(code1,code2);
})
