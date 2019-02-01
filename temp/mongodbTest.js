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
    category:{
        type:String,
        required:true,
        enum :["Men","Women","Kids","General"]
    },
    tags: [String]
    })
const Product= mongoose.model("Product" ,productSchema);
async function createNewProduct(){
    const product= new Product({
        name:"Doliprane",
        description:"A good medicine for fever",
        price: 20,
        display: true,
        category: ["General"],
        tags: ["Men"],

        name:"Maxliase",
        description:"A good medicine for throat pain",
        price: 20,
        display: true,
        category: ["Women"],
        tags: ["Women"]
        });
        
    const result=await product.save();
    console.log("saved product is:",result);
} 
 //createNewProduct();
 async function getAllProducts(){
     const products= await Product.find();
     console.log(products);
 }
 async function getAllProductsByCategory(){
     const products= await Product.find({category :"Women"});
     console.log(products);
 }
  getAllProductsByCategory();
