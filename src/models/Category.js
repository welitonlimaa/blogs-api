/**
 *
 * @param {import('sequelize').Sequelize} sequelize
 * @param {*} DataTypes
 * @returns
 */
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define(
    'Category',
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      name: DataTypes.STRING,
    },
    {
      tableName: 'categories',
      timestamps: false,
    },
  );
  // Category.associate = (models) => {
  //   Category.belongsTo(models.blogPosts, {
  //     foreignKey: '_id',
  //     as: 'blogPosts',
  //   });
  // };
  return Category;
};