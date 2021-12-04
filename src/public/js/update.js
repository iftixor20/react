const container = document.querySelector('.upload__container')
const url = window.location.href.split('/')
const id = url[url.length-1]

async function renderForm() {
    
    const response = await request('/api/video/'+id, 'GET')
    const form = document.createElement('form')
    form.setAttribute('class', 'upload__form')
    form.setAttribute('action', '/api/video/'+id)
    form.setAttribute('method', 'POST')
    form.innerHTML = `
    <h1 class="upload__title">Update</h1>
    <div class="upload-wrapper">
        <video width="250" height="150" controls="">
            <source src="/videos/${response.videoName}" type="video/mp4">
            <source src="movie.ogg" type="video/ogg">
          Your browser does not support the video tag.
        </video>
    </div>
    <label class="title-label">
        <p>Title:</p>
        <input name="title" type="text" value="${response.title}" required autocomplete="off">
    </label>
        <button type="submit" class="upload_button">Update</button>
    `
    container.appendChild(form)
}

renderForm()