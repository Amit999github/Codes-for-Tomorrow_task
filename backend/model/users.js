const mongoose = require('mongoose');
const Schema = mongoose.Schema ; 
const bcrypt = require("bcryptjs");

const userSchema = new Schema({
    firstname:{
        type : String,
        required :[true , 'first name is required'],
    },
    lastname:{
        type : String,
        required :[true , 'last name is required'],
    },
    email:{
        type : String,
        required :[true , 'email name is required'],
        unique :true
    },
    password:{
        type : String,
        required :[true , 'password name is required'],
    }
})

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

module.exports = mongoose.model("User" , userSchema);
