const express = require('express');
const Joi = require("joi");
const app = express();
//add a middle ware to convert your json bodycle
app.use(express.json());
const products=require('./DB/productlist');
const users=require('./DB/users');

//1.get all products
const productlists=products.product_details;
app.get('/api/products', (req, res) => {
     res.send(productlists);
  }) 

 //2.get products By Id
app.get('/api/products/:id', (req, res) => {
const product =  productlists.find(p => p.id === parseInt(req.params.id));
if(!product) return res.status(404).send(`product with id = ${req.params.id} is not found`);
res.send(product);
}) 
//3.get products By filterByQueryName
app.get('/api/products/id/name',(req,res) =>{
    console.log(req.query.filterByName);
    if(req.query.filterByName){
        const product =  productlists.find(p => p.name === req.query.filterByName);        
        if(!product) return res.status(404).send(`product with name = ${req.query.filterByName} is not found`);
        res.send(product);
    }
    res.send(product);
})
//3.creating a product
app.post("/api/products", (req,res) => {
    if(!req.body.name || req.body.name.length<4){
        res.status(400).send("Name is required and should contains 5 characters");
    }
   const schema = {
       name : Joi.string().min(4).max(50).required()
   };
  const result =  Joi.validate(req.body,schema);
   if(result.error )  return  res.status(400).send(result.error.details[0].message);
   const newProduct = {
       id: productlists.length + 1,
       name : req.body.name
   }
   productlists.push(newProduct);
   res.send(newProduct);
})
//4.updating the products
app.put("/api/products/:id", (req,res) => {
  
    const product =  productlists.find(p => p.id === parseInt(req.params.id));
   if(!product) return res.status(404).send(`product with id = ${req.params.id} is not found`);
 
   const schema = {
       name : Joi.string().min(3).required()
   };
  const result =  Joi.validate(req.body,schema);
   if(result.error )return res.status(400).send(result.error.details[0].message);
   product.name = req.body.name;
   res.send(product);
})
//5.Deleting products
app.delete("/api/products/:id", (req,res) => {
   const product =  productlists.find(p => p.id === parseInt(req.params.id));
   if(!product) return res.status(404).send(`product with id = ${req.params.id} is not found`);
 
   const indexOfProduct = productlists.indexOf(product);
   productlists.splice(indexOfProduct,1);

   res.send();
})
//USER DETAILS
//1.get all users
const userlists=users.user_lists;
app.get('/api/users', (req, res) => {
     res.send(userlists);
  }) 
  //2.get user by Id
  app.get('/api/users/:id', (req, res) => {
    const user =  userlists.find(p => p.id === parseInt(req.params.id));
    if(!user) return res.status(404).send(`user with id = ${req.params.id} is not found`);
    res.send(user);
    }) 
 //3.creating a user
app.post("/api/users", (req,res) => {
    if(!req.body.name || req.body.name.length<4){
        res.status(400).send("Name is required and should contains 5 characters");
    }
    const schema = {
        name : Joi.string().min(3).required()
    };
   const result =  Joi.validate(req.body,schema);
    console.log(result);
    if(result.error )  return  res.status(400).send(result.error.details[0].message);
    const newUser = {
        id: userlists.length + 1,
        name : req.body.name
    }
    userlists.push(newUser);
    res.send(newUser);
 })
 
//4.updating the users
app.put("/api/users/:id", (req,res) => {
  
    const user =  userlists.find(p => p.id === parseInt(req.params.id));
   if(!user) return res.status(404).send(`user with id = ${req.params.id} is not found`);
 
   const schema = {
       name : Joi.string().min(3).required()
   };
  const result =  Joi.validate(req.body,schema);
   if(result.error )return res.status(400).send(result.error.details[0].message);
   user.name = req.body.name;
   res.send(user);
})
//5.Deleting products
app.delete("/api/users/:id", (req,res) => {
   const user =  userlists.find(p => p.id === parseInt(req.params.id));
   if(!user) return res.status(404).send(`product with id = ${req.params.id} is not found`);
 
   const indexOfProduct = userlists.indexOf(user);
   userlists.splice(indexOfProduct,1);

   res.send();
})
const port = process.env.ECBPORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
