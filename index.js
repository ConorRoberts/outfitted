const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.get("/",(req,res)=>{
    res.send({hello:"stinky"});
})

app.listen(3001);