'use strict';
let router = require('koa-router')();
let uuid = require('node-uuid');
let jwt = require('jsonwebtoken');
let config = require('./config');
let jwtMiddleware = require('koa-jwt')({ secret: config.jwt_secret });
let proxy = require('koa-proxy');
let pixie = require('koa-pixie-proxy');
let charset = require('superagent-charset')
let request = require('superagent');;
let cheerio = require('cheerio');
let fs = require('fs');
global.Promise = require("bluebird");
charset(request);
let promisify = require('./lib/promisify');
console.log(promisify)

let posts = [
  {
    _id: uuid.v4(),
    name: 'Angular2',
    website: 'https://angular.io/',
    description: 'Angular is a development platform for building mobile and desktop web applications.'
  },
  {
    _id: uuid.v4(),
    name: 'RxJs',
    website: 'http://reactivex.io/',
    description: 'Reactive Extensions (Rx) is a library for composing asynchronous and event-based programs using observable sequences and LINQ-style query operators.'
  },
  {
    _id: uuid.v4(),
    name: 'Babel',
    website: 'https://babeljs.io/',
    description: 'Babel is a compiler for writing next generation JavaScript.'
  }
];

function findPost(id) {
  return posts.find((post) => post._id == id);
}

router.get('/crawlers', function*() {
  function makeReuest2(option){
    return  request.get(option.url)
      .set('Accept','image/webp,*/*;q=0.8')
      .set('Accept-Encoding','gzip, deflate')
      .set('Accept-Language','zh-CN,zh;q=0.8,en;q=0.6')
      .set('Cache-Control','no-cache')
      .set('Connection','keep-alive')
      .set('Cookie',option.cookie)
      .set('Host',option.host)
      .set('Pragma','no-cache')
      .set('Referer',option.referer)
      // .set('Upgrade-Insecure-Requests','1')
      .set('User-Agent','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.98 Safari/537.36')
      .catch(option.cb)
      ;

  }
  function makeReuest(option){
    return  request.get(option.url).charset('gbk')
      .set('Accept','text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8')
      // .set('Accept-Encoding','gzip, deflate, sdch')
      .set('Accept-Language','zh-CN,zh;q=0.8,en;q=0.6')
      .set('Cache-Control','no-cache')
      .set('Connection','keep-alive')
      .set('Cookie',option.cookie)
      .set('Host',option.host)
      .set('Pragma','no-cache')
      .set('Referer',option.referer)
      // .set('Upgrade-Insecure-Requests','1')
      .set('User-Agent','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.98 Safari/537.36')
      .catch(option.cb)
      ;

  }
  let result = {success: true,arr:[]};
  let ss = makeReuest({
    url: 'http://www.pufei.net/manhua/20/',
    cookie:'__cfduid=d8ee8af0943f32d523ae9165ac4ef57351481265253; imgserver=1; playeds=20%7C6526%7C%E9%95%87%E9%AD%82%E8%A1%97%7C171%20%E6%9B%B9%E7%8E%84%E4%BA%AE04%7C1482217980%7C20; Hm_lvt_230837fdf572deef0b702c931922583f=1481265282; Hm_lpvt_230837fdf572deef0b702c931922583f=1482217981',
    host:'www.pufei.net',
    referer:'http://www.pufei.net/manhua/',
    cb:function(err){console.log('获取章节：'+err.message)}
  });
  let _result = yield ss;
  let $ = cheerio.load(_result.text)
  let _dom = $('#play_0')
  let info = [];
  _dom.find('a').each(function (i, ele) {
    info[i] = {};
    info[i].href = $(this).attr('href')
    info[i].title = $(this).attr('title')
  });
  
  result.arr = info;
  console.log('------------', info.length)
  for(let i = 0, l = result.arr.length-1; i < l; ++i) {
    let picsReq = makeReuest({
      url: 'http://www.pufei.net' + info[i].href,
      cookie:'__cfduid=d8ee8af0943f32d523ae9165ac4ef57351481265253; imgserver=1; playeds=20%7C6526%7C%E9%95%87%E9%AD%82%E8%A1%97%7C171%20%E6%9B%B9%E7%8E%84%E4%BA%AE04%7C1482217980%7C20; Hm_lvt_230837fdf572deef0b702c931922583f=1481265282; Hm_lpvt_230837fdf572deef0b702c931922583f=1482217981',
      host:'www.pufei.net',
      referer:'http://www.pufei.net/manhua/20',
      cb:function(err){console.log("第"+info[i].title+""+err.message)}
    });
    let picsRes = yield picsReq;
    if(!picsRes) continue;
    var p = picsRes.text.match(/function base64decode.*/)[0];
    var s = {};
    p = p.replace('function base64decode', 's.base64decode = function')
    eval(p);
    let photosr = new Array();
    let base64decode = s.base64decode;
    let _paced = picsRes.text.match(/packed=.*slice\(\d\)\)\)\;/)[0];
    _paced = _paced.replace('packed=', 'let packed=')
    eval(_paced);

    result.arr[i].pic = photosr;

    console.log('....', i)
    for (let j = 1, jl = result.arr[i].pic.length; j <= jl; ++j) {
      console.log('..', j)
      let _pic = makeReuest2({
            url: 'http://ziniao.zgkouqiang.cn/' + result.arr[i].pic[j],
            cookie:'_cfduid=dc43da4fb68265e15bb28840d3550a9c31480774326',
            host:'ziniao.zgkouqiang.cn',
            referer:'http://www.pufei.net'+info[i].href,
            cb:function(err){console.log('图片：'+err.message)}
        })
        ;
      let _picRes = yield _pic;
      if(!_picRes) continue;
      let path = 'imgfile/' + result.arr[i].title;
      let imgPath = path+ '/' + j + '.jpg';

      const writeFileAsync = promisify(fs.writeFile);
      const mkdirAsync = promisify(fs.mkdir);

      console.log('write start:', 'http://ziniao.zgkouqiang.cn/' + result.arr[i].pic[j])
      console.log('res body: ', Buffer.isBuffer(_picRes), _picRes.buffered)
      writeFileAsync(imgPath, _picRes.body)
        .then(function () {
          console.log('write OK:', imgPath)
        })
        .catch(function () {
          console.log('write err:', imgPath)
          mkdirAsync(path)
            .then(function () {
              return writeFileAsync(imgPath, _picRes.body)
            })
            .then(function () {
               console.log('write file retry finished:', imgPath)
            })
            .catch(function (err) {
              console.log('retry err', err)
              throw  err;
            });
        });
        yield (new Promise((res, rej)=>{
          setTimeout(res, 2000+Math.random())
        }));
    }
  }
  result.arr = info;
  this.body = result;

});


router.get('/index/:id', function*() {
  let foundPost = findPost(this.params.id);

  if (foundPost) {
    this.body = foundPost;
  }
  else {
    this.throw(404);
  }
});

router.post('/index/:id', function*() {
  let foundPost = findPost(this.params.id);

  if (foundPost) {
    Object.assign(foundPost, this.request.body);
    this.body = foundPost;
  }
  else {
    this.throw(404);
  }
});


router.post('/index', jwtMiddleware, function*() {
  posts.unshift(Object.assign(
    { },
    this.request.body,
    { _id: uuid.v4() }
  ));

  this.body = {success: true};
});

router.post('/login', function*() {
  let email = this.request.body.email;
  let password = this.request.body.password;

  let result = {success: false};

  if (email == 'admin@gmail.com' && password == 'angular2') {
    result.success = true;
    result.auth_token = jwt.sign({ email: email }, config.jwt_secret);
  }

  this.body = result;
});

module.exports = router;