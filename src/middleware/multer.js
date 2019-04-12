const multer = require('multer');
const path = require('path');
const DataUri = require('datauri');
const dbUri = new DataUri;
const storage = multer.memoryStorage();
const multerUploads = multer({ storage }).single('image');
const dataUri = req => dbUri.format(path.extname(req.file.originalname).toString(), req.file.buffer);
module.exports = { multerUploads, dataUri };
