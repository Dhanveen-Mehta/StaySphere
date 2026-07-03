const express = require("express");
const passport = require("passport");
const router = express.Router();
const User = require("../models/user.js");
const passportSetup = require("../passportConfig/passport.js");
const wrapAsync = require("../utils/wrapAsync.js");
const { saveBaseUrl } = require("../utils/middleware.js");


router.get("/signup", function(req,res){
    res.render("authentication/signup.ejs");
})


router.post("/signup", wrapAsync(async function (req,res,next){
    let{email,username, password} = req.body;
    let newUser = new User({
        email:email,
        username:username,
    });
    let registeredUser = await User.register(newUser,password);
    // res.locals.currentUser = registeredUser;
    req.login(registeredUser,(err)=>{
        if(err){
            return next(err);
        }else{
            console.log("Logging in after signUP");
            res.redirect("/listings");
           
        }
    })
    //console.log(registeredUser);
    //res.send("User Registered");

}));

router.get("/login",wrapAsync(async function (req,res) {
    res.render("authentication/login.ejs");
}));

router.post("/login", saveBaseUrl  ,passport.authenticate("local",{failureRedirect:"/login"}), function(req,res){
    res.locals.currentUser = req.user;
    if(res.locals.baseUrl){
        res.redirect(res.locals.baseUrl);
        console.log("Logged in and Redirected to base url")
    }else{
        res.redirect("/listings");
    }
});

router.get("/logout", function(req,res,next){
    req.logout((err)=>{
        if(err){
            return next(err);
        };
        console.log("logged OUT");
        res.redirect("/listings");
    });
});
module.exports = router;
