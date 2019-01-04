const express = require('express');
const router =express.Router();
const Joi = require("joi");
const users=require('../db/users');

//USER DETAILS
//1.get all users
const userlists=users.user_lists;
router.get('/', (req, res) => {
     res.send(userlists);
  }) 
  //2.get user by Id
  router.get('/:id', (req, res) => {
    const user =  userlists.find(p => p.id === parseInt(req.params.id));
    if(!user) return res.status(404).send(`user with id = ${req.params.id} is not found`);
    res.send(user);
    }) 
 //3.creating a user
 router.post('/', (req,res) => {
    if(!req.body.name || req.body.name.length<4){
        res.status(400).send("Name is required and should contains 5 characters");
    }
    const schema = {
        name : Joi.string().min(3).required()
    };
   const result =  Joi.validate(req.body,schema);
    console.log(result);
    if(result.error )  return  res.status(400).send(result.error.details[0].message);
    const user =userlists.reduce((accu,curr)=>({id : curr.id}))
    const  maxId=user.id + 1;
    const newUser = {
        id: maxId,
        name : req.body.name
    }
    userlists.push(newUser);
    res.send(newUser);
 })
 
//4.updating the users
router.put('/:id', (req,res) => {
  
    const user =  userlists.find(p => p.id === parseInt(req.params.id));
   if(!user) return res.status(404).send(`user with id = ${req.params.id} is not found`);
 
   const schema = {
       name : Joi.string().min(3).required()
   };
  const result =  Joi.validate(req.body,schema);
   if(result.error )return res.status(400).send(result.error.details[0].message);
   user.name = req.body.name;
   res.send(user);
})
//5.Deleting products
router.delete('/:id', (req,res) => {
   const user =  userlists.find(p => p.id === parseInt(req.params.id));
   if(!user) return res.status(404).send(`product with id = ${req.params.id} is not found`);
 
   const indexOfProduct = userlists.indexOf(user);
   userlists.splice(indexOfProduct,1);
   res.status(200).send(`deleted the user`);
   res.send();
})

module.exports=router;