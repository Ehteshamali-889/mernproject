const express=require('express');
const router=express.Router();

require('../db/conn');
const User=require("../model/userSchema");

router.get('/',(req,res)=>{
    res.send("Hello home from router");
});

router.post("/register",(req,res)=>{
    const {name,email,phone,work,password,cpassword}=req.body;
    // console.log(name);
    // console.log(email);
    if(!name|| !email || !phone || !work || !password || !cpassword){
        return res.status(422).json({error:"Plz fill the field property"});
    }
    User.findOne({email:email})
    .then((userExist)=>{
        if(userExist){
            return res.status(422).json({error:"Email Already Exists"});
        }
        const user=new User({name,email,phone,work,password,cpassword});
        user.save().then(()=>{
            res.status(201).json({message:"user registered successfully"});
        }).catch((err)=>res.status(500).json({error:"Failed to registered"}))
    }).catch(err=>{console.log(err)})
    // res.send("mera register page");
})

module.exports=router;