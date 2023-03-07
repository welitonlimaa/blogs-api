const express = require('express');

const { userControler } = require('../controllers');

const { authValidation } = require('../middlewares');

const router = express.Router();

router.post('/', userControler.createUser);

router.get('/', authValidation, userControler.getUsers);

router.get('/:id', authValidation, userControler.getUserById);

router.delete('/me', authValidation, userControler.removeUser);

module.exports = router;