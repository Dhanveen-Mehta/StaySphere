module.exports.isLoggedIn = function(req,res,next){
    if(!req.isAuthenticated()){
        res.redirect("/auth/login")
    }else{
        return next();
    }

}