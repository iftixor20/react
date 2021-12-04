const express = require('express')
const router = express.Router()

const { GET } = require('./controller')

router.get('/', GET)

module.exports = router