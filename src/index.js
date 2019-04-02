const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
// init app
app = express();

app.get('/', (req,res) => {

res.status(200).send("find me here");
});

module.exports=app;