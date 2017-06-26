var getBlobMd5 = function (blob) {
    var result = {};
    result.promise = new Promise(function (resolve, reject) {
        var startTime = Date.now();
        var blobSlice = File.prototype.mozSlice || File.prototype.webkitSlice || File.prototype.slice;
        var spark =  new SparkMD5();
        var chunkSize = 2097152;
        var chunks = Math.ceil(blob.size / chunkSize);
        var currentChunk = 0;
        var fileReader = new FileReader();
        var bs = fileReader.readAsBinaryString;
        fileReader.onprogress = function (event) {
            console.log(event);
        };
        fileReader.onload = function (ee) {

            // spark.append(ee.target.result);
            // resolve(spark.end());
            // console.log( (Date.now() - startTime)/1000 );

            spark.append(ee.target.result);
            currentChunk++;
            console.log(currentChunk+"/"+chunks);
            result.onprogress && result.onprogress(currentChunk/chunks);
            if (currentChunk < chunks) {
                loadNext();
            } else {
                resolve(spark.end());
                console.log( (Date.now() - startTime)/1000 );
            }
        };
        // fileReader.readAsBinaryString(blob);

        function loadNext() {
            var start = currentChunk * chunkSize, end = start + chunkSize >= blob.size ? blob.size : start + chunkSize;
            if (bs) fileReader.readAsBinaryString(blobSlice.call(blob, start, end));
            else fileReader.readAsArrayBuffer(blobSlice.call(blob, start, end));
        }
        loadNext();

    });
    return result;
};

var app = angular.module('myApp', []);
app.directive("uploader",function () {
    return {
        restrict: 'E',
        templateUrl: 'views/directive/uploader.html',
        link: function (s, element, attrs) {
            s.files = [];
            var fileInput = $(element).find(".fileInput");
            var resetBtn = $(element).find("button[type='reset']");
            fileInput.on("change",function () {
                var self = this;
                for(var i=0;i<self.files.length;i++){
                    (function () {
                        var file = self.files.item(i);
                        var fileObj = {
                            file:file
                        };
                        s.files.push(fileObj);
                        var j = getBlobMd5(file);
                        j.promise.then(function (md5) {
                            fileObj.md5 = md5;
                            s.$apply();
                        });
                        j.onprogress = function (progress) {
                            fileObj.md5 = (progress*100).toFixed(2) + "%";
                            s.$apply();
                        };
                    })();
                }
                s.$apply();
            });
            fileInput.on("click",function () {
                resetBtn[0].click();
            });
            s.upload = function (file) {

            };
            s.remove = function (index) {
                s.files.splice(index,1);
            };
        }
    };
});