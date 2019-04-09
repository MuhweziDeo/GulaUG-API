require('dotenv').config();
const express = require('express');
const { sequelize  }  = require('./database/models/index') ;
const userRouter = require('./routes/user/');
const app = require('./app');
const profileCreateHandler = require('./helpers/createProfilehandler');


app.use(express.json());
app.use('/auth', userRouter);
app.on('user_created', (data) => { profileCreateHandler(data.username) } );
sequelize.authenticate().then(console.log(
    'connected to DB'
)).catch((err)=>{
    console.log(err)
})
const port = process.env.PORT || 5000

app.listen(port,() => {
    console.log(`Running on ${port}`);
});
