const express=require('express');
const mongoose=require('mongoose');
const app=express();

const DB="mongodb+srv://admin:admin@cluster0.77qxn.mongodb.net/mernstack?retryWrites=true&w=majority";

mongoose.connect(DB,{
    // useNewUrlParse:true,
    // useCreateIndex:true,
    // useUnifiedTopology:true,
    // useFindAndModify:false   
}).then(()=>{
    console.log("Connection successful");
}).catch((err)=>{
    console.log("No connection"+err);
})

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
app.listen(3000,()=>{
    console.log("Server at 3000 port");
})