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

  // 获取单章漫画的所有图片
  let pics = request.get('http://www.pufei.net'+info[0].href).charset('gbk');
  let picsRes = yield pics;
  var p = picsRes.text.match(/function base64decode.*/)[0];
  console.log(p)
  eval(p)
  // var photosr = new Array();
  // eval(picsRes.text.match(/packed=.*slice\(\d\)\)\)\;/)[0])
  console.log(typeof p)
  fs.writeFile('html.html',picsRes.text,function (err) {
    if(err) throw err;
    console.log('ok')
  })

  // let reg = /new Array.*,''\)/;
  // let mhCap = _result.text.match(reg)[0];
  // let _arr = eval(mhCap);
  // result.arr = _arr.map(e=>{
  //   let $ = cheerio.load(e);
  //
  //   return {
  //     href:$('a').attr('href'),
  //     title:$('a').attr('title')
  //   }
  // });
  // for(let i = 0, l = result.arr.length-1; i < l; ++i){
  //   let qq = request.get('http://m.neihanlu.com'+result.arr[i].href);
  //   let qqq = yield qq;
  //   let _q = qqq.text.match(/var picTree.*\.jpg\'\]\;/)[0];
  //   result.arr[i].pic = eval(_q.replace('var picTree =',''));
  //   let pic_base = 'http://manhua.mimanhua.com/';
    // for(let j = 0, jl = result.arr[i].pic.length; j < jl; ++j){
    //   let _pic = request.get(pic_base+result.arr[i].pic[j]);
    //   let _picRes = yield _pic;
    //   var path = 'imgfile/'+result.arr[i].title+'/'+j+'.jpg';
      // fs.exists(path, function (err) {
      //   if(err){
      //     fs.mkdir('imgfile/'+result.arr[i].title,function (err) {
      //       if(err) throw err;
      //       fs.writeFile(path, _picRes.body, (err) => {
      //         if (err) throw err;
      //         console.log('It\'s saved!');
      //       });
      //     })
      //   }else{
      //     fs.writeFile(path, _picRes.body, (err) => {
      //       if (err) throw err;
      //       console.log('It\'s saved!');
      //     });
      //   }
      //
      // })
    //   console.log(fs.existsSync(path));
    //   console.log(_picRes.body)
    //
    // }
  // }

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