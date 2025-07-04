const mongoose = require("mongoose");
const User = require("../model/users");
const { createSecretToken } = require("../utils/SecretToken");
const bcrypt = require("bcryptjs");

module.exports.signup = async (req, res, next) => {
  const existuser = await User.findOne({email : req.body.email});
  if (existuser) {
    return res.json({
      success: false,
      message: "account already exist pls login",
    });
  }
  const user = new User(req.body);
  await user
    .save()
    .then((res) => {
      console.log("user created");
    })
    .catch((e) => {
      console.log(e);
    });
  const token = createSecretToken(user._id);
  res.cookie("token", token, {
    withCredentials: true,
    httponly: true,
  });
  res
    .status(200)
    .json({ success: true, message: "User Signed in successfully" });
};

module.exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({ success:false, message: "All fields are required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ success:false, message: "Incorrect password or email" });
    }
    const auth = await bcrypt.compare(password, user.password);
    if (!auth) {
      return res.json({ success:false, message: "Incorrect password or email" });
    }
    const token = createSecretToken(user._id);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });
    res
      .status(201)
      .json({ success:true, message: "User logged in successfully",});
    next();
  } catch (error) {
    console.error(error);
  }
};
