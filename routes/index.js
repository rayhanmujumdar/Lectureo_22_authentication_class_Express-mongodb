const routes = require('express').Router()
const authRoutes = require('./auth')

routes.use('/api/v1/auth/',authRoutes)

module.exports = routes