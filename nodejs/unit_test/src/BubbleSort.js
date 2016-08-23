function BubbleSort(arr) { //交换排序->冒泡排序
    var st = new Date();
    var temp;
    var exchange;
    for(var i=0; i<arr.length; i++) {
        exchange = false;
        for(var j=arr.length-2; j>=i; j--) {
            if((arr[j+1]) < (arr[j])) {
                temp = arr[j+1];
                arr[j+1] = arr[j];
                arr[j] = temp;
                exchange = true;
            }
        }
        if(!exchange) break;
    }
    return arr;
}

module.exports.BubbleSort = BubbleSort;