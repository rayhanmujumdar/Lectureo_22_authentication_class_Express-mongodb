const routes = require('express').Router()
const authRoutes = require('./auth')
const userRouter = require('./users')
const verifyToken = require('../middleware/authenticate')
routes.use('/api/v1/auth/',authRoutes)
routes.use('/api/v1/users',verifyToken,userRouter)

module.exports = routes