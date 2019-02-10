const express = require('express');
const mongoose=require('mongoose');
const router =express.Router();
const Joi = require('joi');

const Employer = require('../models/employers');

//--getting all employers--
router.get("/", (req,res,next) => {
    Employer.find()
           .then(result => {
               res.status(200).json(result);
         })
           .catch(err => {
               res.status(500).json({error :err});
           });
});
//--getting the Employer by id--
router.get("/:empId",(req,res,next) =>{
    const id = req.params.empId;
    Employer.findById(id)
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
//--creating a Employer--
router.post("/", (req,res) => {
    if(!req.body.name || req.body.name.length<5){
        res.status(400).send("Name is required and should contains 5 characters");
    }
   const schema = {
        name : Joi.string().min(5).max(50).required(),
        designation :Joi.string().required(),
        address: Joi.string().required(),
        email: Joi.string().required(),
        phoneno: Joi.number().required()
   };
  const result =  Joi.validate(req.body,schema);
   if(result.error)  return  res.status(400).send(result.error.details[0].message);
     const employer=new Employer({
        name: req.body.name,
        designation: req.body.designation,
        address: req.body.address,
        email: req.body.email,
        phoneno: req.body.phoneno
     });
    employer.save()
           .then(result =>{
              res.status(201).json( {message : 'created employer successfully'});
            })
           .catch(error => {
            res.status(500).json({error :err});
           });

res.send(employer);
});

//--updating the employers--
router.put("/:empId" , (req,res,next) =>{
    const id=req.params.empId;
    Employer.update({_id :id }, req.body)
           .then(result =>{
               res.status(200).json({message : "employer updated"});
           }) 
           .catch(err =>{
               res.status(500).json({error :err});
           });
});

//--deleting the employers--
router.delete("/:empId" , (req,res,next) =>{
    const id=req.params.empId;
    Employer.remove({_id :id })
           .then(result =>{
               res.status(200).json({message : "employer deleted"});
           }) 
           .catch(err =>{
               res.status(500).json({error :err});
           });
});

module.exports=router;