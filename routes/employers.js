const express = require('express');
const mongoose=require('mongoose');
const router =express.Router();
const Joi = require('joi');
const auth = require('../middlewares/authentication');

const {Employer,validate} = require('../models/employers');

//--getting all employers--
router.get("/",auth, async (req,res,next) => {
    try{
        const employers = await Employer.find();
        res.status(200).json(employers);
        }catch(error){
          res.status(500).json({error :err});
        }
    });

//--getting the Employer by id--
router.get("/:empId",async (req,res,next) =>{
    const id = req.params.empId;
    try{
        const employers = await Employer.findById({_id :id});
        if(employers){
            res.status(200).json(employers);
        }else{
            res.status(401).json({message : 'empId is not available'});
        }
           }catch(error){
            res.status(404).json({error : 'No valid empId is provided'});
        }
    });

//--creating a Employer--
router.post("/", auth,async (req,res,next) => {
    if(!req.body.name || req.body.name.length<5){
        res.status(400).send("Name is required and should contains 5 characters");
    }
    const {error} =  validate(req.body);
    if(error)  
        res.status(400).send(error.details[0].message);
      try{    
        const employer = await new Employer({
            name: req.body.name,
            designation: req.body.designation,
            address: req.body.address,
            email: req.body.email,
            phoneno: req.body.phoneno
         });
     await employer.save();
     res.status(201).json({employer : 'created employer successfully'});
    }   
    catch(err){
        res.status(500).json({error :err});
    }
});   

//--updating the employers--
router.put("/:empId" , auth,async (req,res,next) =>{
    const id = req.params.empId;
    try{
        const employer = await Employer.update({_id :id }, req.body);
        res.status(200).json({employer : 'employers  updated'});   
      }catch(error){
        res.status(404).json({error : 'No valid empId is provided'});
      }         
    });

//--deleting the employers--
router.delete("/:empId" , async (req,res,next) =>{
    const id = req.params.empId;
    try{
        const employer = await Employer.deleteOne({_id :id });
        res.status(200).json({employer : "employers  deleted"});  
     }catch(error){
        res.status(404).json({error : 'No valid empId is provided'});
      }});

module.exports = router;