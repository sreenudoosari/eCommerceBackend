const express = require('express');
const bodyparser=require('body-parser');
//Created a custom middlewares
const authenticate=require('./middlewares/authentication');
const logging=require('./middlewares/logging');
const logger=require('./utils/logger');
//configuration
const config=require('config');
const morgan=require('morgan');
const mongoose=require('mongoose');


const app = express();
//Routers is added
const productrouter=require('./routes/products');
const usersrouter=require('./routes/users');
const homerouter=require('./routes/home');

//Connecting to th Database
mongoose.connect("mongodb://localhost/ecommercebackend")
        .then(() => console.log("Succefully connected to mongodb...."))
        .catch((err)=> console.log("Failed to connect to db....", err));


//add a middle ware to convert your json bodycle
app.use(express.json());
app.use(authenticate);
app.use(bodyparser.json());

//configuration the files
app.use('/api',productrouter);
app.use('/api/user',usersrouter);
app.use('/api/home',homerouter);

//views folder
app.set('view engine', 'pug');
app.set('views','./views');
app.use(express.static('public'));

//third party middlewares
app.use(morgan("tiny"));

 app.get('/home',(req,res) =>{
       res.render('index',{appTitle:"Ecommerce BackEnd Project" , message:"Welcome to ECommerce Web Site"});
    })
//posting data using index.pug
app.post("/",function(req,res){
    console.log(req.body);
    res.send("Received the request");
})
//to change enivorment set NODE_ENV=production or development or stagging or it takes default.json
console.log("app name: " ,config.get("app.name"));
console.log("mail server host:" ,config.get("mail.host"));

const port = process.env.ECBPORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
