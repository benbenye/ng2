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
charset(request);

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
  let result = {success: true,arr:[]};
  let ss = request.get('http://www.pufei.net/manhua/20/').charset('gbk');
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
  this.body = result;

  for(let i = 0, l = result.arr.length-1; i < l; ++i) {
    let picsReq = request.get('http://www.pufei.net' + info[i].href).charset('gbk');
    let picsRes = yield picsReq;
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

    for (let j = 1, jl = result.arr[i].pic.length; j <= jl; ++j) {
      let _pic = request.get('http://ziniao.zgkouqiang.cn/' + result.arr[i].pic[j]);
      let _picRes = yield _pic;
      let path = 'imgfile/' + result.arr[i].title;
      let imgPath = path+ '/' + j + '.jpg';
      fs.writeFile(imgPath, _picRes.body, (err) => {
        if (err){
          fs.mkdir(path, function (err) {
            if (err) throw err;
            fs.writeFile(imgPath, _picRes.body, (err) => {
              if (err) throw err;
              console.log('It\'s saved!'+i+'-'+j);
            });
          })
        }
        console.log('It\'s saved!'+i+'-'+j);
      });
    }
  }

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