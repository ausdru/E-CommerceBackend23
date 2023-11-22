// Sequelize model for the 'category' table with columns id 
// and category_name.

const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class Category extends Model {}

// -------------------------------------------------------------
// Definining category columns.

Category.init({
  id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
  },
  category_name: {
      type: DataTypes.STRING,
      allowNull: false
  }
}, {
  sequelize,
  timestamps: false,
  freezeTableName: true,
  underscored: true,
  modelName: 'category',
});

module.exports = Category;
