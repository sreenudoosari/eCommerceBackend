const express = require('express');
const mongoose=require('mongoose');
const router =express.Router();
const Joi = require("joi");

const Order=require('../models/orders');
const Product=require('../models/products');
const User=require('../models/users');

//--getting the orders--
router.get("/", (req,res,next) => {
    Order.find()     
         .select('user product _id')
         .then(result => {
             res.status(200).json(result);
         })
           .catch(err => {
               res.status(500).json({error :err});
           });
});
//--getting the order by id--
router.get("/:orderId",(req,res,next) =>{
    const id = req.params.orderId;
    Order.findById(id)
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

//--creating a orders--
router.post("/", (req,res,next) => {
    User.findById(req.body.userId)
        .then(user =>{
            if(!user){
                return res.status(404).json({message :"User is not found"});
            }
    Product.findById(req.body.productId)
           .then(product =>{
               if(!product){
                   return res.status(404).json({message :"Product is not found"});
               }
            const order = new Order({
                user: req.body.userId,
                product: req.body.productId,    
            });
            return order.save();
        })
    })
        .then(result =>{
            console.log(result);
            res.status(201).json({message : "order created"});
            })
           .catch(err => {
            res.status(500).json({error : err});
            });
});

//--updating the orders--
router.put("/:orderId" , (req,res,next) =>{
    const id=req.params.orderId;
    Order.update({_id :id }, req.body)
           .then(result =>{
               res.status(200).json({message : "order updated"});
           }) 
           .catch(err =>{
               res.status(500).json({error :err});
           });
});

//--deleting the order--
router.delete("/:orderId" , (req,res,next) =>{
    const id=req.params.orderId;
    Order.remove({_id :id })
           .then(result =>{
               res.status(200).json({message : "order deleted"});
           }) 
           .catch(err =>{
               res.status(500).json({error :err});
           });
});

module.exports=router;