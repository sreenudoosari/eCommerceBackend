const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const config = require("config");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 5,
    maxlength: 55,
    required: true
  },
  address: String,
  email: {
    type: String,
    minlength: 15,
    maxlength: 250,
    required: true,
    unique: true
  },
  password: {
    type: String,
    minlength: 8,
    maxlength: 150,
    required: true
  },
  phoneno: Number,
  carddetails: Number,
  isAdmin: {
    type: Boolean,
    default: false
  }
});

userSchema.methods.generateAuthToken = function() {
  const token = jwt.sign(
    { _id: this._id, name: this.name, isAdmin: this.isAdmin },
    config.get("app.jwtPrivateKey")
  );
  return token;
};
const User = mongoose.model("User", userSchema);
function validateUser(user) {
  const schema = {
    name: Joi.string()
      .min(5)
      .max(50)
      .required(),
    address: Joi.string(),
    email: Joi.string()
      .min(15)
      .max(250)
      .required()
      .email(),
    password: Joi.string()
      .min(8)
      .max(150)
      .required(),
    phoneno: Joi.number(),
    carddetails: Joi.number()
  };
  return Joi.validate(user, schema);
}
exports.User = User;
exports.validate = validateUser;
