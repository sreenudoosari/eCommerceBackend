const mongoose=require('mongoose');

const orderSchema= new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required :true
        },
    product:{ 
        type : mongoose.Schema.Types.ObjectId,
        ref : "Product",
        required : true
    }
});  
module.exports = mongoose.model('Order', orderSchema);
