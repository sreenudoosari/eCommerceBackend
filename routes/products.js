const express = require('express');
const router =express.Router();
const Joi = require("joi");

const products=require('../database/productlist');


//1.get all products
const productlists=products.product_details;
router.get('/products', (req, res) => {
     res.send(productlists);
  }) 

 //2.get products of Men
router.get('/products/men', (req, res) => {
      res.send(productlists.men);
})
 //3.get products of Men of clothing
router.get('/products/men/clothing', (req, res) => {
    res.send(productlists.men.clothing);
})
 //4.get products of Men of clothing by Id
router.get('/products/men/clothing/:id', (req, res) => {
    const product =  productlists.men.clothing.find(p => p.id === parseInt(req.params.id));
    if(!product) return res.status(404).send(`product with id = ${req.params.id} is not found`);
    res.send(product);
    }) 
 
//5.get products by passing queryparams
router.get('/products/men/clothing',(req,res) =>{
    console.log(req.query.filterByName);
    if(req.query.filterByName){
        const product =  productlists.men.clothing.find(p => p.name === req.query.filterByName);        
        if(!product) return res.status(404).send(`product with name = ${req.query.filterByName} is not found`);
        res.send(product);
    }
    res.send(product);
})
//6.creating a men product By MaxId
router.post('/products/men/clothing', (req,res) => {
    if(!req.body.name || req.body.name.length<4){
        res.status(400).send("Name is required and should contains 5 characters");
    }
   const schema = {
       name : Joi.string().min(4).max(50).required()
   };
  const result =  Joi.validate(req.body,schema);
   if(result.error )  return  res.status(400).send(result.error.details[0].message);
   const product =productlists.men.clothing.reduce((accu,curr)=>({id : curr.id}))
   const  maxId=product.id + 1;
   const newProduct = {
       id: maxId,
       name : req.body.name
   }
   productlists.men.clothing.push(newProduct);
   res.send(newProduct);
})
//7.updating men products
router.put('/products/men/clothing/:id', (req,res) => {
  
    const product =  productlists.men.clothing.find(p => p.id === parseInt(req.params.id));
   if(!product) return res.status(404).send(`product with id = ${req.params.id} is not found`);
 
   const schema = {
       name : Joi.string().min(3).required()
   };
  const result =  Joi.validate(req.body,schema);
   if(result.error )return res.status(400).send(result.error.details[0].message);
   product.name = req.body.name;
   res.send(product);
})
//8.Deleting men products
router.delete('/products/men/clothing/:id', (req,res) => {
   const product =  productlists.men.clothing.find(p => p.id === parseInt(req.params.id));
   if(!product) return res.status(404).send(`product with id = ${req.params.id} is not found`);
 
   const indexOfProduct = productlists.men.clothing.indexOf(product);
   productlists.men.clothing.splice(indexOfProduct,1);
   res.status(200).send(`deleted the product`);
   res.send();
})
//9.get products of Women
router.get('/products/women', (req, res) => {
    res.send(productlists.women);
    }) 
//10.get products of women clothing
router.get('/products/women/clothing', (req, res) => {
    res.send(productlists.women.clothing);
})
 //11.get products of women clothing by Id
router.get('/products/women/clothing/:id', (req, res) => {
    const product =  productlists.women.clothing.find(p => p.id === parseInt(req.params.id));
    if(!product) return res.status(404).send(`product with id = ${req.params.id} is not found`);
    res.send(product);
    })
//12.get products by passing queryparams
router.get('/products/women/clothing',(req,res) =>{
    console.log(req.query.filterByName);
    if(req.query.filterByName){
        const product =  productlists.women.clothing.find(p => p.name === req.query.filterByName);        
        if(!product) return res.status(404).send(`product with name = ${req.query.filterByName} is not found`);
        res.send(product);
    }
    res.send(product);
})

