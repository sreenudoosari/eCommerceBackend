const mongoose = require("mongoose");
const Joi = require("joi");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minlength: 5,
      maxlength: 55,
      required: true
    }
  },
  {
    timestamps: true
  }
);
const Category = mongoose.model("Category", categorySchema, "categories");

function validateCategory(category) {
  const schema = {
    name: Joi.string()
      .min(5)
      .max(55)
      .required()
  };
  return Joi.validate(category, schema);
}
module.exports.Category = Category;
module.exports.validate = validateCategory;
