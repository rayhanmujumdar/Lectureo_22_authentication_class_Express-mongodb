const routes = require('express').Router()
const authRoutes = require('./auth')
const userRouter = require('./users')
const adminAttendance = require('./admin-attendance')
const verifyToken = require('../middleware/authenticate')
routes.use('/api/v1/auth/',authRoutes)
routes.use('/api/v1/users',verifyToken,userRouter)
routes.use('/api/v1/admin/attendance',verifyToken,adminAttendance)

module.exports = routes