'use strict';
let koa = require('koa');
let staticServe = require('koa-static');
let bodyParser = require('koa-bodyparser');
let config = require('./config');
let router = require('./router');
let proxy = require('koa-proxy');
let pixie = require('koa-pixie-proxy');
const Router = require('koa-router');

let app = koa();

app.use(staticServe(config.staticPath));

app.use(proxy({
  host: 'http://api.chunbo.com',
  match:/^\/Category/
}));

app.use(proxy({
  host: 'http://search.chunbo.com',
  match:/^\/list_solr/
}));

app.use(bodyParser());

app.use(router.routes());
app.listen(config.port);
console.log(`Listening on port ${config.port}`);
