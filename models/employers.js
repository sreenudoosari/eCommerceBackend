const mongoose=require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken');

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
    const Employer = mongoose.model('Employers', employerSchema);
    function validate(employer)
    {
        const schema = {
            name : Joi.string().min(5).max(50).required(),
            designation :Joi.string().required(),
            address: Joi.string().required(),
            email: Joi.string().required(),
            phoneno: Joi.number().required()
       }
        return Joi.validate(employer , schema);
    }
    exports.Employer = Employer;
    exports.validate = validate;
