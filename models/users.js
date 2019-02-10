const mongoose=require('mongoose');

const userSchema= new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
             minlength :5,
             maxlength :50,
             required :true
          },
    address: String,
    email: {
        type: String,
             minlength :15,
             maxlength :250,
             unique :true
          },
    password:{
        type: String,
             minlength :8,
             maxlength :150,
             required :true
          },
    phoneno: Number,
    carddetails: Number
    });  
module.exports = mongoose.model('Users', userSchema);