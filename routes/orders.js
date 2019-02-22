const express = require('express');
const mongoose=require('mongoose');
const router =express.Router();
const Joi = require('joi');
const auth = require('../middlewares/authentication');
const {Order} = require('../models/orders');
const {Product} = require('../models/products');
const {User} = require('../models/users');

//getting all orders
router.get('/' , auth,async (req,res) =>{
  try{
    const order = await Order.find();
    res.status(200).json(order);
  }catch(error){
    res.status(500).json({message: "No Orders found"});
  }
});
//getting order by Id
router.get("/:orderId", auth, async (req,res,next) => {
  const id = req.params.orderId;
  try{
    const order = await Order.findById({_id :id });
    if(order){
    res.status(200).json(order);
    }else{
      res.status(401).json({message :'orderId is not available'}); 
    }   
   }
   catch(error){
     res.status(404).json({error : 'No valid orderId is provided'});
   }         
});

//--creating a orders--
router.post("/", auth,async (req,res,next) => {
   const user = await User.findById(req.body.user);
   if(!user){
      return res.status(404).json({message :'User is not found'});
  }
    const product =  await Product.findById(req.body.product);
    if(!product){
        return res.status(404).json({message :'Product is not found'});
    }
    try{
     const order = await new Order({
       user: req.body.user,
       product: req.body.product
     });
       await order.save();
      res.status(200).json({order : 'created order successfully'});
    }catch(error){
      res.status(500).json({order : 'Invalid Orders'});
    }
});

//--updating the orders--
router.put("/:orderId" , async (req,res,next) =>{
  const id = req.params.orderId;
  try{
    const order = await Order.update({_id :id }, req.body);
    res.status(200).json({order : 'order  updated'});    
  }catch(error){
    res.status(404).json({error : 'No valid orderId is provided'});
  }         
});

//--deleting the orders--
router.delete("/:orderId" , async (req,res,next) =>{
  const id = req.params.orderId;
  try{
    const order = await Order.deleteOne({_id :id });
    res.status(200).json({order : 'deleted order successfully'});
  }catch(error){
    res.status(404).json({error : 'No valid orderId is provided'});
  }});

module.exports = router;