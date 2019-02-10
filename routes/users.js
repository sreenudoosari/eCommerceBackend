const express = require('express');
const mongoose=require('mongoose');
const router =express.Router();
const Joi = require('joi');
const lodash = require('lodash');
const bcrypt = require('bcrypt');
const User = require('../models/users');

//--getting the users--
router.get("/", (req,res,next) => {
    User.find()
           .then(result => {
             res.status(200).json(result);
         })
           .catch(err => {
               res.status(500).json({error :err});
           });
});
//--getting the user by id--
router.get("/:userId",(req,res,next) =>{
    const id = req.params.userId;
    User.findById(id)
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

//--creating a users--
router.post("/", (req,res,next) => {
    if(!req.body.name || req.body.name.length<5){
        res.status(400).send("Name is required and should contains 5 characters");
    }
   const schema = {
     name : Joi.string().min(5).max(50).required(),
     address : Joi.string().required(),
     email :Joi.string().min(15).max(250).required().email(),
     password: Joi.string().min(8).max(150).required(),
     phoneno: Joi.number().required(),
     carddetails: Joi.number().required()
    };
  const result =  Joi.validate(req.body,schema);
    if(result.error)  
      return  res.status(400).send(result.error.details[0].message);
      //checking email exists in DB or not
    let user = User.findOne({email : req.body.email});
    if(!user) 
      return  res.status(400).send("Invalid email.Please try again");
       user = new User(lodash.pick(req.body, ["name" ,"address" ,"email" ,"password" ,"phoneno" ,"carddetails"]));
       //Hash the password
       const salt =bcrypt.genSalt(10);
       user.password = bcrypt.hash(user.password, salt);
       user.save()
           .then(result =>{
              res.status(201).json({message : 'created user successfully'});
            })
           .catch(err => {
            res.status(500).json({error : err});
           });
res.send(lodash.pick(user, ["name" ,"email"]));
});

//--updating the users--
router.put("/:userId" , (req,res,next) =>{
    const id=req.params.userId;
    User.update({_id :id }, req.body)
           .then(result =>{
               res.status(200).json({message : "user updated"});
           }) 
           .catch(err =>{
               res.status(500).json({error :err});
           });
});

//--deleting the users--
router.delete("/:userId" , (req,res,next) =>{
    const id=req.params.userId;
    User.remove({_id :id })
           .then(result =>{
               res.status(200).json({message : "user deleted"});
           }) 
           .catch(err =>{
               res.status(500).json({error :err});
           });
});

module.exports=router;