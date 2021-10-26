const express = require("express")
const router = express.Router()

router.use("/task", require("./task.js"))
router.use("/list", require("./list.js"))

module.exports = router
