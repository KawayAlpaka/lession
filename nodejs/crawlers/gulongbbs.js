// var request = require('request');
var cheerio = require('cheerio');
var axios = require('axios');
var iconv = require("iconv-lite");
var fs = require("fs");
var path = require("path");

var baseUrl = "https://www.gulongbbs.com";
var listUrl = "https://www.gulongbbs.com/book/jyyf/";
var outputFile = "九月鹰飞.txt";
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
        let r = await axios.get(list[i], {
          responseType: 'arraybuffer',
          transformResponse: [function (data) {
            return iconv.decode(data, "gb2312");
          }]
        });
        let $ = cheerio.load(r.data);
        let title = $(".main_ArticleTitle").text();
        let content = $("#new>span").html();
        // utf-8 字符串转中文字符串
        content = content.replace(/<br>/gi, "\r\n");
        content = content.replace(/<p><\/p>/gi, "\r\n");
        content = unescape(content.replace(/&#x/g, '%u').replace(/;/g, ''));

        if (!fs.existsSync("dist")) {
          fs.mkdirSync("dist");
        }
        console.log(title);
        fs.appendFileSync(outputPath, title + "\r\n", "utf-8");
        fs.appendFileSync(outputPath, content + "\r\n", "utf-8");
      }
    }
    getArticles(articleUrls);
  });
  