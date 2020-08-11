const express = require('express');
const router = express.Router();
const checkAuth = require('../../middleware/checkAuth');

const userController = require('../controllers/users');

router.post('/signup', checkAuth, userController.signup);
router.post('/login', userController.login);

module.exports = router;
