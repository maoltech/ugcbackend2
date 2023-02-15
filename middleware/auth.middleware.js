const passport = require('passport')

const passportJWTAuth = () => {
    return passport.authenticate('jwt', { session: false })
}

module.exports = { passportJWTAuth}