/**
 *
 * @param {import('sequelize').Sequelize} sequelize
 * @param {*} DataTypes
 */
module.exports = (sequelize, DataTypes) => {
  const PostCategory = sequelize.define(
    'PostCategory',
    {
      postId: DataTypes.INTEGER,
      categoryId: DataTypes.INTEGER,
    },
    {
      timestamps: false,
      tableName: 'posts_categories',
      underscored: true,
    },
  );
  PostCategory.associate = ({ BlogPost, Category }) => {
    BlogPost.belongsToMany(Category, {
      foreignKey: 'postId',
      otherKey: 'categoryId',
      through: PostCategory,
      as: 'categories',
    });
    Category.belongsToMany(BlogPost, {
      foreignKey: 'categoryId',
      otherKey: 'postId',
      through: PostCategory,
      as: 'blog_posts',
    });
  };
  return PostCategory;
};