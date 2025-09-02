const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const {authMiddleware, PEP} = require('../middlewares/authMiddleware');

router.post('/signup', authController.createUser);
router.post('/login', authController.loginUser);
router.post('/users', authMiddleware, PEP, authController.getAllUsers);

module.exports = router;