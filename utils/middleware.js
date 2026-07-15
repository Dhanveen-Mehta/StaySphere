
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
};

module.exports.isListingOwner = async function(req,res,next){
    let { id } = req.params;
    let Listing = require("../models/listing.js");
    
    try {
        let searchedListing = await Listing.findById(id);
        
        if(!searchedListing){
            return res.status(404).send("Listing not found");
        }
        
        if(!searchedListing.owner.equals(req.user._id)){
            return res.status(403).send("You are not the owner of this listing. Only the owner can edit or delete.");
        }
        
        next();
    } catch (error) {
        return res.status(500).send("Error checking ownership");
    }
}

module.exports.isReviewOwner = async function(req,res,next){
    const Review = require("../models/review.js");
    let{id,reviewId} = req.params;
    let review = await Review.findById(reviewId);
    if(!review.author.equals(req.user._id)){
        return res.redirect(`/listings/${id}`);
    }
}