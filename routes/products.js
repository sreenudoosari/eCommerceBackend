const express = require('express');
const mongoose=require('mongoose');
const router =express.Router();
const Joi = require("joi");

const Product=require('../models/products');

//--getting all products--
router.get("/products", (req,res,next) => {
    Product.find()
           .then(result => {
               res.status(200).json(result);
         })
           .catch(err => {
               res.status(500).json({error :err});
           });
});
//--getting the product by id--
router.get("/products/:productId",(req,res,next) =>{
    const id = req.params.productId;
    Product.findById(id)
           .then(result => {
               if(result){
                res.status(200).json(result);
               }else{
                res.status(404).json({message : 'No Valid ID is provided'});
               }
           })
           .catch(err => {
               res.status(500).json({error : err});
           });        
});
//--getting product by category //Men //Women //Kids--
router.get('/products/:category',(req,res,next) =>{
     Product
        .find({category: req.params.category})
        .populate('category')
        .then(result => {
            if(result){
                res.status(200).json(result);
               }else{
                res.status(401).json({message : 'General is not a valid enum value for path category'});
               }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error : err});
        });
 }); 

//--creating a product--
router.post('/products', (req,res) => {
    if(!req.body.name || req.body.name.length<5){
        res.status(400).send("Name is required and should contains 5 characters");
    }
   const schema = {
        name : Joi.string().min(5).max(50).required(),
        price :Joi.number().required(),
        category :Joi.string().required(),
        description: Joi.string().required(),
        brand: Joi.string().required(),
        quantity: Joi.number().required(),
        barcode: Joi.number().required()
   };
  const result =  Joi.validate(req.body,schema);
   if(result.error )  return  res.status(400).send(result.error.details[0].message);
     const product=new Product({
        name: req.body.name,
        price :req.body.price,
        description: req.body.description,
        brand: req.body.brand,
        quantity: req.body.quantity,
        barcode: req.body.barcode,
        category : req.body.category,
     });
    product.save()
           .then(result =>{
              res.status(201).json({message : 'created product successfully'});
            })
           .catch(error => {
            res.status(500).json({error :err});
           });

res.send(product);
});

//--updating the products--
router.put("/products/:productId" , (req,res,next) =>{
    const id=req.params.productId;
    Product.update({_id :id }, req.body)
           .then(result =>{
               res.status(200).json({message : "product updated"});
           }) 
           .catch(err =>{
               res.status(500).json({error :err});
           });
});

//--deleting the products--
router.delete("/products/:productId" , (req,res,next) =>{
    const id=req.params.productId;
    Product.remove({_id :id })
           .then(result =>{
               res.status(200).json({message : "product deleted"});
           }) 
           .catch(err =>{
               res.status(500).json({error :err});
           });
});

module.exports=router;