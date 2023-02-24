const router = require('express').Router()
const { authMiddleware } = require('../middleware');
const usersController = require('../controllers/users.controller')

router.get('/user/me', authMiddleware, usersController.getOwnProfile);

module.exports = router;