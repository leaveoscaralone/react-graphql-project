const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/new_db');

const db = mongoose.connection;

db.on('error', () => console.log('there was an error connecting to MongoDB'))

db.once('open', () => console.log('connected to the db'));

module.exports = db;

