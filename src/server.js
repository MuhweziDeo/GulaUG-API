const app = require('./app');
const db = require('./database/config/config');

db.authenticate().then(() => {
    console.log('connected to DB')
}).catch((err) =>{
    console.log(err)
})

const port = process.env.PORT || 5000

app.listen(port,() => {
    console.log(`Running on ${port}`);
});
