const router = require("express").Router()
const {getDisable,getEnable} = require('../controllers/admin-attendance')
router.get('/enable', getEnable)
router.get("/disable",getDisable)

module.exports = router