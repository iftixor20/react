const path = require('path')

const GET = (req, res) => {
    res.sendFile(path.join(process.cwd(), 'src', 'views', 'signup.html'))
}

module.exports = { GET }