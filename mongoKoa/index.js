const Koa = require('koa')
const app = new Koa()
const bodyParser = require('koa-bodyparser')
const PORT = 3002 

//DB mongodb
const { MongoClient } = require('mongodb')
const db = {}

db.client = new MongoClient('mongodb://localhost:3002');

( async () => {
    try {
        await db.client.connect()
        db.connection = db.client.db('chat')
    } catch (err) {
        console.log(err)
    }
})();
    
// router.js
const Router = require('koa-router')
const router = new Router()

router.get('/messages', async (ctx) => {
    ctx.body = await db.connection.collection('messages').find({}).toArray();
})

router.post('/messages', async (ctx) => {
    ctx.body = await db.connection.collection('messages').insertOne(ctx.request.body);
})

//middleware
app.use(bodyParser());
app.use(router.routes());
//listeners
app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})