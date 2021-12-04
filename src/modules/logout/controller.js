const { reduceRight } = require("..")

const LOGOUT = (req, res) => {
    res.clearCookie('userId')
    res.redirect('/')
}

module.exports = { LOGOUT }