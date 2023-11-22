// Importing Sequelize models and defining associations between them.
const Category = require('./Category');
const Tag = require('./Tag');
const Product = require('./Product');
const ProductTag = require('./ProductTag');

// -------------------------------------------------------------
// Establishing associations between the 
// Product, Category, Tag, and ProductTag models.

Product.belongsTo(Category, {
  foreignKey: 'category_id',
  onDelete: 'cascade',
})

Category.hasMany(Product, {
  foreignKey: 'category_id',
  onDelete: 'cascade',
})

Product.belongsToMany(Tag, { 
  through: ProductTag,
  foreignKey: 'product_id',
  onDelete: 'cascade',
});

Tag.belongsToMany(Product, { 
  through: ProductTag,
  foreignKey: 'tag_id',
  onDelete: 'cascade',
});

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};