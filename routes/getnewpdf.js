var express = require("express");
const multer = require("multer");
var router = express.Router();

// const upload = multer({ dest: 'uploads/' });

// router.get("/", function (req, res, next) {
//   res.send("respond with modified pdf file");
// });

// router.post("/", upload.single('pdf'), (req,res)=>{
//   const file=req.file;
//   if(!file){
//     return res.status(400).send('No PDF file uploaded.');
//   }
//   console.log(file.filename)
//   res.status(200).send('PDF file uploaded successfully.')
// })

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

var upload = multer({ storage: storage }).single("file");

router.post("/", function (req, res) {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err);
    } else if (err) {
      return res.status(500).json(err);
    }
    console.log("success")
    return res.status(200).send(req.file);
  });
});

// router.post("/", function (req, res) {
//   console.log("backned apio called");
//   if (req.files == null) {
//     console.log("foo present");
//   }
// });

module.exports = router;
