const express = require('express');

const router = express.Router();
const usersController = require('./users.controller');

router.get('/', usersController.getUsers); // only for testing
router.delete('/', usersController.deleteUsers); // only for testing - DANGER

module.exports = router;
