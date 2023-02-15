const router = require('express').Router()
const passport = require('passport')
const authController = require('../controllers/auth.controller')
const { passportJWTAuth } = require('../middleware');


router.post('/signup', authController.signup)
router.post(
    '/login',
    authController.login
)

router.get('/google',
    passport.authenticate('google', { scope: ['profile'] })
);


router.get('/google/callback',
    passport.authenticate('google', { session: false }),
    function (req, res) {
        // Successful authentication, redirect to user's profile page.
        res.send('comepleted');
    }
);

router.get(
    '/user/me',
    passportJWTAuth(),
    (req, res) => {
        res.json('my profile')
    }
);

module.exports = router;