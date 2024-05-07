const User = require('../model/user.model')
const {v4 : uuidv4} = require("uuid")
const {setUser} = require("../service/auth")

async function handleUserSignup(req, res){
    const {name, email, password} = req.body

    await User.create({
        name, email, password
    })
    return res.render("home")
}

async function handleUserLogin(req, res){
    const { email, password} = req.body

    const user = await User.findOne({
        email, password
    })

    if(!user) return res.render("login", {
        error : "invalid email or password"
    })  

   
   const token = setUser( user)
    res.cookie("uid", token)
    return res.redirect("/")
}
module.exports = {
    handleUserSignup,
    handleUserLogin
}