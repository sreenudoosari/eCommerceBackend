const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Joi = require('joi');
const bcrypt = require('bcrypt');
const {User} = require('../models/users');


router.post("/", async (req,res,next) => {

    const {error} =  validate(req.body);
    if(error)     return  res.status(400).send(error.details[0].message);
      //checks email exists in DB or not
    let user = await User.findOne({email : req.body.email});
    if(!user) return  res.status(400).send("Invalid email.Please try again");

    //checks if the given password is valid or not
    const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
    if(!isPasswordValid) res.status(400).send("Invalid password.Please try again");
     //should in environment variable
     const token = user.generateAuthToken();
     res.header("x-auth-token" , token)
        .send();
  });

function validate(user){
  const schema = {
      email : Joi.string().min(15).max(255).required().email(),
      password : Joi.string().min(5).max(255).required()
  }
  return Joi.validate(user, schema);
}
module.exports = router;