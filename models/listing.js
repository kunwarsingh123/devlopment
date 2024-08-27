const mongoose = require("mongoose");
const Review = require("./review.js");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
   url:String,
   filename:String,
  },
  price: Number,
  location: String,
  country: String,
  reviews:[{
              type:Schema.Types.ObjectId,
              ref:"Review"
  }],
  owner:{
    type:Schema.Types.ObjectId,
    ref:"User"
  }
});


//jab post delete hogi to review db bhi delete hoga
listingSchema.post("findOneAndDelete",async(listing)=>{
  if(listing)
    {
      await Review.deleteMany({_id:{$in: listing.reviews}});
    }
})
;

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;