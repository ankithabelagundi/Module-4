const express = require('express');
const fs =require("fs");
const router =express.Router();

router.post("/",(req,res)=>{
    const data = JSON.parse(fs.readFileSync("db.jsson","utf-8"));
    const product={
        id:data.products.length+1,
        name:req.body.name,
        price:req.body.price,
        stock:req.body.stock
    };
    data.products.push(product);
    fs.writeFileSync("db.json", JSON.stringify(data,null,2));
    res.status(201).json(product);

});
router.get("/",(req,res)=>{
    const data=JSON.parse(fs.readFileSync("db.json","utf-8"));
    res.status(200).json(data.products);
});
module.exports=router;