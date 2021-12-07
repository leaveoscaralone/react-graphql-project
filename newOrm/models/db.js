const fs = require('fs')
const path = require('path')

const Sequelize = require('sequelize')
const db = {};

const sequelize = new Sequelize('chat_server', 'root', 'password', {
    host: 'localhost',
    dialect:'mysql'
})

const files = fs.readdirSync(__dirname)

for (let file of files) {
    if (file !== 'db.js') {
        const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
        db[model.name] = model;
    }
}

for (const model in db) {
    if (db[model].associate) {
        db[model].associate(db)
    }
}

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
