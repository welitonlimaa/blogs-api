const { blogPostService } = require('../services');

const errorMap = require('../utils/errorMap');

const createBlogPost = async (req, res) => {
  try {
    const postData = req.body;
    const { id } = req.data;

    const { type, message } = await blogPostService.createBlogPost(postData, id);

    if (type) return res.status(errorMap.mapError(type)).json({ message });

    return res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ message: 'erro interno', error });
  }
};

const getAllBlogPosts = async (_req, res) => {
  const blogPosts = await blogPostService.getAllBlogPosts();

  res.status(200).json(blogPosts);
};

const getPostById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await blogPostService.getPostById(Number(id));
  if (type) return res.status(errorMap.mapError(type)).json({ message });

  res.status(200).json(message);
};

module.exports = {
  createBlogPost,
  getAllBlogPosts,
  getPostById,
};
