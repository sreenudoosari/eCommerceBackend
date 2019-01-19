const express = require('express');
const mongoose=require('mongoose');
const router =express.Router();
const Joi = require("joi");

const Product=require('../database/productlist');

//Reading the products

router.get('/products', (req,res) => {
    const products=Product.find()
           .then(result => {
               console.log(result);
               res.send(result);
         })
           .catch(err => console.log(err));
});
router.get('/products/:id',(req,res) =>{
    const id= req.params.id;
    Product.findById(id)
          .then(result => {
              console.log(result);
              res.send(result);
    })
          .catch(err => console.log(err));
})
router.get('/products/',(req,res) =>{
    const products=Product.find({name : /.*shirt*/i})
           .then(result => {
               console.log(result);
               res.send(result);
         })
           .catch(err => console.log(err));
});
//creating a products
router.post('/products', (req,res) => {
    if(!req.body.name || req.body.name.length<4){
        res.status(400).send("Name is required and should contains 5 characters");
    }
   const schema = {
       name : Joi.string().min(4).max(50).required()
   };
  const result =  Joi.validate(req.body,schema);
   if(result.error )  return  res.status(400).send(result.error.details[0].message);
     const product=new Product({
       _id: new mongoose.Types.ObjectId(),
        name: req.body.name
     });
    product.save()
           .then(result =>{
            console.log("saved product is:",result);   
           })
           .catch(err => console.log(err));

res.send(product);
});
module.exports=router;