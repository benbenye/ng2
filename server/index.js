'use strict';
let koa = require('koa');
let staticServe = require('koa-static');
let bodyParser = require('koa-bodyparser');
let config = require('./config');
let router = require('./router');
let proxy = require('koa-proxy');
let pixie = require('koa-pixie-proxy');
let send = require('koa-send');
let path = require('path');

let app = koa();

app.use(function *(next){
  let m = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"],
      useragent = this.req.headers['user-agent'];
  if(this.path == '/'){
    if(m.some(function(i){return useragent.match(i);})){
      console.log('m')
      yield send(this, path.join(this.path,'dist/client/index_m.html'));
    }else{
      console.log('pc')
      yield send(this, path.join(this.path,'dist/client/index.html'));
    }
  } else {
    yield next
  }
})

app.use(staticServe(config.staticPath));

app.use(proxy({
  host: 'http://cms.chunbo.com',
  match:/^\/CmsHome/
}));

app.use(proxy({
  host: 'http://api.chunbo.com',
  match:/^\/Category/
}));

app.use(bodyParser());

app.use(router.routes());
app.listen(config.port);
console.log(`Listening on port ${config.port}`);
