var express = require("express");
const multer = require("multer");
var router = express.Router();
const fs = require('fs');
const root = require('rootrequire');
const path = require('path');
const { FOLDER_NAME } = require("../utils/constants");

//set file name and destination location of the file that has to be uploaded
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const originalFileFolder = path.join(root, FOLDER_NAME.ORIGINAL_FILES);
    //create folder if it doesn't exists
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

//upload original file
router.post("/", function (req, res) {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err);
    } else if (err) {
      return res.status(500).json(err);
    }
    return res.status(200).send(req.file);
  });
});

module.exports = router;
