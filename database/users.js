const mongoose=require('mongoose');

const userSchema= new mongoose.Schema({
    name: {
        type :String,
           minlength :5,
           maxlength :50,
           required :true},
    });  
module.exports = mongoose.model('User', userSchema);