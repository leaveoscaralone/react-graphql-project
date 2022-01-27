const Topic = require('../models/schema')

exports.getAll = async function (req, res) {
    try {
        const allTopics = await Topic.find();
        res.send(allTopics);
    } catch (err) {
        console.log(err);
        res.sendStatus(500)
    }
}

exports.newTopic = async function (req, res) {
    try {
        const title = req.body.title;
        const newTopic = await Topic.create({ title });
        res.status(201)
        res.send(newTopic);
    } catch (err) {
        console.log(err);
        res.sendStatus(500)
    }
}

exports.voteTopic = async function (req, res) {
    try {
        const { id, dir } = req.params;
        const topicToUpdate = await Topic.findByIdAndUpdate({
            _id: id,
        }, { $inc: {score: dir === 'up' ? 1 : -1} }, {new: true});
        res.send(topicToUpdate)
    } catch(err) {
        console.log(err);
        res.sendStatus(500);
    }
}

exports.deleteTopic = async function (req, res) {
    try{
        const { id } = req.params;
        const topicToDelete = await Topic.findOneAndRemove({
            _id: id,
        })
        res.sendStatus(204)
    } catch (err) {
        console.log(err);
        res.sendStatus(404);
    }
}