const Review=require("../models/review");
const Listing=require("../models/listing")

//create review route
module.exports.createreview=async(req,res)=>{
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
    
  
    listing.reviews.push(newReview);
    
  
    await newReview.save();
    await listing.save();
  
    console.log("new review saved");
    req.flash("success","New review created!...");
  res.redirect(`/listing/${listing._id}`);
  
  }

  //delete route
  module.exports.deleteroute=async(req,res)=>{
    let{id,reviewId}=req.params;
    await Listing.findByIdAndUpdate(id,{$pull: {reviews: reviewId}});
    await Review.findById(reviewId);
    req.flash("success","New review Deleted!...");
    res.redirect(`/listing/${id}`);
  
  }