const fs = require('fs')
const path = require('path')
const jwt = require('../lib/jwt')

const checkToken = (req, res, next) => {
    let users = fs.readFileSync(path.join(process.cwd(), 'src', 'database', 'users.json'), 'utf-8')
    users = users ? JSON.parse(users) : []
    try {
        const checkUser = users.find(check => check.id == jwt.verify(req.cookies.userId))
        if(checkUser){
            next()
        }else{
            res.redirect('/login')
        }   
    } catch (error) {
        res.redirect('/login')
    }
    
}

module.exports = checkToken