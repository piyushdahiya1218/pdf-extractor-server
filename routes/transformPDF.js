const express = require("express");
const path = require("path");
var router = express.Router();
const url = require("url");
const fs = require("fs");
const root = require("rootrequire");
const { PdfDocument } = require("@ironsoftware/ironpdf");
const { FOLDER_NAME } = require("../utils/constants");

//add selected pages to hash set, then add page numbers which are not in the hash set into array
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

//remove pages that are in the array, we'll be left with a file that contains only pages that were selected, then save that file and return its path
const transformPDF = async (originalFilePath, fileName, pagesToBeRemoved) => {
  const originalFile = await PdfDocument.fromFile(originalFilePath);
  originalFile.removePage(pagesToBeRemoved);
  const modifiedFolderPath = path.join(root, FOLDER_NAME.MODIFIED_FILES);
  if (!fs.existsSync(modifiedFolderPath)) {
    fs.mkdirSync(modifiedFolderPath);
  }
  const modifiedFilePath = modifiedFolderPath.concat("/", fileName);
  await originalFile.saveAs(modifiedFilePath);
  return modifiedFilePath;
};

//responds with the path of transformed file
router.post("/", function (req, res) {
  const originalFolderPath = path.join(root, FOLDER_NAME.ORIGINAL_FILES);
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
