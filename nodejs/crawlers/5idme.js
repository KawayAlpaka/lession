var cheerio = require('cheerio');
var axios = require('axios');
var fs = require("fs");
var path = require("path");
var iconv = require("iconv-lite");

var listUrl = "http://www.5idme.com/zs?page=";
var outputFile = "5idem.json";
var outputDir = "dist"
var outputPath = path.resolve(__dirname, outputDir, outputFile);

var listUrlList = [];
for(let i= 1;i<=29;i++){
  listUrlList.push(listUrl + i);
};
// console.log(listUrlList);

let getCompanyIds = function(listUrl){
  return axios.get(listUrl, {})
    .then(function (response) {
      let $ = cheerio.load(response.data);
      let ids = [];
      $(".zs-list .supplier-collec").each(function(i,e){
        let id = $(e).attr("data-id");
        ids.push(id);
      });
      return ids;
    });
};

let run = async function(){
  var ids = [];
  for(let i =0 ;i<listUrlList.length;i++){
    let _ids = await getCompanyIds(listUrlList[i]);
    console.log(_ids);
    ids.push(..._ids);
  }
  console.log(ids);
  var infos = [];
  for(let i =0 ;i<ids.length;i++){
    infos.push(await getCompanyInfo(ids[i]));
  }
  console.log(infos);
  fs.writeFileSync(outputPath,JSON.stringify(infos));
};


let getCompanyInfo = function(id){
  return axios.get("http://www.5idme.com/zs-detail/"+id, {})
    .then(function (response) {
      var $ = cheerio.load(response.data);
      let name = $(".detail-head-con .title span").text();
      // console.log(name);
      var _about = $(".about .content");
      let [desc, range] = [$(_about[0]).text().replace("/\\n/gi","").trim(),$(_about[1]).text().replace("/\\n/gi","").trim()];
      // console.log(desc,range);
      let _attrs = $(".detail-right .content").text();
      // console.log(_attrs);
      let attr = {};
      attr.type =  _attrs.match(/公司性质：([\S]*)\s/i)[1];
      attr.city =  _attrs.match(/城市：([\S]*)\s/i)[1];
      attr.scale =  _attrs.match(/公司规模：([\S]*)\s/i)[1];
      attr.industry =  _attrs.match(/所属行业：([\S]*)\s/i)[1];
      // console.log(attr);
      var _contacts = unescape($(".contact-detail.to-show").html().replace(/\s/gi,"").replace(/&#x/g, '%u').replace(/;/g, ''))
      // var _contacts = iconv.decode($(".contact-detail.to-show").html().replace(/\s/gi,""),"utf-8" );
      console.log(_contacts);
      console.log({
        _contacts
      });
      let contacts = {};
      // var regStr = function(reg,source){
      //   source.match(/手机号码：([\S]*?)($|<br>)/i)[1];
      // };
      contacts.phone =  _contacts.match(/手机号码：([\S]*?)($|<br>)/i)[1];
      contacts.tel =  _contacts.match(/电话号码：([\S]*?)(<br>|$)/i)[1];
      contacts.fax =  _contacts.match(/传真号码：([\S]*?)(<br>|$)/i)[1];
      contacts.email =  _contacts.match(/Email：([\S]*?)(<br>|$)/i)[1];
      contacts.address =  _contacts.match(/联系地址：([\S]*?)(<br>|$)/i)[1];
      // console.log(contacts);
      var r = {
        id,
        name,
        desc,
        range,
        ...attr,
        ...contacts
      };
      console.log(r);
      return r;
    });
};

// getCompanyInfo(1839);

run();

