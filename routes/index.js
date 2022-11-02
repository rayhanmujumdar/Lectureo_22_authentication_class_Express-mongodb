const routes = require('express').Router()
const authRoutes = require('./auth')
const userRouter = require('./users')

routes.use('/api/v1/auth/',authRoutes)
routes.use('/api/v1/users',userRouter)

module.exports = routes