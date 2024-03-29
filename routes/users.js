const express = require('express');
const { userValidationRules, validate } = require('../validator.js');
const router = express.Router();

const usersController = require('../controllers/users');

router.get('/', usersController.getAll);

router.get('/:id', usersController.getSingle);

router.post('/', userValidationRules(),usersController.createUser);

router.put('/:id', userValidationRules(),usersController.updateUser);

router.delete('/:id', usersController.deleteUser);

module.exports = router;