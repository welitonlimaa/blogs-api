const express = require('express');

const { authValidation } = require('../middlewares');

const { categoryController } = require('../controllers');

const router = express.Router();

router.post('/', authValidation, categoryController.createCategory);

module.exports = router;