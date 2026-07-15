/* Yaha Hum saari Listings ke liye Route Likhenege Joh Joh Operations listings par perform karne hoo unke liye Routes likhenge  */
const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const Listing = require("../models/listing.js");
const router = express.Router({mergeParams:true});
const wrapAsync = require("../utils/wrapAsync.js");
const Review = require("../models/review.js");
const passportSetup = require("../passportConfig/passport.js");
const {isLoggedIn, isListingOwner} = require("../utils/middleware.js");
const  listingControlers = require("../controlers/listing.js");


//=========================================================================================================================


// Yaha se hum Index Route ya Read Route create karenge

router.get("/", wrapAsync(listingControlers.index));

//-----------------------------------------------------------------------------------------------------------------------------

// Yaha Hum show route banayenge joh particular post ko dekhne ke liye 

router.get("/:id/show", wrapAsync(listingControlers.show));

//------------------------------------------------------------------------------------------------------------------------------

// Yaha Ham New Listing ko add karne ke liye route banayenge

router.get("/new",isLoggedIn, wrapAsync(async function (req, res) {
        res.render("listing/new.ejs");
}));

router.post("/new",isLoggedIn, wrapAsync(listingControlers.newListingSave));

//-----------------------------------------------------------------------------------------------------------------------------

//Yaha ab hum listing ki details ko edit aur update karne ke liye route create karenge

router.get("/:id/edit",isLoggedIn, isListingOwner, wrapAsync(async function (req, res) {
    let { id } = req.params;
    let searchedListing = await Listing.findById(id);
    res.render("listing/edit.ejs", { searchedListing });
}));

router.put("/:id/edit",isLoggedIn, isListingOwner, wrapAsync(listingControlers.listingUpdate));

//----------------------------------------------------------------------------------------------------------------------------------

// Yaha ham delete route create karenge joh hamari listing ko delete karr dega 

router.delete("/:id/delete", isLoggedIn, isListingOwner, wrapAsync(listingControlers.listingDelete));

//---------------------------------------------------------------------------------------------------------------

//Yaha Hum Reviews Route Create Karenge 

router.post("/:id/review",isLoggedIn, wrapAsync(listingControlers.newReviewSave));

//===================================================================================================================

//Yaha Hum Reviews ko delete karne ke liye route create karenge 

router.delete("/:id/review/:reviewId/delete",isLoggedIn, wrapAsync(listingControlers.reviewDelete));

module.exports = router;