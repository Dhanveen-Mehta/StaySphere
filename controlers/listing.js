const Listing = require("../models/listing.js");
const Review = require("../models/review.js")
module.exports.index = async function (req, res) {
    let allListings = await Listing.find({});
    //console.log(allListings);
    res.render("listing/listing.ejs", { allListings })
};

module.exports.show = async function (req, res) {
    let { id } = req.params;
    let searchedListing = await Listing.findById(id).populate({path:"reviews",populate:{path:"author"}}).populate("owner");
    res.render("listing/detail.ejs", { searchedListing })
};

module.exports.newListingSave = async function (req, res) {
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
    newListing.owner = req.user._id; 
    await newListing.save();
    console.log("Data Saved Safely")
    //console.log(title,description,url,price,country,location);
    res.redirect("/listings");
};

module.exports.listingUpdate = async function (req, res) {
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
    
};

module.exports.listingDelete =async function (req, res) {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log("Listing Deleted", deletedListing);
    res.redirect("/listings");
};

module.exports.newReviewSave = async function (req,res) {
    let {id} = req.params;
    let review = req.body.review;
    let searchedListing = await Listing.findById(id);
   // console.log(req.user.id);
    //console.log(searchedListing)
    let newReview = new Review(review);

    newReview.author = req.user._id;
    
    searchedListing.reviews.push(newReview);
    await newReview.save();
    await searchedListing.save();
    //console.log(review);
    res.redirect(`/listings/${id}/show`);
};

module.exports.reviewDelete =async function(req,res){
    let {id,reviewId} = req.params;
    //console.log(id,reviewId);
    await Review.findByIdAndDelete(reviewId);
    //console.log("Review Deleted");
    res.redirect(`/listings/${id}/show`);
};
