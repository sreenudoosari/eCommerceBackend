const express = require('express');
const mongoose=require('mongoose');
const router =express.Router();
const Joi = require("joi");

const User=require('../database/users');

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
router.get("/:id",(req,res,next) =>{
    const id = req.params.id;
    console.log(id);
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
router.post('/', (req,res) => {
    if(!req.body.name || req.body.name.length<5){
        res.status(400).send("Name is required and should contains 5 characters");
    }
   const schema = {
       name : Joi.string().min(5).max(50).required(),
    };
  const result =  Joi.validate(req.body,schema);
   if(result.error )  return  res.status(400).send(result.error.details[0].message);
     const user=new User({
        id: req.params.id,
        name: req.body.name,
     });
    user.save()
           .then(result =>{
              res.status(201).json({message : 'created user successfully'});
            })
           .catch(error => {
            res.status(500).json({error :err});
           });

res.send(user);
});

//--updating the products--
router.put("/:id" , (req,res,next) =>{
    const id=req.params.id;
    User.update({_id :id }, req.body)
           .then(result =>{
               res.status(200).json({message : "User updated"});
           }) 
           .catch(err =>{
               res.status(500).json({error :err});
           });
});

//--deleting the products--
router.delete("/:id" , (req,res,next) =>{
    const id=req.params.id;
    User.remove({_id :id })
           .then(result =>{
               res.status(200).json({message : "user deleted"});
           }) 
           .catch(err =>{
               res.status(500).json({error :err});
           });
});

module.exports=router;