var express = require('express');
var router = express.Router();

var users = [];

var session = require('express-session');
var RedisStrore = require('connect-redis')(session);

router.use(session({
  secret: 'secret',
  cookie: {
    maxAge: 1000 * 60 * 30
  },
  store : new RedisStrore({
    "host" : "localhost",
    "port" : "6379",
    "db" : 1
  })
}));

router.use(function(req,res,next){
  res.locals.user = req.session.user;   // 从session 获取 user对象
  var err = req.session.error;   //获取错误信息
  delete req.session.error;
  res.locals.message = "";   // 展示的信息 message
  if(err){
    res.locals.message = '<div class="alert alert-danger" style="margin-bottom:20px;color:red;">'+err+'</div>';
  }
  next();  //中间件传递
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express',locals:res.locals,env:process.env});
});
router.post('/signin',function (req, res, next) {
  if(req.body.user){
    req.session.user = req.body.user;
    users.push(req.session.user);
  }
  res.redirect("/");
});
router.get('/signout',function (req, res, next) {
  req.session.user = undefined;

  res.redirect("/");
});

module.exports = router;
