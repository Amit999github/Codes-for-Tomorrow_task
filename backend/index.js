require('dotenv').config()
const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const {signup, login} = require('./controller/AuthController');
const {sendmail, verifyTokens} = require('./controller/sendMail');
const {resetPass} = require('./controller/resetPass');
const {isLoggedIn} = require('./middleware/middleware')
const PORT = process.env.PORT || 3000;

app.use(cors({
    origin: process.env.Client_URL,
    credentials: true,
}));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


main().then(res =>{
    console.log('Database Connect Successfully');
})
async function main() {
    mongoose.connect(process.env.ATLASDB_URL)
}    

app.post("/login", login);

app.post("/signup", signup)

app.post("/",isLoggedIn);

app.post("/pass-reset-link",sendmail,(req, res) =>{
    console.log(req.body);
    res.json({success:true, message:"email send for pasword reset"});
})    

app.get('/verify-reset/:token', verifyTokens);

app.post('/reset-password/:token', resetPass);

app.listen(PORT, ()=>{
    console.log(`listening on port ${PORT} `)
})