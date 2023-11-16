const express = require("express");
var router = express.Router();

router.get("/", (req,res) => {
    res.status(200).sendFile(req.query.modifiedFilePath)
})


module.exports = router;