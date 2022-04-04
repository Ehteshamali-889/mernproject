const express=require('express');
const router=express.Router();

require('../db/conn');
const User=require("../model/userSchema");

router.get('/',(req,res)=>{
    res.send("Hello home from router");
});

// using promise
// router.post("/register",(req,res)=>{
//     const {name,email,phone,work,password,cpassword}=req.body;
    
//     if(!name|| !email || !phone || !work || !password || !cpassword){
//         return res.status(422).json({error:"Plz fill the field property"});
//     }
//     User.findOne({email:email})
//     .then((userExist)=>{
//         if(userExist){
//             return res.status(422).json({error:"Email Already Exists"});
//         }
//         const user=new User({name,email,phone,work,password,cpassword});
//         user.save().then(()=>{
//             res.status(201).json({message:"user registered successfully"});
//         }).catch((err)=>res.status(500).json({error:"Failed to registered"}))
//     }).catch(err=>{console.log(err)})
  
// })

// Async-Await 
router.post("/register",async(req,res)=>{
    const {name,email,phone,work,password,cpassword}=req.body;
    
    if(!name|| !email || !phone || !work || !password || !cpassword){
        return res.status(422).json({error:"Plz fill the field property"});
    }
    try{
        const userExist=await User.findOne({email:email});
        if(userExist){
            return res.status(422).json({error:"Email Already Exists"});
        }
        const user=new User({name,email,phone,work,password,cpassword});
        await user.save();
        res.status(201).json({message:"user registered successfully"});
        
        
    }
    catch(err){
        console.log(err);
    }
    
  
})

// login route
router.post('/signin',async(req,res)=>{
    // console.log(req.body);
    // res.json({message:"awesome"});
    try{
        const {email,password}=req.body;
        if(!email || !password){
            return res.status(400).json({error:"Please Fill the data"});
        }
        const userLogin=await User.findOne({email:email});
        console.log(userLogin);
        if(!userLogin){
            res.json({error:"User Error"});
        }
        else{
            res.json({message:"User Signin Successfully"});
        }
        
    }
    catch(err){
        console.log(err);
    }
})

module.exports=router;