// Sequelize model for the 'tag' table with columns id and tag_name.

const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

// -------------------------------------------------------------
// Defining tag's columns.

class Tag extends Model {}

Tag.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    tag_name: {
      type: DataTypes.STRING,
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'tag',
  }
);

module.exports = Tag;
