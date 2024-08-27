const express= require("express");
const router=express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const paasport=require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const userController=require("../controllers/users.js")


router.route("/signup")
.get(userController.Signups)
.post(wrapAsync(userController.sign));




router.route("/login")
.get(userController.renderloginform)
.post(saveRedirectUrl,paasport.authenticate("local",{failureRedirect:'/login',failureFlash:true}), userController.postloginform
);


router.get("/logout",userController.logoutform);


module.exports=router;