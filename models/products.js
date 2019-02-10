const mongoose=require('mongoose');

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
    category: {
        type :String,
        required : true,
        enum :["Men" ,"Women","Kids"]
    }
    });  
module.exports = mongoose.model('Product', productSchema);
