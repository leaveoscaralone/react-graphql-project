const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const TopicSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    datePosted: {
        type: Date,
        default: Date.now()
    }, 
    score: {
        type: Number,
        default: 0
    }
})

module.exports = mongoose.model('Topic', TopicSchema)


