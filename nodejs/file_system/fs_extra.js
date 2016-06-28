var fs = require('fs-extra');

fs.remove(__dirname + '/test', function (err) {
    if (err) return console.error(err);
    fs.mkdir(__dirname + '/test', 0666, function (err) {
        console.log('创建test目录');
    });
    if(err) {
        console.log('删除空目录失败，可能原因：1、目录不存在，2、目录不为空')
        console.error(err);
        return;
    }
    console.log('success!')
});


// fs.rmdir(__dirname + '/test', function (err) {
//     fs.mkdir(__dirname + '/test', 0666, function (err) {
//         console.log('创建test目录');
//     });
//     if(err) {
//         console.log('删除空目录失败，可能原因：1、目录不存在，2、目录不为空')
//         console.error(err);
//         return;
//     }
//     console.log('删除空目录成功!');
// });