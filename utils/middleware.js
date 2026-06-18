module.exports.isLoggedIn = function(req,res,next){
    if(!req.isAuthenticated()){
        req.session.baseUrl = req.originalUrl;
        res.redirect("/auth/login")
    }else{
        return next();
    }

};

module.exports.saveBaseUrl = function(req,res,next){
    if(req.session.baseUrl){
        //console.log(req.session.baseUrl)
        res.locals.baseUrl = req.session.baseUrl
    };
    next()
}