const express = require("express");
var router = express.Router();

//response is file whose path is given in request and is saved in server
router.get("/", (req,res) => {
    res.status(200).sendFile(req.query.modifiedFilePath)
})


module.exports = router;