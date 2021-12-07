const db = require('../models/db')

exports.getAll = async (ctx) => {
    try {
        const msg = await db.Message.findAll()
        // console.log('get success');
        ctx.body = msg;
    } catch (err) {
        ctx.status = 500
    }
}

exports.post = async (ctx) => {
    const msg = ctx.request.body
    try {
        ctx.body = await db.Message.create({
            authorId: msg.authorId,
            content: msg.content
        })
        ctx.status = 201

    } catch (err) {
        ctx.status = 500
    }

}