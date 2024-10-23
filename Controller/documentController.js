const DocumentsModel = require("../models/documentsModel");
const Err = require("../err");
const documentModel = require("../models/documentsModel");
const SectionsModel = require("../models/sectionsModel");
const { getDocument } = require("../utils/mainFunctions");
const createDocument = async (req, res, next) => {
  try {
    const newDocument = await DocumentsModel.create(req.body);
    // console.log(newDocument);
    res.status(201).json(newDocument);
  } catch (err) {
    return next(err);
  }
};

const findDocument = getDocument(documentModel);

const getDocumentsInSection = async (req, res, next) => {
  try {
    const docs = await documentModel.find({ category: req.params.id });
    res.status(200).json(docs);
  } catch (err) {
    return next(err);
  }
};
const staticsSections = async (req, res, next) => {
  const stats2 = await SectionsModel.find({}, { name: 1 });

  const arr = stats2.map(async (obj) => {
    return await DocumentsModel.find({ category: obj._id });
    // return arr.push();
  });

  res.status(200).json({
    sectionsLength: stats2.length,
    sections: stats2,
    docs: await Promise.all(arr),
  });
};

module.exports = {
  createDocument,
  findDocument,
  getDocumentsInSection,
  staticsSections,
};
