const express = require('express')
const router = express.Router()
const checkToken = require('../../middleware/checkToken')

const { GET } = require('./controller')

router.get('/admin', checkToken , GET)

module.exports = router 