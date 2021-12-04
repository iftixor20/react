const searchInput = document.querySelector('.search-input')
const searchForm = document.querySelector('.search-form')
const videoTitle = document.querySelector('.video-title')
const profileImgLink = document.querySelector('.profile-img-link')

async function renderUsers(){
  const users = await request('/api/users', 'GET')
  const ul = document.createElement('ul')
  ul.setAttribute('class', 'sidebar__list')
  let li = ''
  for (const user of users) {
    li += `
          <li data-id="${user.id}" class="sidebar__item">
              <div class="avatar_box">
                <img src="/profile/${user.imgName}" alt="profile" class="avatar">
              </div>
              <h3 class="sidebar__username">${user.username}</h3>
          </li>
    ` 
  }
  ul.innerHTML = li
  sidebar.appendChild(ul)

  const sidebarItems = document.querySelectorAll('.sidebar__item')
  sidebarItems.forEach( user => {
      user.addEventListener('click', e => {
         const userId = user.dataset.id - 0
         videoContainer.innerHTML = null
         renderVideo(userId)
         sidebarItems.forEach( user => {
           user.classList.remove('active')
         })
         user.classList.add('active')
         
      })
  });
  
}

async function renderVideo(userId){
  const videos = await request('/api/videos/'+userId, 'GET')
  const users = await request('/api/users', 'GET')
  const user = users.find(check => check.id == userId)
  videoTitle.textContent = `"${user.username}" videos:`
  const ul = document.createElement('ul')
  ul.setAttribute('class', 'videos__list')
  let li = ''
  for (const video of videos) {
    li += `
    <li class="video">
    <video width="320" height="200" controls>
      <source src="/videos/${video.videoName}" type="video/mp4">
      <source src="movie.ogg" type="video/ogg">
    Your browser does not support the video tag.
    </video>
    <div class="video__details">
      <div class="author">
        <img src="/profile/${user.imgName}" alt="" />
      </div>
      <div class="title">
        <h3>
          ${video.title}
        </h3>
        <div class="subtitle">
          <div>
            <p>${user.username}</p>
            <time>2021/7/1 | 18:00</time>
          </div>
          <a href="/videos/${video.videoName}" download>
            <i class="download material-icons">file_download</i>
          </a>
        </div>
      </div>
    </div>
  </li> 
    ` 
  }
  ul.innerHTML = li
  videoContainer.appendChild(ul)
}

searchInput.addEventListener('input', async () => {
  searchResults.innerHTML = null
  const videos = await request('/api/videos', 'GET')
  let ul = document.createElement('ul')
  ul.setAttribute('class', 'search-list')
  if(searchInput.value.length){
    const filteredVideos = videos.filter(check => check.title.toLowerCase().includes(searchInput.value))
    let li = ''
    for (const video of filteredVideos) {
        li += `<li class="search-item">${video.title}</li>`
    }
    ul.innerHTML = li
    searchResults.appendChild(ul)  
    const searchItems = document.querySelectorAll('.search-item')
    searchItems.forEach( searchItem => {
      searchItem.addEventListener('click', () => {
        searchInput.value = searchItem.textContent
        searchResults.innerHTML = null
       })
    } )
    
  }else return
  
})

searchForm.addEventListener('submit', async e => {
  e.preventDefault()
  videoTitle.textContent = `"${searchInput.value}" search results:`
  searchResults.innerHTML = null
  videoContainer.innerHTML = null
  const videos = await request('/api/videos', 'GET')
  const users = await request('/api/users', 'GET')
  const filteredVideos = videos.filter(check => check.title.toLowerCase().includes(searchInput.value.toLowerCase()))
  const ul = document.createElement('ul')
  ul.setAttribute('class', 'videos__list')
  let li = ''
  for (const video of filteredVideos) {
    const user = users.find(check => check.id == video.userId) 
    li += `
    <li class="video">
    <video width="320" height="200" controls>
      <source src="/videos/${video.videoName}" type="video/mp4">
      <source src="movie.ogg" type="video/ogg">
    Your browser does not support the video tag.
    </video>
    <div class="video__details">
      <div class="author">
        <img src="/profile/${user.imgName}" alt="" />
      </div>
      <div class="title">
        <h3>
          ${video.title}
        </h3>
        <div class="subtitle">
          <div>
            <p>${user.username}</p>
            <time>2021/7/1 | 18:00</time>
          </div>
          <a href="/videos/${video.videoName}" download>
            <i class="download material-icons">file_download</i>
          </a>
        </div>
      </div>
    </div>
  </li> 
    `
  }
  ul.innerHTML = li
  videoContainer.appendChild(ul)
  e.target.reset();
})

async function profileImage(){
  const user = await request('/api/user', 'GET')
  if(user){
    const image = user[0].imgName
    profileImgLink.innerHTML = null
    profileImgLink.classList.add('admin-link')
    profileImgLink.innerHTML = `
    <img class="profile-image" src="/profile/${image}" alt="avatar">
    `
  }
    
  
}

async function renderAllVideos(){
  const videos = await request('/api/videos', 'GET')
  const users = await request('/api/users', 'GET')
  const ul = document.createElement('ul')
  ul.setAttribute('class', 'videos__list')
  let li = ''
  for (const video of videos) {
    const user = users.find(check => check.id == video.userId) 
    li += `
    <li class="video">
    <video width="320" height="200" controls>
      <source src="/videos/${video.videoName}" type="video/mp4">
      <source src="movie.ogg" type="video/ogg">
    Your browser does not support the video tag.
    </video>
    <div class="video__details">
      <div class="author">
        <img src="/profile/${user.imgName}" alt="" />
      </div>
      <div class="title">
        <h3>
          ${video.title}
        </h3>
        <div class="subtitle">
          <div>
            <p>${user.username}</p>
            <time>2021/7/1 | 18:00</time>
          </div>
          <a href="/videos/${video.videoName}" download>
            <i class="download material-icons">file_download</i>
          </a>
        </div>
      </div>
    </div>
  </li> 
    ` 
  }
  ul.innerHTML = li
  videoContainer.appendChild(ul)
}


profileImage()
renderUsers()
renderAllVideos()