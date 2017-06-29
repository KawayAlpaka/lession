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
app.directive("uploader",function ($http) {
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
                            file:file,
                            blobs:[]
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
                console.log(file);
                var uploadBlob = function (blob) {
                    return new Promise(function (resolve, reject) {
                        var fd = new FormData();
                        var ajax = new XMLHttpRequest();
                        fd.append("fileName", file.file.name);
                        fd.append("fileMd5", file.md5);
                        fd.append("chunks", file.blobs.length);
                        fd.append("chunk", blob.chunk);
                        fd.append("blobMd5", blob.md5);
                        fd.append("file", blob.blob);
                        ajax.open("post", "/file/webuploader", true);
                        ajax.onload = function () {
                            console.log("onload");
                            resolve(JSON.parse(ajax.responseText));
                        };
                        var upload = ajax.upload;
                        upload.addEventListener("progress", function (event) {
                            console.log("progress");
                            var baifenbi = (event.loaded / event.total);
                            blob.uploadState = (baifenbi*100).toFixed(4) + "%";
                            s.$apply();
                        }, false);
                        upload.addEventListener("loadend", function () {
                            console.log("loadend");
                        }, false);
                        ajax.send(fd);
                    });
                };
                var currentChunk = 0;
                var uploadBlobs = function () {
                    // file.blobs[currentChunk].uploadState = "上传中";
                    uploadBlob(file.blobs[currentChunk])
                        .then(function () {
                            file.blobs[currentChunk].uploadState = "已上传";
                            currentChunk++;
                            if(currentChunk<file.blobs.length){
                                uploadBlobs();
                            }
                            s.$apply();
                        });
                };
                uploadBlobs();
            };
            s.burst = function (file) {
                file.blobs = [];
                var chunkSize = 2097152;
                var chunks = Math.ceil(file.file.size / chunkSize);
                var currentChunk = 0;
                var getBlob = function (file,currentChunk1,chunkSize) {
                    return new Promise(function (resolve, reject) {
                        var start = currentChunk1 * chunkSize,
                            end = start + chunkSize >= file.size ? file.size : start + chunkSize;
                        var blob = file.slice(start,end);
                        getBlobMd5(blob)
                            .promise.then(function (md5) {
                                resolve({
                                    blob:blob,
                                    md5:md5,
                                    chunk:currentChunk1,
                                    uploadState:"未上传"
                                });
                        });
                    });
                };

                var burst = function (file,currentChunk2,chunkSize) {
                    getBlob(file.file,currentChunk2,chunkSize)
                        .then(function (blob) {
                            file.blobs.push(blob);
                            currentChunk++;
                            if(currentChunk < chunks){
                                burst(file,currentChunk,chunkSize);
                            }else {
                                s.$apply();
                            }
                        });
                };
                burst(file,currentChunk,chunkSize);
            };
            s.combine = function (file) {
                $http({
                    url : '/file/combine',
                    method:'GET',
                    params:{
                        fileMd5:file.md5
                    },
                    type : 'json'
                })
            };
            s.remove = function (index) {
                s.files.splice(index,1);
            };
        }
    };
});