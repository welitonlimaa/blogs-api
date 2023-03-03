/**
 *
 * @param {import('sequelize').Sequelize} sequelize
 * @param {*} DataTypes
 * @returns
 */
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      id: DataTypes.INTEGER,
      displayName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      image: DataTypes.STRING,
    },
    {
      tableName: 'users',
      underscored: true,
      timestamps: false,
    },
  );
  User.associate = (models) => {
    User.hasMany(models.blogPosts, {
      foreignKey: 'user_id',
      as: 'blogPosts',
    });
  };
  return User;
};