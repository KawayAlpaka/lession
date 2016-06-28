//公共引用
var fs = require('fs'),
    path = require('path');

//readFile(filename,[options],callback);

/**
 * filename, 必选参数，文件名
 * [options],可选参数，可指定flag（文件操作选项，如r+ 读写；w+ 读写，文件不存在则创建）及encoding属性
 * callback 读取文件后的回调函数，参数默认第一个err,第二个data 数据
 */

fs.readFile(__dirname + '/test.txt', {flag: 'r+', encoding: 'utf8'}, function (err, data) {
    if(err) {
        console.error(err);
        return;
    }
    console.log(data);
});

// fs.writeFile(filename,data,[options],callback);
var w_data = '这是一段通过fs.writeFile函数写入的内容；\r\n';
var w_data = new Buffer(w_data);
/**
 * filename, 必选参数，文件名
 * data, 写入的数据，可以字符或一个Buffer对象
 * [options],flag,mode(权限),encoding
 * callback 读取文件后的回调函数，参数默认第一个err,第二个data 数据
 */
fs.writeFile(__dirname + '/test1.txt', w_data, {flag: 'a'}, function (err) {
    if(err) {
        console.error(err);
    } else {
        console.log('写入成功');
    }
});

// fs.appendFile(filename,data,[options],callback);
fs.appendFile(__dirname + '/test.txt', '使用fs.appendFile追加文件内容', function () {
    console.log('追加内容完成');
});

// fs.open(filename, flags, [mode], callback);
/**
 * filename, 必选参数，文件名
 * flags, 操作标识，如"r",读方式打开
 * [mode],权限，如777，表示任何用户读写可执行
 * callback 打开文件后回调函数，参数默认第一个err,第二个fd为一个整数，表示打开文件返回的文件描述符，window中又称文件句柄
 */

fs.open(__dirname + '/test.txt', 'r', '0666', function (err, fd) {
    console.log("open");
    console.log(fd);
});




//fs.rmdir(path, callback);

/**
 * path, 目录的完整路径及目录名；
 * [callback(err)], 操作完成回调函数；err操作失败对象
 */

fs.rmdir(__dirname + '/test', function (err) {
    fs.mkdir(__dirname + '/test', 0666, function (err) {
        console.log('创建test目录');
    });
    if(err) {
        console.log('删除空目录失败，可能原因：1、目录不存在，2、目录不为空')
        console.error(err);
        return;
    }
    console.log('删除空目录成功!');
});


//使用fs.mkdir创建目录
//fs.mkdir(path, [mode], callback);

/**
 * path, 被创建目录的完整路径及目录名；
 * [mode], 目录权限，默认0777
 * [callback(err)], 创建完目录回调函数,err错误对象
 */

// fs.mkdir(__dirname + '/fsDir', function (err) {
//     if(err)
//         throw err;
//     console.log('创建目录成功')
// });