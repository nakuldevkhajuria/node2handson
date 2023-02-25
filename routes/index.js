const express = require('express')
const { calculation, subs } = require("./controller/calculation")
//import cors
const cors = require('cors');
const app = express();//create and instance of express

//cross origin resourse sharing
// const whitelist = ["*"];//star means all the urls are allowed
const whitelist = ["http://localhost:3001"];

// we are creating an instance of cors -> where cors is activated and it will check weather the
//particular url is allowed or not

app.use(
    cors({
        origin:whitelist,
        methods: ["GET","POST"]
    })
);



//API middleware
const middleware = (req,res,next) =>{
    //login -> check if user is there in the db or we check user token is still active or if user session is still active
    //weather user is allowed to access this particular endpoint or not?
    //we certificates or we have security groups what we check here
    // console.log('before calculation')

    let result = calculation(2,3);//we are checking that if you are in db or not ?

    if(result === 5 ){
        next();
    }else{
        res.status(400).send("you are not allowed")
    }

    // if(password incoorect){
    //     next('/login')
    // }
    // else if(user does not exist){
    //     next('/signUp')
    // }
}




app.get("/",cors(),(req,res)=>{
    res.send('cors is used here')
    res.json({
        employee :[{name:"Nakul",
        designation: 'Data engineer',
        jobExperience : '2-3 Years'
    }]
        ,
    });
});

app.get("/home",middleware,(req,res)=>{
    // 
    res.json({
        employee :[{name:"nakul dev",}]
        ,
    });
   
});



app.get("/login",middleware,(req,res)=>{
    res.send('middleware 1 is used here')
})

app.get("/api",middleware,(req,res)=>{

//    console.log('Logged in')
res.send('middleware 1 is used here')
});

app.listen(3000,()=>{
    console.log(' code is running')
})
