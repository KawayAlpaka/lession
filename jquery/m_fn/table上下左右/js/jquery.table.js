(function ($) {
    var getColNum = function (cell,option) {
        var selector = "";
        if(option.not){
            selector += ":not("+option.not+")";
        }
        return $(cell).parent().children(selector).index(cell) + 1;
    };
    var getRowNum = function (cell,option) {
        var selector = "";
        if(option.not){
            selector += ":not("+option.not+")";
        }
        var row = $(cell).parents("tr")[0];
        return $(row).parent().children(selector).index(row) + 1;
    };
    var focusCell = function (table,rowNum,colNum,option) {
        var selector = "";
        if(option.not){
            selector += ":not("+option.not+")";
        }
        var rows = $(table).find("tbody tr"+selector);
        var cells = $(rows[rowNum - 1]).find("td" + selector + ",th" + selector);
        var cellInput = $(cells[colNum - 1]).find("input");
        console.log(cellInput.val());
        cellInput.focus();
        // :nth-child(n)
    };
    var backValue = function (self,_value) {
        setTimeout(function () {
            self.value = _value;
        },1);
    };

    var go = {};
    go.left = function (table,rowNum,colNum,option) {
        focusCell(table,rowNum,colNum-1,option);
    };
    go.up = function (table,rowNum,colNum,option) {
        focusCell(table,rowNum-1,colNum,option);
    };
    go.right = function (table,rowNum,colNum,option) {
        focusCell(table,rowNum,colNum+1,option);
    };
    go.down = function (table,rowNum,colNum,option) {
        focusCell(table,rowNum+1,colNum,option);
    };


    var onKeyDown = function (option) {
        return function (keyboardEvent) {
            console.log(keyboardEvent);
            var self = this;
            var table = $(self).parents('table')[0];
            var cell = $(self).parents('td,th')[0];
            var _value = self.value;

            var rowNum = getRowNum(cell,option);
            var colNum = getColNum(cell,option);
            console.log(rowNum);

            switch (keyboardEvent.keyCode){
                case 37://左
                    if(option.left){
                        go.left(table,rowNum,colNum,option);
                        backValue(self,_value);
                    }
                    break;
                case 38://上
                    if(option.up){
                        go.up(table,rowNum,colNum,option);
                        backValue(self,_value);
                    }
                    break;
                case 39://右
                    if(option.right){
                        go.right(table,rowNum,colNum,option);
                        backValue(self,_value);
                    }
                    break;
                case 40://下
                    if(option.down){
                        go.down(table,rowNum,colNum,option);
                        backValue(self,_value);
                    }
                    break;
                case 13://回车
                    if(option.return){
                        go[option.return](table,rowNum,colNum,option);
                        backValue(self,_value);
                    }
                    break;
                default:break;
            }
        };
    };

    $.fn.table = function (option) {
        this.find("input").each(function (index,input) {
            $(input).unbind("keydown");
            $(input).bind("keydown",onKeyDown(option));
        });
    }
}($));