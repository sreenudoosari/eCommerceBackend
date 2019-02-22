const express = require('express');
const router =express.Router();
const auth =require("../middlewares/authentication");


//getting the Home Page
router.get('/', (req,res)=>{
    res.status(200).json({message : 'Welcome to ECommerce Application'});
})
module.exports = router;