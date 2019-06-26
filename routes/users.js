require("express-async-errors");
const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const lodash = require("lodash");
const bcrypt = require("bcrypt");
const { User, validate } = require("../models/users");
const auth = require("../middlewares/authorization");
const { Order } = require("../models/orders");

//--getting the users--
router.get("/", auth, async (req, res, next) => {
  const user = await User.find();
  res.status(200).send(user);
});

//--get connected user information--
router.get("/me", auth, async (req, res, next) => {
  const user = await User.findById(req.user._id).select("-password");
  res.status(200).send(user);
});

//--getting the users By ID--
router.get("/:userId", async (req, res, next) => {
  const id = req.params.userId;
  try {
    const user = await User.findById({ _id: id });
    if (user) {
      res.status(200).send(user);
    } else {
      res.status(401).json({ message: "userId is not available" });
    }
  } catch (error) {
    res.status(404).json({ error: "No valid userId is provided" });
  }
});

//--getting orders in users list
router.get("/:userId/orders", auth, async (req, res, next) => {
  const order = await Order.find({ userId: mongoose.Types.ObjectId(id) });
  console.log(order);
  res.status(200).send(order);
});

//--creating a users--
router.post("/", async (req, res) => {
  if (!req.body.name || req.body.name.length < 5) {
    res.status(400).send("Name is required and should contains 5 characters");
  }
  const { error } = validate(req.body);
  if (error) res.status(400).send(error.details[0].message);
  //checking email exists in DB or not
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("user already exist");
  user = new User(
    lodash.pick(req.body, [
      "name",
      "address",
      "email",
      "password",
      "phoneno",
      "carddetails"
    ])
  );
  //Hash the password
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(req.body.password, salt);
  await user.save();
  const token = user.generateAuthToken();

  res.header("x-auth-token", token).send(lodash.pick(user, ["name", "email"]));
});

//--updating the users--
router.put("/:userId", async (req, res, next) => {
  const id = req.params.userId;
  try {
    const user = await User.update({ _id: id }, req.body);
    res.status(200).json({ user: "user  updated" });
  } catch (error) {
    res.status(404).json({ error: "No valid userId is provided" });
  }
});

//--deleting the users--
router.delete("/:userId", async (req, res, next) => {
  const id = req.params.userId;
  try {
    const user = await User.deleteOne({ _id: id });
    res.status(200).json({ user: "deleted user successfully" });
  } catch (error) {
    res.status(404).json({ error: "No valid userId is provided" });
  }
});

module.exports = router;
