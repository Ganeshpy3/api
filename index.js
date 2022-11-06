const express = require("express");
const app = express();
const data = require("./data.json")

let port = process.env.PORT || 3000

app.get("/",(req,res) =>{
    res.send("hello");
})
app.get("/get",(req,res)=>{
    res.send(data);
})

app.listen(port,"0.0.0.0",()=>{
    console.log(`running on ${port}`)
})