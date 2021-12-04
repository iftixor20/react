const express = require('express')
const router = express.Router()
const { LOGOUT } = require('./controller')

router.get('/logout', LOGOUT)

module.exports = router