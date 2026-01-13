const express= require('express');
const app = express();
 const PORT= 3000;

 app.get("/home",(req,res)=>{
    res.send({message:"This is Home Page"});
 });

 app.get("/aboutus",(req,res)=>{
    res.send({message:"This is About Us Page"});
 });

 app.get("/contact",(req,res)=>{
    res.send({message:" Contact Us at contact@contact .com"});
 });

 app.listen(PORT,()=>{
    console.log(`Server is Running on $(PORT)`)
 });
