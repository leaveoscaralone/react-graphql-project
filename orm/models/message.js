'use strict';


module.exports = (sequelize, DataTypes) => sequelize.define('Message', {
  content: {
    type: DataTypes.STRING,
    allowNull: false
  },
  authorId: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  }
});
