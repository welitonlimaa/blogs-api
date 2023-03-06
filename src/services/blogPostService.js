const { BlogPost, PostCategory, User, Category, sequelize } = require('../models');

const { validateNewPost, validateCategoryId } = require('./validations/blogPostValidation');

const createBlogPost = async (dataBlogPost, userId) => {
  const dataError = validateNewPost(dataBlogPost);
  if (dataError.type) return { type: 'BAD_REQUEST', message: 'Some required fields are missing' };

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

module.exports = {
  createBlogPost,
  getAllBlogPosts,
  getPostById,
};