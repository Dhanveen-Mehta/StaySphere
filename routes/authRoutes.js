const express = require("express");
const passport = require("passport");
const router = express.Router();
const User = require("../models/user.js");
const passportSetup = require("../passportConfig/passport.js");
const wrapAsync = require("../utils/wrapAsync.js");


router.get("/signup", function(req,res){
    res.render("authentication/signup.ejs");
})


router.post("/signup", wrapAsync(async function (req,res){
    let{email,username, password} = req.body;
    let newUser = new User({
        email:email,
        username:username,
    });
    let registeredUser = await User.register(newUser,password);
    console.log(registeredUser);
    res.send("User Registered");

}));

router.get("/login",wrapAsync(async function (req,res) {
    res.render("authentication/login.ejs");
}));

router.post("/login",passport.authenticate("local",{failureRedirect:"/auth/login"}), function(req,res){
    res.redirect("/listings");
})
module.exports = router;
