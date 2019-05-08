require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { sequelize  }  = require('./database/models/index') ;
const userRouter = require('./routes/user/');
const app = require('./app');
const profileCreateHandler = require('./helpers/createProfilehandler');
const { multerUploads, dataUri } = require('./middleware/multer');
const { uploader, cloudinaryConfig } = require('./config/cloudinaryConfig');

app.use('*',cloudinaryConfig);
app.use(express.json());
app.use(cors());
app.use('/auth', userRouter);

app.on('user_created', (data) => { profileCreateHandler(data.username) } );
sequelize.authenticate().then(console.log(
    'connected to DB'
)).catch((err)=>{
    console.log(err)
})
const port = process.env.PORT || 5000

app.post('/upload', multerUploads, async (req, res) => {
    try {
       if(req.file){
           const file = dataUri(req).content
           console.log(file)
            const result = await uploader.upload(file)
            res.status(200).send({
                success:true,
                data:result
            })
       } 
    } catch (error) {
        console.log(error)
        res.status(500).send(error);
    }
});
app.listen(port,() => {
    console.log(`Running on ${port}`);
});
