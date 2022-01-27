'use strict'

const Koa = require('koa');
const app = new Koa();
const serve = require('koa-static');
const bodyParser = require('koa-bodyparser');

const config = require('./config');
const router = require('./router');

const db = require('./models/db');
const PORT = 3001;

app.use(serve(config.clientPath));
app.use(bodyParser());
app.use(router.routes());

(async () => {
    await db.sequelize.sync()
    console.log('connection successfull');
    app.listen(PORT);
    console.log(`listening on port ${PORT}`);
})();

