(function ($) {
    var set_text_value_position = function(input, spos){
        if(spos<0)
            spos = 0;
        if(input.setSelectionRange){ //兼容火狐,谷歌
            setTimeout(function(){
                    input.setSelectionRange(spos, spos);
                    input.focus();}
                ,0);
        }else if(input.createTextRange){ //兼容IE
            var rng = input.createTextRange();
            rng.move('character', spos);
            rng.select();
        }
    };

    $.fn.qianfenwei = function () {
        this.each(function (i,ele) {
            var oldValue = ele.value || "";
            var newValue = ele.value || "";
            var qianfenwei = function () {
                var self = this;
                var _tempPos = self.selectionStart;
                var oldCommaCount = oldValue.match(/，/g) ?  oldValue.match(/，/g).length : 0;
                var _temp = self.value.replace(/[^0-9\.]/g,"");

                var arrText = _temp.split(".");
                var int = arrText[0];
                self.value = int.replace(/，/g, '').replace(/\d+?(?=(?:\d{3})+$)/g, function (s) {
                    return s + '，';
                });
                if(arrText.length >1){
                    self.value += "."+arrText[1].substr(0,2);
                }
                newValue = self.value;
                var newCommaCount = newValue.match(/，/g) ?  newValue.match(/，/g).length : 0;
                var commaChazhi = newCommaCount - oldCommaCount;
                if(Math.abs(commaChazhi) > 0 ){
                    console.log(commaChazhi);
                }
                set_text_value_position(self,_tempPos+commaChazhi);
                oldValue = newValue;
            };
            $(ele).unbind("input");
            $(ele).bind("input",qianfenwei);
        });

    }
}($));