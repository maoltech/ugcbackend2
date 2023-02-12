const router = require('express').Router()

const  usersController  = require('../controllers/users.controller')

router.post('/signup', usersController.signup)

module.exports = router