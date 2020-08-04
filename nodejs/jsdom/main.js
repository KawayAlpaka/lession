const jsdom = require("jsdom");
const axios = require('axios');
const { JSDOM } = jsdom;


// const options = {
//   url: "https://www.baidu.com/",
//   referrer: "https://www.baidu.com/",
//   contentType: "text/html",
//   includeNodeLocations: true,
//   storageQuota: 10000000
// };

// // const dom = new JSDOM(``, options);

// axios({
//   url: 'https://www.baidu.com',
//   method: 'get',
//   headers:{
//     "User-Agent":"Mozilla/5.0 (Linux; Android 5.0; SM-G900P Build/LRX21T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.105 Mobile Safari/537.36"
//   }
// }).then(async (res)=>{
//   console.log(res.data);
//   const dom = new JSDOM(res.data, options);
//   setTimeout(() => {
//     let document = dom.window.document;
//     console.log(document.title);
//     // document.querySelector("#kw").value = "32423";
//     console.log(document.querySelector("#u").innerHTML);
//   }, 3000);
// });

JSDOM.fromURL("http://www.szmamc.com/").then(dom => {
  // console.log(dom.serialize());
  let window = dom.window;
  const $ = require('jquery')(window);
  
  console.log($(".l-site-nav").text());
  // console.log(document.querySelector("#u").innerHTML);
});


// let document = dom.window.document;
// document.addEventListener("readystatechange", function (e) {
//   switch (document.readyState) {
//     case "interactive": break;
//     case "complete":
//       // document.querySelector("#kw").value = "32423";
//       break;
//   }
//   console.log(document.readyState);
//   // console.log(document.querySelector("#kw").value);
// });
// setTimeout(() => {
//   console.log(document.title);
// }, 1000);



// let book = {};

// //获取章节列表
// async function getChaptersList(link) {
//     //jsdom模拟出虚拟浏览器解析 html
//     const dom = await JSDOM.fromURL(link);
//     const document = dom.window;
//     const $ = require('jquery')(document);

//     const urls = $('#list a');
//     book.title = $('#main-info h1').text();
//     book.chapters = [];

//     for(let i = 0; i< urls.length; i++){
//         let url = urls[i];
//         let _url = $(url).attr('href')+"";
//         let title = $(url).text();
//         book.chapters.push({
//           title: title,
//           url: _url
//         })
//     }

//     console.log(book);
// }

// getChaptersList('https://www.12zw.com/6/6942/')