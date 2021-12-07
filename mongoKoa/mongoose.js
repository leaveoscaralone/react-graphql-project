const Koa = require('koa')
const app = new Koa()
const bodyParser = require('koa-bodyparser')
const mongoose = require('mongoose')
const PORT = 3003 

//DB mongoose
mongoose.connect('mongodb://localhost/chat').then(() => {
    console.log('mongoose connected');
})
.catch(err => console.log('error connecting to the db', err));

// models
const messageSchema = new mongoose.Schema({
    author: Boolean,
    content: {
        type: String,
        required: true
    },
    timestamp: Date
    }
);

const Message = mongoose.model('message', messageSchema);
    
// router.js
const Router = require('koa-router');
const router = new Router();

router.get('/messages', async (ctx) => {
    try{
        ctx.body = await Message.find();

    } catch (err) {
        console.log(err);
        ctx.status = 500;
    }
})

router.post('/messages', async (ctx) => {
    try {
        const { author, content } = ctx.request.body;
        ctx.body = await Message.create({ author, content, timestamp: new Date()});
        ctx.status = 201;
    } catch (err) {
        console.log(err);
        ctx.status = 500;
    }
});

router.get('/messages/:id', (ctx) => {
    console.log(ctx.params);
    ctx.body = ctx.params.id;
});

//middleware
app.use(bodyParser());
app.use(router.routes());

//listeners
app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})