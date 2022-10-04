const express = require('express')
const router = express.Router()
const user = require('../router_headler/user')
router.post('/login',user.login)
router.post('/register',user.register)
router.post('/update',user.update)
module.exports = router