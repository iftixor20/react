const path = require('path')
const fs = require('fs')

const insertVideo = (user, videoName, userId) => {
    let videos = fs.readFileSync(path.join(process.cwd(), 'src', 'database', 'videos.json'), 'utf-8')
    videos = videos ? JSON.parse(videos) : []
    const id = videos.length ? videos[videos.length - 1].id + 1 : 1
    const newVideo = {
        id,
        userId,
        ...user,
        videoName
    }
    videos.push(newVideo)
    fs.writeFileSync(path.join(process.cwd(), 'src', 'database', 'videos.json'), JSON.stringify(videos, null, 4))
    return newVideo

}

const fetchVideoByUserId = userId => {
    let videos = fs.readFileSync(path.join(process.cwd(), 'src', 'database', 'videos.json'), 'utf-8')
    videos = videos ? JSON.parse(videos) : []
    const userVideo = videos.filter(e => e.userId == userId)
    return userVideo
}

const fetchVideoById = id => {
    let videos = fs.readFileSync(path.join(process.cwd(), 'src', 'database', 'videos.json'), 'utf-8')
    videos = videos ? JSON.parse(videos) : []
    const videoId = videos.find(e => e.id == id)
    return videoId
}

const deleteVideo = id => {
    let videos = fs.readFileSync(path.join(process.cwd(), 'src', 'database', 'videos.json'), 'utf-8')
    videos = videos ? JSON.parse(videos) : []
    const video = videos.find(e => e.id == id)
    const restVideos = videos.filter(e => e.id != id)
    try {
        fs.unlinkSync(path.join(process.cwd(), 'src', 'videos', video.videoName))
        fs.writeFileSync(path.join(process.cwd(), 'src', 'database', 'videos.json'), JSON.stringify(restVideos, null, 4))
        return restVideos  
    } catch (error) {
        console.error(error);
    }
    
}

const updateVideo = (title,id) =>{
    let videos = fs.readFileSync(path.join(process.cwd(), 'src', 'database', 'videos.json'), 'utf-8')
    videos = videos ? JSON.parse(videos) : []
    const video = videos.find(e => e.id == id)
    video.title = title
    fs.writeFileSync(path.join(process.cwd(), 'src', 'database', 'videos.json'), JSON.stringify(videos, null, 4))
    return video
}

const fetchUserVideos = id => {
    let videos = fs.readFileSync(path.join(process.cwd(), 'src', 'database', 'videos.json'), 'utf-8')
    videos = videos ? JSON.parse(videos) : []
    const userVideos = videos.filter(e => e.userId == id)
    if(userVideos){
        return userVideos
    }else return
}

const fetchAllVideos = () => {
    let videos = fs.readFileSync(path.join(process.cwd(), 'src', 'database', 'videos.json'), 'utf-8')
    videos = videos ? JSON.parse(videos) : []
    return videos
}

module.exports = {
    insertVideo,
    fetchVideoByUserId,
    deleteVideo,
    fetchVideoById,
    updateVideo,
    fetchUserVideos,
    fetchAllVideos
}