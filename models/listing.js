const mongoose = require("mongoose");

// Yaha Hamne Schema Define Kiya hai 
const listingSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true,
    },
    image:{
        filename:{
            type:String
        },
        url:{
            type:String,
            set: v=> v===""? undefined:v,
            default:"https://images.unsplash.com/photo-1625505826533-5c80aca7d157?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGdvYXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60"
        },
    },
    price:{
        type:Number
    },
    location:{
        type:String
    },
    country:{
        type:String
    }
});

//------------------------------------------------------------------------------------------------------------------

// Yaha Hamne ek model ya collection create kiya hai jiske andar saare documents store honge 
const Listing = new mongoose.model("Listing",listingSchema);

// Yaha hamne iss Schema ko export kiya hai taaki ham isse jab data insert karre ya update karre toh validators use karr sake
module.exports = Listing;
