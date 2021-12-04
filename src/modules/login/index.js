const express = require('express')
const router = express.Router()
const { GET } = require('./controller')
const checkToken = require('../../middleware/redirectAdmin')

router.get('/login', checkToken , GET)

module.exports = router