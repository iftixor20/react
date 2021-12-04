const express = require('express')
const router = express.Router()
const { GET } = require('./controller')
const checkToken = require('../../middleware/checkToken')

router.get('/upload', checkToken , GET)

module.exports = router