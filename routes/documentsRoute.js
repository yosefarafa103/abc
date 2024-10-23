const express = require("express");
const {
  createDocument,
  findDocument,
  getDocumentsInSection,
} = require("./../Controller/documentController");
const DocumentModel = require("../models/documentsModel");
const {
  updateDocument,
  deleteDocument,
  getAllDocuments,
  deleteAllDocs,
} = require("../utils/mainFunctions");
const { getAllDocs } = require("../Controller/viewsController");
const router = express.Router();

router.post("/new", createDocument);
router
  .route("/")
  .get(getAllDocuments(DocumentModel))
  .delete(deleteAllDocs(DocumentModel));
router.patch("/:id", updateDocument(DocumentModel));
router.get("/:id", findDocument);
router.delete("/:id", deleteDocument(DocumentModel));
router.get("/get-documents-section/:id", getDocumentsInSection);
module.exports = router;
