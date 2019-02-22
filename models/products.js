const mongoose=require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken');

const productSchema= new mongoose.Schema({
    name: {
        type :String,
           minlength :5,
           maxlength :50,
           required :true
        },
    price: Number,
    description: String, 
    brand: String,
    quantity: Number,
    barcode: Number,
    productImage:{
        type: String,
        required: true
    },
    category: {
        type :String,
        required : true,
        enum :["Men" ,"Women","Kids"]
    }
    });  
const Product = mongoose.model('Product', productSchema);
function validate(product)
{
    const schema = {
        name : Joi.string().min(5).max(50).required(),
        price :Joi.number().required(),
        category :Joi.string().required(),
        description: Joi.string().required(),
        brand: Joi.string().required(),
        quantity: Joi.number().required(),
        barcode: Joi.number().required()
       }
    return Joi.validate(product , schema);
}
module.exports.Product = Product;
module.exports.validate = validate;

