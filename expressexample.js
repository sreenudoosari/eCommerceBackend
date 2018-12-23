const express=require('express');
const logger=require('./logger');
const app=express();

//1.get the Home Page
app.get('/api/Home',(req,res)=>{
    res.send("Welcome to ECommerce WebSite");
})
const products=[
    {id:1,name:"product1"},
    {id:2,name:"product2"},
    {id:3,name:"product3"},
    {id:4,name:"product4"},
    {id:5,name:"product5"}
    ]
//2.get all products
    app.get('/api/products',(req,res)=>{
      res.send(products);

    })
    //3.get one poduct by Id
    app.get('/api/products/:id',(req,res)=>{
       const product=products.find(p=> p.id===parseInt(req.params.id));
        //console.log(logger);
        logger.log("Error Message");
        if(!product) res.status(404).send(`product with id = ${req.params.id} is not found`);
        res.send(product);
    })
    //4.get product by query parameters
    app.get('/api/products/:id/2018',(req,res)=>{
        console.log("query params:",req.query.filterByName);
        if(req.query.filterByName){
            const product=products.find(p=> p.name===req.query.filterByName);
            if(!product) return res.status(404).send(`product with name= ${req.query.filterByName} is not found`);
            return res.send(product);
            }
      //      res.send(products);
      
       
    })
const port=process.env.ECBPORT || 3000;
app.listen(port,()=> console.log(`listening on port ${port}...`));