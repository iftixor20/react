const path = require('path')

const GET = (req, res) => {
    res.sendFile(path.join(process.cwd(), 'src', 'views', 'admin.html'))
}

module.exports = { GET }