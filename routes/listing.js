const express= require("express");
const router=express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const {listingSchema,reviewSchema}=require("../schema.js");
const ExpressError= require("../utils/ExpressError.js");
const Listing = require("../models/listing.js");
const {isLoggedIn}=require("..//middleware.js");
const {isOwner,validateListing}=require("..//middleware.js");
const listingController=require("../controllers/listingss.js")
const multer  = require('multer')

const {storage}=require("../cloudConfig.js");

const upload = multer({storage});



// joi ko middleware ki trah use karo server side validation


router.route("/")
.get(wrapAsync(listingController.index))
.post( isLoggedIn, upload.single('listing[image]'), validateListing,wrapAsync(listingController.createroute));




   // new route
   router.get("/new",isLoggedIn,listingController.renderNewform)
  
  

router.route("/:id")
.get(wrapAsync(listingController.showroute))
.put(isLoggedIn,isOwner,upload.single('listing[image]'),validateListing, wrapAsync(listingController.updateroute))
.delete(isLoggedIn,isOwner,wrapAsync(listingController.deleteroute));


  
   
   
       



    
    
    // edit rout
    
   router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingController.editroute));
    //update
 

    

module.exports=router;