
require('dotenv').config();
import express from 'express';
const cors = require ('cors');
import { sequelize  }  from './database/models/index';
import userRouter from './routes/user/';
import app from './app';
import profileCreateHandler from './helpers/createProfilehandler';
import errorHandler from './middleware/errorHandler';
import morgan from 'morgan';
const Sentry = require('@sentry/node');
import adminRouter from "./routes/admin";
import StartupHelper from './helpers/StartupHelper';

Sentry.init({ dsn: 'https://f50b7454243c41169b92613e5f50d4b3@sentry.io/1473626' });


app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.errorHandler());
app.use(morgan("combined"));
app.use(cors());
app.use(express.json());
app.use('/auth', userRouter);
app.use('/admin', adminRouter);
StartupHelper.createSuperAdmin();
app.on('user_created', (data) => { profileCreateHandler(data.username) } );
sequelize.authenticate().then(
    console.log(
    'connected to DB')
    )
    .catch((err)=>{
    console.log(err)
})
app.use('*',errorHandler);

const port = process.env.PORT || 5000
app.listen(port,() => {
    console.log(`Running on ${port}`);
});
