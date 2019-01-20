const mongoose=require('mongoose');

mongoose.connect("mongodb://localhost/ecommerce")
        .then(() => console.log("Succefully connected to mongodb...."))
        .catch((err)=> console.log("Failed to connect to db....", err));

        
const productSchema= new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    display: Boolean,
    entryDate: {type:Date,default:Date.now},
    tags: [String]
    })
const Product= mongoose.model("Product" ,productSchema);
async function createNewProduct(){
    const product= new Product({
        name:"Doliprane",
        description:"A good medicine for fever",
        price: 20,
        display: true,
        tags: ["Medicines","Pharmacy","Fever"]
        });
    const result=await product.save();
    console.log("saved product is:",result);
} 
 //createNewProduct();
 async function getAllProducts(){
     const products= await Product.find();
     console.log(products);
 }
 getAllProducts();
