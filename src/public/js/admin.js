async function renderVideos(){
    const videos = await request('/api/video', 'GET')
    tbody.innerHTML = null
    let num = 0 
    for (const video of videos) {
        const tr = document.createElement('tr')
        tr.innerHTML = `
        <td>${++num}</td> 
                    <td>
                        
                        <video width="250" height="150" controls="">
                            <source src="/videos/${video.videoName}" type="video/mp4">
                            <source src="movie.ogg" type="video/ogg">
                          Your browser does not support the video tag.
                          </video>
                    </td>
                    <td>${video.title}</td>
                    <td class="action">
                        <a href="/api/video/delete/${video.id}" class="btn btn-danger">
                            <i class="material-icons">delete</i>  
                        </a>
                        <a href="/update/${video.id}" class="btn btn-success">
                            <i class="material-icons">edit</i> 
                        </a>
                    </td>
        `
        tbody.appendChild(tr)
    }
}

renderVideos()