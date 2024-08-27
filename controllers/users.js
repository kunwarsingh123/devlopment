const User=require("../models/user");

//signup
module.exports.Signups=(req,res)=>{
    res.render("users/signup.ejs");
}

//signups
module.exports.sign=async(req,res)=>{
    try{ let{username,email,password}=req.body;
    const newUser=  new User({email,username});
   const registeredUser= await  User.register(newUser,password);
   console.log(registeredUser);
   // apne aap login kar le signup ke baad
   req.login(registeredUser,(err)=>{
    if(err){
        return next(err);
    }
    req.flash("success","user was registered");
    res.redirect("/listing");
   });
}
   catch(e){
    req.flash("error",e.message);
    res.redirect("/signup");
   }
   
}


//loginformrender
module.exports.renderloginform=(req,res)=>{
    res.render("users/login.ejs")
}

module.exports.postloginform=async(req,res)=>{
    req.flash("success","welcome back");
    let redirectUrl=res.locals.redirectUrl || "/listing";
    res.redirect(redirectUrl);
}

//logut
module.exports.logoutform=(req,res,next)=>{
    req.logout((err)=>{
        if(err){
          return  next(err);
        }
        req.flash("Success","you are logged out!");
        res.redirect("/listing");
    });
}