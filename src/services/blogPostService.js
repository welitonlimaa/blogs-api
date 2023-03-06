const { BlogPost, PostCategory, sequelize } = require('../models');

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
  const result = await BlogPost.findAll();
  return result;
};

module.exports = {
  createBlogPost,
  getAllBlogPosts,
};