const express = require('express');
//created a logger function
const logger=require('./utils/logger');
//Created a custom middlewares
const authenticate=require('./middlewares/authentication');
const logging=require('./middlewares/logging');


const app = express();
//Routers is added
const productrouter=require('./routes/products');
const usersrouter=require('./routes/users');
const homerouter=require('./routes/home');
//add a middle ware to convert your json bodycle
app.use(express.json());
app.use(logger);
app.use(authenticate);
app.use(logging);

app.use('/api/products',productrouter);
app.use('/api/users',usersrouter);
app.use('/api/home',homerouter);
//views folder
app.set('view engine', 'pug');
app.set('views','./views');

    app.get('/home',(req,res) =>{
       res.render('index',{appTitle:"Ecommerce BackEnd Project" , message:"Welcome to ECommerce Web Site"});
    })

const port = process.env.ECBPORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
