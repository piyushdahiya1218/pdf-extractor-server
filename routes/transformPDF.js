const express = require("express");
const path = require("path");
var router = express.Router();
const url = require("url");
const fs = require("fs");
const root = require("rootrequire");
const { PdfDocument } = require("@ironsoftware/ironpdf");

function convertJsonToArray(totalPages, checkboxStates){
  const pagesToBeRemoved = [];
  const checkboxStatesSet = new Set([]);
  checkboxStates.forEach(state => {
    if(state!==null && state.isChecked){
      checkboxStatesSet.add(state.pageNumber-1);
    }
  });
  for(var i=0;i<totalPages;i++){
    if(!checkboxStatesSet.has(i)){
      pagesToBeRemoved.push(i);
    }
  }
  return pagesToBeRemoved;
}

const transformPDF = async (originalFilePath, fileName, pagesToBeRemoved) => {
  const originalFile = await PdfDocument.fromFile(originalFilePath);
  originalFile.removePage(pagesToBeRemoved);
  const modifiedFolderPath = path.join(root, "public", "modified-files");
  if (!fs.existsSync(modifiedFolderPath)) {
    fs.mkdirSync(modifiedFolderPath);
  }
  const modifiedFilePath = modifiedFolderPath.concat("/", fileName);
  await originalFile.saveAs(modifiedFilePath);
  return modifiedFilePath;
};

router.post("/", function (req, res) {
  const originalFolderPath = path.join(root, "public", "original-files");
  const originalFilePath = originalFolderPath.concat("/", req.body.fileName);
  const pagesToBeRemoved = convertJsonToArray(req.body.totalPages, req.body.checkboxStates)
  transformPDF(originalFilePath, req.body.fileName, pagesToBeRemoved)
    .then((modifiedFilePath) => {
      res.status(200).send(modifiedFilePath);
    })
    .catch((error) => {
      console.error(error);
    });
});

module.exports = router;
