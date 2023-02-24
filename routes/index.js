const router = require('express').Router()

const authRoutes = require('./auth.routes')
const userRoutes = require('./users.routes')

// router.use('/service', service)
router.use('/auth', authRoutes)
.use('/auth', userRoutes)

module.exports = router;