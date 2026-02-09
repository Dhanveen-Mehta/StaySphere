const mongoose = require("mongoose");
const initData = require("./init");
const Listing = require("../models/listing");





async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/StaySphere');
    
}

try{
    main();

}catch(err){
    alert("Error in Connecting to DB Try Contacting Developer");
    console.log(err)
}

async function dataInitilisation(){
    await Listing.deleteMany({});
    await Listing.insertMany(initData.data);
    console.log("Data Initialised");
    mongoose.disconnect();

}

try{
    dataInitilisation();

}catch(err){
    alert("Some Error happeded in inserting the data into DB contact Developer");
    console.log(err);
}

