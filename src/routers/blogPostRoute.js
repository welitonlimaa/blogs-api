const express = require('express');

const { authValidation } = require('../middlewares');

const { blogPostController } = require('../controllers');

const router = express.Router();

router.post('/', authValidation, blogPostController.createBlogPost);

router.get('/', authValidation, blogPostController.getAllBlogPosts);

router.get('/:id', authValidation, blogPostController.getPostById);

module.exports = router;