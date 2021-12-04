const express = require('express')
const router = express.Router()

const { GET_USER, REGISTER, LOGIN, GET_ALL } = require('./controller')

router.get('/api/user', GET_USER)
router.get('/api/users', GET_ALL)
router.post('/api/register', REGISTER)
router.post('/api/login', LOGIN)

module.exports = router