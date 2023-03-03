const express = require('express');

const { userControler } = require('../controllers');

const { authValidation } = require('../middlewares');

const router = express.Router();

router.post('/', userControler.createUser);

router.get('/', authValidation, userControler.getUsers);

router.get('/:id', authValidation, userControler.getUserById);

module.exports = router;