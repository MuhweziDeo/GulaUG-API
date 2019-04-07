require('dotenv').config();

const { sequelize  }  = require('./database/models/index') ;
const userRouter = require('./routes/user/');
const app = require('./app');
const express = require('express');

app.use(express.json());
app.use('/auth', userRouter);

sequelize.authenticate().then(console.log(
    'connected to DB'
)).catch((err)=>{
    console.log(err)
})
const port = process.env.PORT || 5000

app.listen(port,() => {
    console.log(`Running on ${port}`);
});
