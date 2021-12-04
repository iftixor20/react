const express = require('express')
const router = express.Router()
const { GET } = require('./controller')

router.get('/signup', GET)

module.exports = router