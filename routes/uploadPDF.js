var express = require("express");
const multer = require("multer");
var router = express.Router();
const fs = require('fs');
const root = require('rootrequire');
const path = require('path');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const originalFileFolder = path.join(root, "public", "original-files");
    if(!fs.existsSync(originalFileFolder)){
      fs.mkdirSync(originalFileFolder)
    }
    cb(null, originalFileFolder);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

var upload = multer({ storage: storage }).single("file");

router.post("/", function (req, res) {
  upload(req, res, function (err) {
    const checkboxStates = req.body.checkboxStates
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err);
    } else if (err) {
      return res.status(500).json(err);
    }
    return res.status(200).send(req.file);
  });
});

module.exports = router;
