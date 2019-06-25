import multer from 'multer';
import Datauri from 'datauri';
import path from 'path';

const storage = multer.memoryStorage();
const dUri = new Datauri();

export const dataUri = req => dUri.format(path.extname(req.file.originalname).toString(), req.file.buffer);

export const multerUploads = multer({ storage }).single('image');

