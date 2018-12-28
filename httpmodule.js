const http=require('http');
const ecommercedetails=require('ecommerceuserlist');
const productdetails=require('./manageproducts');
const suppliersdetails=require('suppliers');

const server=http.createServer((req,res)=>{
if(req.url==='/Home'){
    res.write("welcome to ECommerce Application!");
    res.end();
}
const data=[
    {name:"babymilk", price:8, description:"used for babies 10months to 3yrs"},
    {name:"rice", price:17, description:"main source to live"},
    {name:"horlicks", price:5, description:"good for childrens growth"}
]
const productdata=productdetails.productMangingList;
if(req.url==='/products'){
    res.write(JSON.stringify(productdata));
    res.end();
}
//const userdetails=[
  //  {username:"Roopa" , address:"39 Rue de Brement,Noisy Le Sec"}
//]
const suppliersdata=suppliersdetails.getSuppliers();
const details=ecommercedetails.getUsersList();
if(req.url==='/users'){
    res.write(JSON.stringify(details));
    res.end();
}
if(req.url==='/suppliers'){
    res.write(JSON.stringify(suppliersdata));
    res.end();
}

});
server.listen("3000");
console.log("listening to the port :3000");