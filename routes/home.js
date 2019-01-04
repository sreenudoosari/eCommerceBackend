const express = require('express');
const router =express.Router();


//getting the Home Page
router.get('/',(req,res)=>{
    res.send("Welcome to ECommerce Application");
})
module.exports=router;