//13.creating a women product by MaxId
router.post('/products/women/clothing', (req,res) => {
    if(!req.body.name || req.body.name.length<4){
        res.status(400).send("Name is required and should contains 5 characters");
    }
   const schema = {
       name : Joi.string().min(4).max(50).required()
   };
  const result =  Joi.validate(req.body,schema);
   if(result.error )  return  res.status(400).send(result.error.details[0].message);
   const product =productlists.women.clothing.reduce((accu,curr)=>({id : curr.id}))
   const  maxId=product.id + 1;
   const newProduct = {
       id: maxId,
       name : req.body.name
   }
   productlists.women.clothing.push(newProduct);
   res.send(newProduct);
})
//14.updating women products
router.put('/products/women/clothing/:id', (req,res) => {
  
    const product =  productlists.women.clothing.find(p => p.id === parseInt(req.params.id));
   if(!product) return res.status(404).send(`product with id = ${req.params.id} is not found`);
 
   const schema = {
       name : Joi.string().min(3).required()
   };
  const result =  Joi.validate(req.body,schema);
   if(result.error )return res.status(400).send(result.error.details[0].message);
   product.name = req.body.name;
   res.send(product);
})
//15.Deleting women products
router.delete('/products/women/clothing/:id', (req,res) => {
   const product =  productlists.women.clothing.find(p => p.id === parseInt(req.params.id));
   if(!product) return res.status(404).send(`product with id = ${req.params.id} is not found`);
 
   const indexOfProduct = productlists.women.clothing.indexOf(product);
   productlists.women.clothing.splice(indexOfProduct,1);
   res.status(200).send(`deleted the product`);
   res.send();
})
//16.get products of Kids
router.get('/products/kidsandbaby',(req,res) =>{
    res.send(productlists.kidsandbaby);
})

 //17.get products of kids clothing
 router.get('/products/kidsandbaby/clothing', (req, res) => {
    res.send(productlists.kidsandbaby.clothing);
})
 //18.get products of kids clothing by Id
router.get('/products/kidsandbaby/clothing/:id', (req, res) => {
    const product =  productlists.kidsandbaby.clothing.find(p => p.id === parseInt(req.params.id));
    if(!product) return res.status(404).send(`product with id = ${req.params.id} is not found`);
    res.send(product);
    })
//19.get products of kids by passing queryparams
router.get('/products/kidsandbaby/clothing',(req,res) =>{
    console.log(req.query.filterByName);
    if(req.query.filterByName){
        const product =  productlists.kidsandbaby.clothing.find(p => p.name === req.query.filterByName);        
        if(!product) return res.status(404).send(`product with name = ${req.query.filterByName} is not found`);
        res.send(product);
    }
    res.send(product);
})
//20.creating a kids product by MaxId
router.post('/products/kidsandbaby/clothing', (req,res) => {
    if(!req.body.name || req.body.name.length<4){
        res.status(400).send("Name is required and should contains 5 characters");
    }
   const schema = {
       name : Joi.string().min(4).max(50).required()
   };
  const result =  Joi.validate(req.body,schema);
   if(result.error )  return  res.status(400).send(result.error.details[0].message);
   const product =productlists.kidsandbaby.clothing.reduce((accu,curr)=>({id : curr.id}))
   const  maxId=product.id + 1;
   console.log(maxId);
   const newProduct = {
       id: maxId,
       name : req.body.name
   }
   productlists.kidsandbaby.clothing.push(newProduct);
   res.send(newProduct);
})
//21.updating kids products
router.put('/products/kidsandbaby/clothing/:id', (req,res) => {
  
    const product =  productlists.kidsandbaby.clothing.find(p => p.id === parseInt(req.params.id));
   if(!product) return res.status(404).send(`product with id = ${req.params.id} is not found`);
 
   const schema = {
       name : Joi.string().min(3).required()
   };
  const result =  Joi.validate(req.body,schema);
   if(result.error )return res.status(400).send(result.error.details[0].message);
   product.name = req.body.name;
   res.send(product);
})
//22.Deleting kids products
router.delete('/products/kidsandbaby/clothing/:id', (req,res) => {
   const product =  productlists.kidsandbaby.clothing.find(p => p.id === parseInt(req.params.id));
   if(!product) return res.status(404).send(`product with id = ${req.params.id} is not found`);
 
   const indexOfProduct = productlists.kidsandbaby.clothing.indexOf(product);
   productlists.kidsandbaby.clothing.splice(indexOfProduct,1);
   res.status(200).send(`deleted the product`);
   res.send();
})
module.exports=router;