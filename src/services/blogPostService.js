const { Op } = require('sequelize');

const { BlogPost, PostCategory, User, Category, sequelize } = require('../models');

const { 
  validateNewPost, 
  validateCategoryId, 
  validateUpdatePost,
} = require('./validations/blogPostValidation');

const createBlogPost = async (dataBlogPost, userId) => {
  const dataError = validateNewPost(dataBlogPost);
  if (dataError.type) return dataError;

  const { title, content, categoryIds } = dataBlogPost;

  const idError = await validateCategoryId(categoryIds);
  
  if (idError.type) return idError;

  try {
    const result = await sequelize.transaction(async (t) => {
      const BlogPostCreated = await BlogPost.create({ title, content, userId }, { transaction: t });

      const dataPostCategory = categoryIds.map((id) => 
        ({ postId: BlogPostCreated.id, categoryId: id }));
      await PostCategory.bulkCreate(dataPostCategory, { transaction: t });

      return { type: null, message: BlogPostCreated };
    });
    return result;
  } catch (error) {
    return error;
  }
};

const getAllBlogPosts = async () => {
  const result = await BlogPost.findAll({
    include: [
      { model: User, as: 'user', attributes: { exclude: 'password' } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });

  return result;
};

const getPostById = async (postId) => {
  const result = await BlogPost.findOne({
    where: { id: postId },
    include: [
      { model: User, as: 'user', attributes: { exclude: 'password' } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });

  if (!result) return { type: 'NOT_FOUND', message: 'Post does not exist' };

  return { type: null, message: result };
};

const update = async (postId, userId, data) => {
  const post = await BlogPost.findByPk(postId);
  if (!post) return { type: 'NOT_FOUND', message: 'Post does not exist' };
  if (post.userId !== userId) return { type: 'UNAUTHORIZED', message: 'Unauthorized user' };

  const dataError = validateUpdatePost(data);
  if (dataError.type) return dataError;

  await BlogPost.update(data, {
    where: { id: postId },
  });

  const updatedPost = await BlogPost.findOne({
    where: { id: postId },
    include: [
      { model: User, as: 'user', attributes: { exclude: 'password' } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });

  return { type: null, message: updatedPost };
};

const removePost = async (postId, userId) => {
  const post = await BlogPost.findByPk(postId);
  
  if (!post) return { type: 'NOT_FOUND', message: 'Post does not exist' };
  if (post.userId !== userId) return { type: 'UNAUTHORIZED', message: 'Unauthorized user' };

  await BlogPost.destroy({ where: { id: postId } });

  return { type: null, message: '' };
};

const searchPosts = async (q) => {
  const result = await BlogPost.findAll({
    where: { [Op.or]: [
      { title: { [Op.like]: `%${q}%` } }, 
      { content: { [Op.like]: `%${q}%` } },
    ] },
    include: [
      { model: User, as: 'user', attributes: { exclude: 'password' } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });

  if (!result) return { type: 'NOT_FOUND', message: 'Post does not exist' };

  return { type: null, message: result };
};

module.exports = {
  createBlogPost,
  getAllBlogPosts,
  getPostById,
  update,
  removePost,
  searchPosts,
};