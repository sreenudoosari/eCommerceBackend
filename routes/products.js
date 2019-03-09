require('express-async-errors');
const express = require('express');
const mongoose=require('mongoose');
const router =express.Router();
const auth = require('../middlewares/authorization');
const multer =require('multer');


const storage = multer.diskStorage({
  destination: function(req,file,cb){
    cb(null, './public/images');
  },
  filename: function(req,file,cb){
    cb(null, Date.now() + file.originalname);
  }
});
const fileFilter =(req,file,cb) => {
  if(file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
    cb(null,true);
  }else{
    cb(null,false);
  }
}

const upload = multer({storage: storage, 
  limits: {
   fileSize: 1024 * 1024* 5
  },
fileFilter: fileFilter
});

const {Product,validate} = require('../models/products');

//--getting all products--
router.get("/products", async (req,res,next) => {
    const products = await Product.find();
    res.status(200).send(products); 
});
    
//--getting the product by id--
router.get("/products/:productId",async (req,res,next) =>{
    const id = req.params.productId;
  try{
    const products = await Product.findById({_id :id});
   if(products){
    res.status(200).send(products);
   }else{ 
    res.status(401).json({message :'productId is not available'}); 
   }   
  }
  catch(error){
    res.status(404).json({error : 'No valid productId is provided'});
  }         
});

//--getting product by category //Men //Women //Kids--
router.get('/product/category',async (req,res,next) =>{
  try{
    if(req.query.filterByCategory){
    const product = await Product.find({category: {$in: req.query.filterByCategory}});
    if(product){
      res.status(200).send(product);
     }else{ 
      res.status(401).json({message :'category is not available'}); 
     }
    }
}
  catch(error){
    res.status(404).json({error : 'Invalid category is provided'});
  }
 }); 

//--creating a product--
router.post("/products",upload.single('productImage'),auth, async (req,res,next) => {
    if(!req.body.name || req.body.name.length<5){
        res.status(400).send("Name is required and should contains 5 characters");
    }
    const {error} =  validate(req.body);
    if(error)  
        res.status(400).send(error.details[0].message);
      try{    
      const product = await new Product({
        name: req.body.name,
        price :req.body.price,
        description: req.body.description,
        brand: req.body.brand,
        quantity: req.body.quantity,
        barcode: req.body.barcode,
        productImage: req.file.path,
        category : req.body.category,
     });
     await product.save();
         res.status(200).json({product : 'Product Created'});
    }   
    catch(error){
        res.status(500).json({error :'Invalid Product Details'});
    }
});

//--updating the products--
router.put("/products/:productId" , async (req,res,next) =>{
    const id = req.params.productId;
    try{
      const product = await Product.update({_id :id }, req.body);
      res.status(200).json({product : 'product  updated'});      
    }catch(error){
      res.status(404).json({error : 'No valid productId is provided'});
  }         
});
//--deleting the products--
router.delete("/products/:productId" , async (req,res,next) =>{
    const id = req.params.productId;
    try{
      const product = await Product.deleteOne({_id :id });
      res.status(200).json({product:'product deleted'});      
    }catch(error){
      res.status(404).json({error : 'No valid productId is provided'});
  }         
});

module.exports = router;