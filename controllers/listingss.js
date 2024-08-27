const Listing=require("../models/listing");
module.exports.index=async(req,res)=>{
    const alllisting= await  Listing.find({});
    res.render("listings/index.ejs", { alllisting })}


    // new route

    module.exports.renderNewform=(req,res)=>{
 
        res.render("listings/new.ejs");
    };


    //show route
    module.exports.showroute=async(req,res)=>{
   
        let{id}=req.params;
        const listing = await Listing.findById(id).populate("reviews").populate("owner");
        if(!listing)
         {
           req.flash("error","Listing you requested does not exit!...");
           res.redirect("/listing");
         }
     else {res.render("listings/show.ejs", { listing })}};

     //create route

     module.exports.createroute=async(req,res,next)=>{
 
let url=req.file.path;
let filename=req.file.filename;
   //  console.log(url,"..",filename);
         const newlisting=  new Listing(req.body.listing);
         console.log(req.user);
     newlisting.owner=req.user._id;
     newlisting.image={url,filename};
         await newlisting.save();
req.flash("success","New Listing created!...");

        res.redirect("/listing");
     
     
    
    }


    //edit route

module.exports.editroute=async (req,res)=>{
        
    let{id}=req.params;
    const listing = await Listing.findById(id);
    if(!listing)
    {
        req.flash("error","listing you requested for does not exist")
        res.redirect("/listings")
    }
let originalImageUrl = listing.image.url;
  originalImageUrl=originalImageUrl.replace("/upload","/upload/h_300,w_250");

    res.render("listings/edit.ejs",{ listing ,originalImageUrl});

};

//update route
module.exports.updateroute=async(req,res)=>{
    let{id}=req.params;
   
let list=await  Listing.findByIdAndUpdate(id,{...req.body.listing});
if(typeof req.file!=="undefined"){
let url=req.file.path;
let filename=req.file.filename;

list.image={url,filename};
await list.save();
}

  req.flash("success","Listing is updated!...");
res.redirect(`/listing/${id}`);
}

//delete route
module.exports.deleteroute=async (req,res)=>{
    let { id }=req.params;
   let deletedListing = await Listing.findByIdAndDelete(id);
   console.log(deletedListing);
   req.flash("success","Listing is Deleted!...");
   res.redirect("/listing");
}