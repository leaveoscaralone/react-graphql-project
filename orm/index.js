'use strict';

const Koa = require('koa');
const app = new Koa();
const serve = require('koa-static');
const bodyParser = require('koa-bodyparser');

const conf = require('./config');
const router = require('./router');

const db = require('./models');

const PORT = 3000;

app.use(serve(conf.clientPath));
app.use(bodyParser());
app.use(router.routes());

(async () => {
  await db.sequelize.sync();
  console.log('Connected!');
  app.listen(PORT);
  console.log(`Server listening on port ${PORT}`);
})();