const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
// init app
app = express();

app.get('/', (req,res) => {

res.send(JSON.stringify("working"));
});

const port = process.env.PORT || 5000

app.listen(port,() =>{
    console.log(`Running on ${port}`);
}); 