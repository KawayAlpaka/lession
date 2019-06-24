// var request = require('request');
var cheerio = require('cheerio');
var axios = require('axios');
var iconv = require("iconv-lite");
var fs = require("fs");
var path = require("path");

var baseUrl = "https://www.gulongbbs.com";
var listUrl = "https://www.gulongbbs.com/book/fdyj/";
var outputFile = "飞刀又见飞刀.txt";
var outputDir = "dist"
var outputPath = path.resolve(__dirname,outputDir,outputFile);

axios.get(listUrl, {})
  .then(function (response) {
    var $ = cheerio.load(response.data);
    var articleUrls = [];
    $(".main_tdbg_575").find("a").each(function (index, ele) {
      articleUrls.push(baseUrl + $(ele).attr("href"));
    });
    var getArticles = async function (list) {
      console.log("getArticles");
      for (let i = 0; i < list.length; i++) {
        // console.log(list[i]);
        let r = await axios.get(list[i], {
          responseType: 'arraybuffer',
          transformResponse: [function (data) {
            return iconv.decode(data, "gb2312");
          }]
        });
        // console.log(r.data);
        let $ = cheerio.load(r.data);
        let title = $(".main_ArticleTitle").text();

        if(!title || title.length == 0){
          continue;
        }
        console.log(title);
        let content = $("#new>span").html();
        
        // 标签转换
        content = content.replace(/<br>/gi, "\r\n");
        content = content.replace(/<p[\s\S]*?>([\s\S]*?)<\/p>/gi, "$1");
        content = content.replace(/<strong[\s\S]*?>([\s\S]*?)<\/strong>/gi, "$1");
        content = content.replace(/<span[\s\S]*?>([\s\S]*?)<\/span>/gi, "$1");
        content = content.replace(/<font[\s\S]*?>([\s\S]*?)<\/font>/gi, "$1");
        
        // utf-8 字符串转中文字符串
        content = unescape(content.replace(/&#x/g, '%u').replace(/;/g, ''));

        // 去除一些没有正常转换的符号
        content = content.replace(/%u[A-Za-z0-9]{2}/g, "");

        if (!fs.existsSync("dist")) {
          fs.mkdirSync("dist");
        }

        fs.appendFileSync(outputPath, title + "\r\n", "utf-8");
        fs.appendFileSync(outputPath, content + "\r\n", "utf-8");
      }
    }
    getArticles(articleUrls);
  });
  