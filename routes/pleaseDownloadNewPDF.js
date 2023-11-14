const express = require("express");
var router = express.Router();

router.get("/", (req,res) => {
    res.sendFile(req.query.modifiedFilePath)
})


module.exports = router;