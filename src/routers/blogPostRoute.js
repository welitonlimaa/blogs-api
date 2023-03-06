const express = require('express');

const { authValidation } = require('../middlewares');

const { blogPostController } = require('../controllers');

const router = express.Router();

router.post('/', authValidation, blogPostController.createBlogPost);

module.exports = router;