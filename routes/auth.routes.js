const router = require('express').Router()

const authController = require('../controllers/auth.controller')
const { passportJWTAuth } = require('../middleware');


router.post('/signup', authController.signup)
router.post(
    '/login',
    authController.login
)

router.get(
    '/user/me',
    passportJWTAuth(),
    (req, res) => {
        res.json('my profile')
    }
);

module.exports = router;