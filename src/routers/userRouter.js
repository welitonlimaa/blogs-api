const express = require('express');

const { loginValidation } = require('../middlewares');

const { userControler } = require('../controllers');

const router = express.Router();

router.post('/', loginValidation, userControler.loginAuth);

module.exports = router;