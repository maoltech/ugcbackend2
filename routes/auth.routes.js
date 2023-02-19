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
    passport.authenticate('google', { scope: ['profile', 'email'] })
);


router.get('/google/callback', authController.handleGoogleCallback);

router.get('/twitter', passport.authenticate(
    'twitter', 
    { scope: ['tweet.read', 'users.read', 'offline.access'] })
)

router.get(
    '/twitter/callback',
    passport.authenticate('twitter'),
    // (req, res) => {res.status(200).json(req.user)}
    function(req, res) {
        res.status(200).json(req.user);
      }
)



router.get(
    '/user/me',
    passportJWTAuth(),
    (req, res) => {
        res.json('my profile')
    }
);

module.exports = router;