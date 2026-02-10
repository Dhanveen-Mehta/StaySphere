// Yaha Ham sab Kuch require karenge
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port =8080;
const path = require("path");
const methodOverride = require("method-override");
const Listing = require("./models/listing");
//---------------------------------------------------------------------------------------------------------------

// Yaha ham sab Set aur use karenge 
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
//-----------------------------------------------------------------------------------------------------------------

// Yaha ham Server Start ki confirmation lenge
app.listen(port,function(){
    console.log("Server Started and listening");
})
//-----------------------------------------------------------------------------------------------------------------

// Yaha Ham database se connect karenge 
async function main(){
     await mongoose.connect('mongodb://127.0.0.1:27017/StaySphere');
}

try{
    main();
    console.log("Connected to DB");

}catch(err){
    alert("Connection to DB failed contact Developer and let him know");
    console.log(err)
}
//-----------------------------------------------------------------------------------------------------------------

// Yaha ham root route create karenge 

try{
    app.get("/", async function(req,res){
        res.send("Root is working Fine ");
    });

}catch(err){
    alert("Some Error Happened Contact Developer");

};

//---------------------------------------------------------------------------------------------------------------------------

// Yaha se hum Index Route ya Read Route create karenge

app.get("/listings", async function(req,res){
    let allListings = await Listing.find({});
    //console.log(allListings);
    res.render("listing/listing.ejs",{allListings})
})
//-----------------------------------------------------------------------------------------------------------------------------

// Yaha Hum show route banayenge joh particular post ko dekhne ke liye 

app.get("/listings/:id/show", async function(req,res){
    let {id}= req.params;
    let searchedListing = await Listing.findById(id);
    res.render("listing/detail.ejs",{searchedListing})
});
//------------------------------------------------------------------------------------------------------------------------------

// Yaha Ham New Listing ko add karne ke liye route banayenge

app.get("/listings/new", async function(req,res){
    res.render("listing/new.ejs");
})

app.post("/listings/new", async function(req,res){
    let{title,description,url,price,country,location} = req.body;
    let newListing = new Listing({
        title:title,
        description:description,
        image:{
            url:url
        },
        price:price,
        location:location,
        country:country
    });
    await newListing.save();
    console.log("Data Saved Safely")
    //console.log(title,description,url,price,country,location);
   res.redirect("/listings");
})
//-----------------------------------------------------------------------------------------------------------------------------

//Yaha ab hum listing ki details ko edit aur update karne ke liye route create karenge
app.get("/listings/:id/edit", async function(req,res){
    let {id}=req.params;
    let searchedListing = await Listing.findById(id);
    res.render("listing/edit.ejs",{searchedListing});
});

app.put("/listings/:id/edit", async function(req,res){
    let{title,description,url,price,country,location} = req.body;
    let {id} = req.params;
    let updatedListing = await Listing.findByIdAndUpdate(id,{
        title:title,
        description:description,
        image:{
            url:url
        },
        price:price,
        location:location,
        country:country
    });
    //await updatedListing.save();
    console.log("Data Updated Safely");
    res.redirect("/listings");

});
//----------------------------------------------------------------------------------------------------------------------------------

// Yaha ham delete route create karenge joh hamari listing ko delete karr dega 
app.delete("/listings/:id/delete", async function(req,res){
    let {id} = req.params;
    let searchedListing = await Listing.findByIdAndDelete(id);
    console.log("Listing Deleted",searchedListing);
    res.redirect("/listings");
});
//-----------------------------------------------------------------------------------------------------------------------------------

