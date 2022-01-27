const { Sequelize, DataTypes } = require('sequelize')
const sequelize = new Sequelize('chat_server', 'root', 'password', {
    host: 'localhost',
    dialect: 'mysql'
})

const Messages = sequelize.define('Message', { 
    authorId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    content: {
        type: DataTypes.CHAR,
        allowNull: false
    }, 
    timestamp: {
        type: DataTypes.DATE,
        allowNull: false
    }
})

module.exports = Messages;
// Database connection tester
// async function auth () {
//     try {
//         await sequelize.authenticate();
//         console.log('connection established');
//     } catch (err) {
//         console.error('unable to connect to database', err);
//     }
// }


