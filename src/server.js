require('dotenv').config();
import express from 'express';
const cors = require ('cors');
import morgan from 'morgan';
const Sentry = require('@sentry/node');
import {resolve} from 'path';
import { sequelize  }  from './database/models/index';
import userRouter from './routes/user/';
import app from './app';
import profileCreateHandler from './helpers/createProfilehandler';
import errorHandler from './middleware/errorHandler';
import adminRouter from "./routes/admin";
import StartupHelper from './helpers/StartupHelper';
import { multerUploads, dataUri } from './helpers/multer';
import {cloudinaryConfig, uploader} from './helpers/cloudinary';
import tokenRouter from './routes/token';
import categoryRouter from './routes/category';
import productRouter from './routes/product';
import specificationsRouter from './routes/specifications';

const apiPrefix = '/api/v1';
Sentry.init({ dsn: 'https://f50b7454243c41169b92613e5f50d4b3@sentry.io/1473626' });
app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.errorHandler());
app.use(morgan("combined"));
app.use(cors());
app.use('*', cloudinaryConfig);
app.use(express.json());
app.use(apiPrefix, userRouter);
app.use(`${apiPrefix}/admin`, adminRouter);
app.use(`${apiPrefix}/token`, tokenRouter);
app.use(`${apiPrefix}`, categoryRouter);
app.use(`${apiPrefix}/products`, productRouter);
app.use(`${apiPrefix}/specifications`, specificationsRouter);
StartupHelper.createSuperAdmin();
app.on('user_created', (data) => { profileCreateHandler(data.username) } );
app.use(express.static(resolve(__dirname, 'src/public')));
app.post('/upload', multerUploads, async(req, res) => {
    if(req.file) {
        const file = dataUri(req).content;
        const result = await uploader.upload(file)
        return res.json({
            result
      });
    }
    return res.json({
        message: 'This endpoint is used for file uploads only'
    });
  });
sequelize.authenticate().then(
    console.log(
    'connected to DB')
    )
    .catch((err)=>{
    console.log(err)
});
app.use('*',errorHandler);

const port = process.env.PORT || 5000
app.listen(port,() => {
    console.log(`Running on ${port}`);
});
