var express = require('express');
var router = express.Router();

// 该路由使用的中间件
router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
},function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});
// 定义网站主页的路由
router.get('/', function(req, res) {
    res.send('home page');
});
// 定义 about 页面的路由
router.get('/about', function(req, res) {
    res.send('home About');
});

module.exports = router;