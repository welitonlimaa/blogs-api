const express = require('express');

const { loginValidation } = require('../middlewares');

const { loginControler } = require('../controllers');

const router = express.Router();

router.post('/', loginValidation, loginControler.loginAuth);

module.exports = router;