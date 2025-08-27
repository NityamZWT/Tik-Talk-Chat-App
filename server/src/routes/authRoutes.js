const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/signup', authController.createUser);
router.post('/login', authController.loginUser);
router.get('/users', authMiddleware, authController.getAllUsers);

module.exports = router;