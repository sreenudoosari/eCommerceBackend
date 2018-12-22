const express=require('express');
const logger=require('./logger');
const app=express();

//1.get the Home Page
app.get('/api/Home',(req,res)=>{
    res.send("Welcome to ECommerce WebSite");
})
const products=[
    {id:1,nameofproduct:"Danone Curd"},
    {id:2,nameofproduct:"Viva Milk"},
    {id:3,nameofproduct:"Tilda Basmatic Rice"},
    {id:4,nameofproduct:"Amul Ghee"},
    {id:5,nameofproduct:"Baby Milk"}
    ]
//2.get all products
    app.get('/api/Products',(req,res)=>{
      res.send(products);

    })
    //3.get one poduct by Id
    app.get('/api/Products/:id',(req,res)=>{
       const product=products.find(p=> p.id===parseInt(req.params.id));
        //console.log(logger);
        logger.log("Error Message");
        if(!product) res.status(404).send(`product with id = ${req.params.id} is not found`);
        res.send(product);
    })
    //get product by query parameters
    app.get('/api/Products/:year/:month/?sortBy=name',(req,res)=>{
        res.send(req.query);

    })
const port=process.env.ECBPORT || 3000;
app.listen(port,()=> console.log(`listening on port ${port}...`));