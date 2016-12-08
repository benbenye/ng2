'use strict';
let router = require('koa-router')();
let uuid = require('node-uuid');
let jwt = require('jsonwebtoken');
let config = require('./config');
let jwtMiddleware = require('koa-jwt')({ secret: config.jwt_secret });
let proxy = require('koa-proxy');
let pixie = require('koa-pixie-proxy');
let request = require('superagent');
let cheerio = require('cheerio');

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
  let result = {success: true};
  let ss = request.get('http://m.neihanlu.com/manhua/ZhenHunJie/');
  let _result = yield ss;
  let reg = /new Array.*,''\)/;
  let mhCap = _result.text.match(reg)[0];
  let _arr = eval(mhCap);
  result.arr = _arr.map(e=>{
    let $ = cheerio.load(e);

    return {
      href:$('a').attr('href'),
      title:$('a').attr('title')
    }
  });
  result.arr.forEach(e=>{
    console.log(e)
    let qq = request.get('http://m.neihanlu.com'+e.href);
    let qqq = yield qq;
    qqq = eval(qqq.text.match(/var picTree.*\.jpg\'\]\;/)[0]);

    console.log(qqq)
  })

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