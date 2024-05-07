
const URL = require("../model/url.model")
const shortid = require("shortid")


const findById = async (req, res) => {

    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({ shortId }, {
        $push: {
            visitHistory: {
                timestamp: Date.now()
            }
        }
    })

    return res.redirect(entry.redirectUrl)
}


const handleGetshortUrl = async (req, res) => {
    const body = req.body;
    if (!body.url) return res.json({ error: "Url is required" })

    const shortId = shortid()

    await URL.create({
        shortId: shortId,
        redirectUrl: body.url,
        visitHistory: [],
        createdBy : req.user._id
    })
    return res.render("home", {
        id: shortId
    })
   
}

const handleGetAnalytics = async (req, res) => {
    const shortId = req.params.shortId;

    const result = await URL.findOne({ shortId })
    return res.json({
        totalClicks: result.visitHistory.length,
        analytics: result.visitHistory
    })
}

module.exports = {
    handleGetshortUrl,
    findById,
    handleGetAnalytics
}