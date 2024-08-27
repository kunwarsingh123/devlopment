

const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

main().then((res)=>{
   console.log("connection succesfully");
}).
catch(err => console.log(err));

async function main() {
 await mongoose.connect('mongodb://127.0.0.1:27017/listening');

 
}

const initDB = async () => {
  await Listing.deleteMany({});
 initData.data= initData.data.map((obj)=>({...obj,owner:"666854fad767bfe74a318e1d"}));
  await Listing.insertMany(initData.data);
  console.log("data was initialized");
};

initDB();