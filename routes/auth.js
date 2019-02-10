const express = require('express');
const mongoose=require('mongoose');
const router =express.Router();
const Joi = require('joi');
const lodash = require('lodash');
const bcrypt = require('bcrypt');
const User = require('../models/users');

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
      //checks email exists in DB or not
    let user = User.findOne({email : req.body.email});
    if(!user) 
      return  res.status(400).send("Invalid email.Please try again");
      //checks if the given password is valid or not
       const isPasswordValid = bcrypt.compare(req.body.password, user.password);
       if(!isPasswordValid) res.status(400).send("Invalid password.Please try again");
       res.send("User Authenticated");
});

module.exports = router;