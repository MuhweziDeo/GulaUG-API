import multer from 'multer';
import { dataUri } from '../helpers/multer';
import { uploader} from '../helpers/cloudinary';

class ImageHandler {
    static async uploadImage(req, res, next) {
        try {
            if (req.file) {
                const file = dataUri(req).content;
                const result = await uploader.upload(file)
                res.json(result);
                req.image = result.url
                next();
            }
            next();
        } catch (error) {
            if(error instanceof multer.MulterError) {
                req.uploadError = {
                    error,
                    'message': 'Image upload was unsuccessful'
                }
                return next();
            }
            return res.status(500).send({
                error,
                'message': 'Something went wrong'
            });
        }
    }
}

export default ImageHandler;
