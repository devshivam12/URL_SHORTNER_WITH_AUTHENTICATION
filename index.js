const express = require("express")
const mongoose = require("mongoose")
const path = require("path")
const { restrictLogginUserOnly, checkAuth } = require("./middleware/auth")
const URL = require("./model/url.model")
const urlRouter = require("./routes/url.route")
const staticUrl = require("./routes/staticurl")
const userRoute = require("./routes/user.router")
const cookieParser = require("cookie-parser")

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.use("/url", restrictLogginUserOnly, urlRouter)
app.use('/user', userRoute)
app.use("/", checkAuth, staticUrl)


app.set("view engine", "ejs")
app.set('views', path.resolve('./views'))
// app.get('/test', async (req, res) => {
//     const allUrl = await URL.find({})
//     return res.render('home', {
//         urls: allUrl
//     })
// })

mongoose.connect("mongodb://127.0.0.1:27017/short-url")
    .then(() => {
        console.log("Mongodb connected")
        app.listen(8000, () => {
            console.log("Server connected")
        })
    })
    .catch(() => {
        console.log("Pelase check the connection")
    })