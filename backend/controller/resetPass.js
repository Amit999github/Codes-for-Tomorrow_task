const mongoose = require('mongoose');
const User = require('../model/users')
const bcrypt = require("bcryptjs");

module.exports.resetPass = async (req , res , next) =>{
    const { password, con_password, currTokenUser } = req.body;
try {
    const user = await User.findOne({ email: currTokenUser });

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found." });
    }

    user.password = password; 
    await user.save();

    res.status(200).json({ success: true, message: "Password updated successfully." });
  } catch (error) {
    console.error("Reset password error:", error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
}