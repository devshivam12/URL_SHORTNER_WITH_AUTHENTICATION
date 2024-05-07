const express = require("express")
const router = express.Router()
const { handleGetshortUrl, findById, handleGetAnalytics } = require("../controller/url.controller")

router.post("/", handleGetshortUrl)
router.get("/:shortId", findById)
router.get("/analytics/:shortId", handleGetAnalytics)

module.exports = router
