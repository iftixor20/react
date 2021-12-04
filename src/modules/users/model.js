const path = require('path')
const fs = require('fs')

const insertUser = (user, imgName) => {
    let users = fs.readFileSync(path.join(process.cwd(), 'src', 'database', 'users.json'), 'utf-8')
    users = users ? JSON.parse(users) : []
    const checkUser = users.find(check => check.username == user.username)
    const id = users.length ? users[users.length - 1].id + 1 : 1
    if(!checkUser){
        const newUser = {id, ...user, imgName}
        users.push(newUser)
        fs.writeFileSync(path.join(process.cwd(), 'src', 'database', 'users.json'), JSON.stringify(users, null, 4))
        delete newUser.password
        return newUser
    }else return
}

const loginUser = user => {
    
    let users = fs.readFileSync(path.join(process.cwd(), 'src', 'database', 'users.json'), 'utf-8')
    users = users ? JSON.parse(users) : []
    const checkUser = users.find(check => check.username == user.username && check.password == user.password)
    return checkUser
}

const fetchAll = () => {
    let users = fs.readFileSync(path.join(process.cwd(), 'src', 'database', 'users.json'), 'utf-8')
    users = users ? JSON.parse(users) : []
    return users
}

const fetchUserByUserId = id => {
    let users = fs.readFileSync(path.join(process.cwd(), 'src', 'database', 'users.json'), 'utf-8')
    users = users ? JSON.parse(users) : []
    const user = users.filter(e => e.id == id)
    return user
}


module.exports = { insertUser, loginUser, fetchAll, fetchUserByUserId }
