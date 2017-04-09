var express = require('express');
var router = express.Router();

router.get('/setcookie',function (req, res, next) {
  // console.log(res);
  res.cookie(req.query.key, req.query.value,{expires: new Date(Date.now() + 900000000)});
  console.log(res.cookies);
  res.json({params:req.params,query:req.query});
});


// //express-session redis方案 不会如何改写底层，所以不会怎么用它做单点登录
// var session = require('express-session');
// var RedisStrore = require('connect-redis')(session);
//
// router.use(session({
//   secret: 'secret',
//   cookie: {
//     maxAge: 1000 * 60 * 30,
//     httpOnly:false
//   },
//   store : new RedisStrore({
//     "host" : "localhost",
//     "port" : "6379",
//     "db" : 1
//   })
// }));
// router.use(function(req,res,next){
//   res.locals.user = req.session.user;   // 从session 获取 user对象
//   var err = req.session.error;   //获取错误信息
//   delete req.session.error;
//   res.locals.message = "";   // 展示的信息 message
//   if(err){
//     res.locals.message = '<div class="alert alert-danger" style="margin-bottom:20px;color:red;">'+err+'</div>';
//   }
//   next();  //中间件传递
// });

//原生 redis 方案，改写底层，完成了客户端的单点登录方案
var redis   = require('redis');
var client  = redis.createClient('6379', '127.0.0.1');
client.on("error", function(error) {console.log(error);});
router.use(function(req,res,next){
  function saveSession() {
    console.log("saveSession:"+ JSON.stringify(req.session));
    client.set(req.session._id,JSON.stringify(req.session),redis.print);
    res.cookie("connect.sid", req.session._id,{expires: new Date(Date.now() + 900000000)});
  }
  var _send = res.send;
  res.send = function () {
    saveSession();
    _send.apply(res,arguments);
  };
  var _redirect = res.redirect;
  res.redirect = function () {
    saveSession();
    _redirect.apply(res,arguments);
  };

  if(req.cookies["connect.sid"]){
    client.get(req.cookies["connect.sid"],function (err,obj) {
      if(err){console.log(err)}
      if(obj){
        console.log("session存在"+ obj);
        req.session = JSON.parse(obj);
        req.session._id = req.cookies["connect.sid"];
      }else{
        console.log("session不存在");
        var sessionId = (Math.random() * 100000000000) + "";
        req.session = {};
        req.session._id = sessionId;
      }
      res.locals.user = req.session.user;
      next();  //中间件传递
    });
  }else{
    console.log("cookie不存在");
    var sessionId = (Math.random() * 100000000000) + "";
    req.session = {};
    req.session._id = sessionId;
    res.locals.user = req.session.user;
    next();  //中间件传递
  }
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express',locals:res.locals,env:process.env});
});
router.post('/signin',function (req, res, next) {
  console.log('/signin');
  if(req.body.user){
    req.session.user = req.body.user;
    console.log("signin session:"+ JSON.stringify(req.session) );
  }
  res.redirect("/");
});
router.get('/signout',function (req, res, next) {
  req.session.user = undefined;
  res.redirect("/");
});

module.exports = router;
