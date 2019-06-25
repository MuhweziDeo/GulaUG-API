const  express = require('express')
const dotenv = require('dotenv');
dotenv.config();
// init app
app = express();

app.get('/', (req,res) => {
res.status(200).send({
  message: "welcome to Gula Uganda" });
});



module.exports = app;
