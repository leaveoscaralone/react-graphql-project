
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Message', {
        content: {
            type: DataTypes.STRING,
            allowNull: false
        },
        authorId: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    })

}