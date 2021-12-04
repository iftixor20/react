const homeRouter = require('./home')
const loginRouter = require('./login')
const signupRouter = require('./signup')
const uploadRouter = require('./upload')
const usersRouter = require('./users')
const adminRouter = require('./admin')
const videoRouter = require('./videos')
const updateRouter = require('./update')
const logoutRouter = require('./logout')

module.exports = [ homeRouter, loginRouter, signupRouter, uploadRouter, usersRouter, adminRouter, videoRouter, updateRouter, logoutRouter ] 