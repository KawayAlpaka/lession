(function () {
    // String.prototype.trim = function() {
    //     //return this.replace(/[(^\s+)(\s+$)]/g,"");//會把字符串中間的空白符也去掉
    //     //return this.replace(/^\s+|\s+$/g,""); //
    //     return this.replace(/^\s+/g,"").replace(/\s+$/g,"");
    // };

    var common = {};

    common.timeHelp = {};
    common.timeHelp.number2String = function (number) {
        var millisecond = 0.001;
        var second = 1;
        var minute = 60;
        var hour = minute * 60;
        var day = hour * 24;
        var days = parseInt(number / day);
        var hours = parseInt( (number - days * day) / hour );
        var minutes = parseInt( (number - days * day - hours * hour) / minute );
        var seconds = parseInt((number - days * day - hours * hour - minutes * minute) / second );
        var milliseconds = parseInt( (number - days * day - hours * hour - minutes * minute - seconds * second) / millisecond );
        var result = "";
        var linkTime = function (int,singularWord,negativeWord) {
            if (int == 0){
            }else if( int == 1){
                result += " " + int + " " + singularWord ;
            }else {
                result += " " + int + " " + negativeWord ;
            }
        };
        linkTime(days,"day","days");
        linkTime(hours,"hour","hours");
        linkTime(minutes,"minute","minutes");
        linkTime(seconds,"second","seconds");
        linkTime(milliseconds,"millisecond","milliseconds");

        return result.trim();
    };

    common.strHelp = {};
    common.strHelp.isNumber = function (str) {
        return !isNaN(str);
    };
    common.strHelp.toNumber = function (str) {
        return Number(str);
    };
    common.strHelp.isEmptyStr = function (obj) {
        return typeof obj == 'string' && obj.length == 0;
    };
    common.strHelp.isNotEmptyStr = function (obj) {
        return typeof obj == 'string' && obj.length > 0;
    };
    common.strHelp.firstUpper = function (str) {
        return str.replace(/(\w)/,function(v){return v.toUpperCase()});
    };
    common.strHelp.fill = function (str,count,mDefault) {
        if(str.length >= count){
            return str;
        }else{
            while (true){
                str += mDefault;
                if (str.length >= count){
                    return str;
                }
            }
        }
    };

    common.arrHelp = {};
    common.arrHelp.fill = function (array,count,mDefault) {
        if(array.length >= count){
            return array;
        }else{
            while (true){
                var de = common.extend({},mDefault);
                array.push(de);
                if (array.length >= count){
                    return array;
                }
            }
        }
    };

    if(typeof window == 'object'){
        define(['jquery'], function (jquery) {
            common.extend = jquery.extend;
            return common;
        });
    }else if(typeof global == 'object'){
        common.extend = require('util')._extend;
        module.exports = common;
    }
})();

