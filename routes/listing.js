/* Yaha Hum saari Listings ke liye Route Likhenege Joh Joh Operations listings par perform karne hoo unke liye Routes likhenge  */
const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const Listing = require("../models/listing.js");
const router = express.Router({mergeParams:true});
const wrapAsync = require("../utils/wrapAsync.js")
//=========================================================================================================================


// Yaha se hum Index Route ya Read Route create karenge

router.get("/", async function (req, res) {
    let allListings = await Listing.find({});
    //console.log(allListings);
    res.render("listing/listing.ejs", { allListings })
})
//-----------------------------------------------------------------------------------------------------------------------------

// Yaha Hum show route banayenge joh particular post ko dekhne ke liye 

router.get("/:id/show", async function (req, res) {
    let { id } = req.params;
    let searchedListing = await Listing.findById(id);
    res.render("listing/detail.ejs", { searchedListing })
});
//------------------------------------------------------------------------------------------------------------------------------

// Yaha Ham New Listing ko add karne ke liye route banayenge

router.get("/new", async function (req, res) {
    res.render("listing/new.ejs");
})

router.post("/new", async function (req, res) {
    let { title, description, url, price, country, location } = req.body;
    let newListing = new Listing({
        title: title,
        description: description,
        image: {
            url: url
        },
        price: price,
        location: location,
        country: country
    });
    await newListing.save();
    console.log("Data Saved Safely")
    //console.log(title,description,url,price,country,location);
    res.redirect("/listings");
})
//-----------------------------------------------------------------------------------------------------------------------------

//Yaha ab hum listing ki details ko edit aur update karne ke liye route create karenge
router.get("/:id/edit", wrapAsync(async function (req, res) {
    let { id } = req.params;
    let searchedListing = await Listing.findById(id);
    res.render("listing/edit.ejs", { searchedListing });
}));

router.put("/:id/edit", async function (req, res) {
    let { title, description, url, price, country, location } = req.body;
    let { id } = req.params;
    let updatedListing = await Listing.findByIdAndUpdate(id, {
        title: title,
        description: description,
        image: {
            url: url
        },
        price: price,
        location: location,
        country: country
    });
    console.log("Data Updated Safely ✅✅");
    res.redirect("/listings");
    
});
//----------------------------------------------------------------------------------------------------------------------------------

// Yaha ham delete route create karenge joh hamari listing ko delete karr dega 
router.delete("/:id/delete", async function (req, res) {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log("Listing Deleted", deletedListing);
    res.redirect("/listings");
});

//---------------------------------------------------------------------------------------------------------------

//Yaha Hum Reviews Route Create Karenge \
// router.post("/listings/:id/reviews", async function(req,res){
//     let {id}= req.params;
//     let listing = await Listing.findById(req.params.id);
//     let newReview = new Review(req.body.review);    
//     listing.rewiews.push(newReview);

//     await newReview.save();
//     await listing.save();
//     console.log("New Review Saved");
//     res.send("Review Added Su")
// })


module.exports = router;