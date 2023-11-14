const express = require("express");
const path = require("path");
var router = express.Router();
const url = require("url");
const fs = require("fs");
const root = require("rootrequire");
const { PdfDocument } = require("@ironsoftware/ironpdf");
const {checkboxStates} = require("./getNewPDF");

const transformPDF = async (originalFilePath, fileName) => {
  const originalFile = await PdfDocument.fromFile(originalFilePath);
  originalFile.removePage([0, 1]);
  const modifiedFolderPath = path.join(root, "public", "modified-files");
  if (!fs.existsSync(modifiedFolderPath)) {
    fs.mkdirSync(modifiedFolderPath);
  }
  const modifiedFilePath = modifiedFolderPath.concat("/", fileName);
  await originalFile.saveAs(modifiedFilePath);
  return modifiedFilePath;
};

router.get("/", (req, res) => {
    console.log(checkboxStates)

  const originalFolderPath = path.join(root, "public", "original-files");
  const originalFilePath = originalFolderPath.concat("/", req.query.fileName);
  transformPDF(originalFilePath, req.query.fileName)
    .then((modifiedFilePath) => {
        res.status(200).send(modifiedFilePath);
    })
    .catch((error) => {
      console.error(error);
    });
});

module.exports = router;
