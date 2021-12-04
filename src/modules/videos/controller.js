const model = require('./model')
const path = require('path')
const jwt = require('../../lib/jwt')

const UPLOAD = (req, res) => {
    const videoUpload = req.files.video
    const videoName = new Date().getTime() + '_' + videoUpload.name.replace(/\s/g, '_').trim()
    videoUpload.mv(path.join(process.cwd(), 'src', 'videos', videoName), err => {
        if(err) console.log(err);
        const userId = jwt.verify(req.cookies.userId) - 0
        const video = model.insertVideo(req.body, videoName, userId)
        if(video){
            res.redirect('/upload')
        } else {
            res.status(400).json({message: "Somthing wrong"})
        }
    })
}

const GET_VIDEO_BY_USERID = (req, res) => {
    const userId = jwt.verify(req.cookies.userId) - 0 
    res.status(200).json(model.fetchVideoByUserId(userId))
}

const GET_VIDEO_BY_ID = (req, res) => {
    const {id} = req.params
    res.status(200).json(model.fetchVideoById(id))
}

const DELETE = (req, res) => {
    const {id} = req.params
    const deleteVideo = model.deleteVideo(id)
    if(deleteVideo){
        res.redirect('/admin')
    } else {
        res.status(400).json({message: "Somthing wrong"}) 
    }
}

const UPDATE = (req, res) => {
    const {id} = req.params
    const updateVideo = model.updateVideo(req.body.title, id)
    if(updateVideo){
        res.redirect('/admin')
    } else {
        res.status(400).json({message: "Somthing wrong"}) 
    }  
}

const GET_USER_VIDEOS = (req, res) => {
    const {id} = req.params
    res.status(200).json(model.fetchUserVideos(id))
}

const GET_ALL_VIDEOS = (req, res) => {
    res.status(200).json(model.fetchAllVideos())
}

module.exports = { UPLOAD, GET_VIDEO_BY_USERID, GET_VIDEO_BY_ID, GET_USER_VIDEOS, GET_ALL_VIDEOS, DELETE, UPDATE}