const passport = require('passport')
const jwt = require('jsonwebtoken')
const passportJWTAuth = () => {
    return passport.authenticate('jwt', { session: false })
}

const authMiddleware = (req, res, next) => {
    const accessToken = req.cookies.accessToken

    if (!accessToken) {
        return res.status(401).json({ message: 'Unauthenticated' });
    }

    // Verify the token
    jwt.verify(accessToken, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json(
                { message: 'Invalid token. Please sign in to get back in.' }
            );
        }

        // Add the decoded token to the request object
        req.user = decoded;
        next();
    });
}

module.exports = { passportJWTAuth, authMiddleware }