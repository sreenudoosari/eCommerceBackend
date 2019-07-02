require("express-async-errors");
const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const auth = require("../middlewares/auth");
const { Category, validate } = require("../models/categories");

//--getting all categories--
router.get("/", async (req, res, next) => {
  const categories = await Category.find();
  res.status(200).send(categories);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) res.status(400).send(error.details[0].message);
  try {
    const category = await new Category({
      name: req.body.name
    });
    await category.save();
    res.status(200).json({ category: "Category Created" });
  } catch (error) {
    res.status(500).json({ error: "Invalid Category Details" });
  }
});

module.exports = router;
