define([], function () {

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

    common.stringHelp = {};
    common.stringHelp.isNumber = function (str) {
        return !isNaN(str);
    };
    common.stringHelp.toNumber = function (str) {
        return Number(str);
    };

    return common;
});