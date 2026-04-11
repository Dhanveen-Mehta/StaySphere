// Yaha Ham sab Kuch require karenge
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 8080;
const path = require("path");
const methodOverride = require("method-override");
const Listing = require("./models/listing");
const wrapAsync = require("./utils/wrapAsync");
const listingRouter = require("./routes/listing.js");
//---------------------------------------------------------------------------------------------------------------

// Yaha ham sab Set aur use karenge 
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use("/listings", listingRouter);
//-----------------------------------------------------------------------------------------------------------------

// Yaha ham Server Start ki confirmation lenge
app.listen(port, function () {
    console.log("Server Started and listening on Port 8080 ✅");
})
//-----------------------------------------------------------------------------------------------------------------

// Yaha Ham database se connect karenge 
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/StaySphere');
}

try {
    main();
    console.log("Connected to DB 🔗 ✅ 📊");
    
} catch (err) {
    alert("Connection to DB failed contact Developer and let him know");
    console.log(err)
}
//-----------------------------------------------------------------------------------------------------------------

// Yaha ham root route create karenge 

try {
    app.get("/", async function (req, res) {
        res.render("login.ejs");                                                    
    });

} catch (err) {
    alert("Some Error Happened Contact Developer");
    
};

//---------------------------------------------------------------------------------------------------------------------------


//-----------------------------------------------------------------------------------------------------------------------------------

// YAha Ham error Handelling Middleware banayenge
app.use(function(err,req,res,next){
    let{status=500,message="Some Error Occured"} = err;
    res.status(status).send(err.message);
})




//---------------------------------------------------------------------------------------------------------------
