const dotenv=require('dotenv');
const express=require('express');
const mongoose=require('mongoose');
const app=express();

dotenv.config({path:'./config.env'});
require('./db/conn');
const PORT=process.env.PORT;



// middleware
const middleware=(req,res,next)=>{
    console.log("Hello Middleware here");
    next();
}

app.get('/',(req,res)=>{
    res.send("Hello home");
});
app.get('/about',middleware,(req,res)=>{
    res.send("Hello about");
});
app.get('/contact',(req,res)=>{
    res.send("Hello contact");
});
app.get('/sign',(req,res)=>{
    res.send("Hello signin");
});
app.get('/signup',(req,res)=>{
    res.send("Hello signup");
});
app.listen(PORT,()=>{
    console.log(`Server at ${PORT}`);
})