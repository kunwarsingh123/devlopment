const express= require("express");
const router=express.Router({mergeParams:true});

//Async function use for error handling
const wrapAsync = require("../utils/wrapAsync.js");
// alag alag error show karna h
const ExpressError= require("../utils/ExpressError.js");


const {listingSchema,reviewSchema}=require("../schema.js");
const Review = require("../models/review.js");

const Listing = require("../models/listing.js");

const reviewController=require("../controllers/reviews.js")

//joi reviewSchema
const reviewlisting =(req,res,next)=>{
    let {error}=reviewSchema.validate(req.body);
  
    if(error)
     {
       throw new ExpressError(400,error);
     }
     else{
      next();
     }
  
  }
  
//review post route
router.post("/",reviewlisting,wrapAsync(reviewController.createreview));
  
  // review delete
router.delete("/:reviewId",wrapAsync(reviewController.deleteroute))
  
  module.exports=router;