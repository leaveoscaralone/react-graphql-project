const Messages = require('./db')

async function getMessages (req, res) {
    try {
        let messageList = await Messages.findAll()
        res.status = 200
        console.log(messageList);
        res.body = messageList
    } catch (err) {
        res.status(500).send(err)
    }
}

async function postMessages (req, res)  {
    console.log('request received');
    res.status(200).send('success')
}

const funcs = {
    getMessages,
    postMessages
}

module.exports = funcs