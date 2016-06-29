var fs = require('fs');

/*

 递归处理文件,文件夹

 path 路径
 floor 层数
 handleFile 文件,文件夹处理函数

 */

function handleFile(path, floor) {
    var blankStr = '';
    for (var i = 0; i < floor; i++) {
        blankStr += '    ';
    }

    fs.stat(path, function(err1, stats) {
        if (err1) {
            console.log('stat error');
        } else {
            if (stats.isDirectory()) {
                console.log('+' + blankStr + path);
            } else {
                // function aaa() {
                //     console.log('-' + blankStr + path);
                // }
                // setTimeout(aaa,500);
                console.log('-' + blankStr + path);
            }
        }
    })


}

function walk(path, floor, handleFile) {
    handleFile(path, floor);
    floor++;
    fs.readdir(path, function(err, files) {
        if (err) {
            console.log('read dir error');
        } else {
            files.forEach(function(item) {
                var tmpPath = path + '/' + item;
                fs.stat(tmpPath, function(err1, stats) {
                    if (err1) {
                        console.log('stat error');
                    } else {
                        if (stats.isDirectory()) {
                            walk(tmpPath, floor, handleFile);
                        } else {
                            handleFile(tmpPath, floor);
                        }
                    }
                })
            });

        }
    });
}

walk('D:/test', 0, handleFile);

exports.walk = walk;