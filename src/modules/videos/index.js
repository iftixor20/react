const express = require('express')
const router = express.Router()

const { UPLOAD, GET_VIDEO_BY_USERID, GET_VIDEO_BY_ID, GET_USER_VIDEOS , GET_ALL_VIDEOS, DELETE, UPDATE } = require('./controller')

router.post('/api/video/upload', UPLOAD)
router.get('/api/video/delete/:id', DELETE)
router.get('/api/video/delete/:id', DELETE)
router.get('/api/video', GET_VIDEO_BY_USERID) 
router.get('/api/videos', GET_ALL_VIDEOS) 
router.get('/api/videos/:id', GET_USER_VIDEOS) 
router.get('/api/video/:id', GET_VIDEO_BY_ID)
router.post('/api/video/:id', UPDATE)

module.exports = router