const express=require("express");
const app = express();



const session=require("express-session");
const flash=require("connect-flash");
const path = require("path");

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

app.use(session({
    secret:"mysupersecretstring" ,
resave:false,
saveUninitialized:true}));

app.get("/getcookies",(req,res)=>{
    res.cookie("greet","hello");
})

app.use(flash());


app.get("/test",(req,res)=>{
    res.send("test succesfull");
})

app.get("/register",(req,res)=>{
    let {name}=req.query;
    req.session.name=name;
    req.flash("success","User registerd successfully!");
    res.redirect("/hello");
});

app.get("/hello",(req,res)=>{
    res.locals.messgages=req.flash("success");
    res.render("page.ejs",{name:req.session.name});
})



// app.get("/reqaccount",(req,res)=>{
//     if(req.session.count)
//         {
//             req.session.count++;
//         }

//         else{
//             req.session.count=1;
//         }

//         res.send(`you sent a request ${req.session.count} timea`);
// })

app.listen(3000,()=>{
    console.log("Server is running");
})