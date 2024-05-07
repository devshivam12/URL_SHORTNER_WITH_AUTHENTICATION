const express = require("express")
const router = express.Router()
const {handleUserSignup, handleUserLogin} = require("../controller/user.controller")

router.post('/', handleUserSignup)
router.post('/login', handleUserLogin)

module.exports = router