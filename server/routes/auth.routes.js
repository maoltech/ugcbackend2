const router = require('express').Router()

const authController = require('../controllers/auth.controller')
const passport = require('passport');


router.post('/signup', authController.signup)
router.post(
    '/login',
    authController.login
)

router.get(
    '/user/me',
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        res.json('my profile')
    }
);

module.exports = router;