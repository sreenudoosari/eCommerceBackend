const mongoose=require('mongoose');

const  employerSchema= new mongoose.Schema({
    name: {
        type: String,
             minlength :5,
             maxlength :50,
             required :true
          },
    designation: String,
    address: String,
    email: String,
    phoneno: Number
    });  
module.exports = mongoose.model('Employers', employerSchema);