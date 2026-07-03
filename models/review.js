// Yaha Hum Reviews ke liye Schema aur model tyaar karenge taaki harr listing par hum daal sake 
const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
    comment:{
        type:String,
        required:true
    },
    rating:{
        type:Number,
        min:1,
        max:5,
        required:true,

    },
    createdAt:{
        type: Date,
        default: Date.now(),
    },
    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
    }
});

const Review = mongoose.model("Review",reviewSchema);

module.exports = Review;
