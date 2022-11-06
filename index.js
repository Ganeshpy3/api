const express = require("express");
const app = express();
const data = require("./data.json")

let port = process.env.port || 3000

app.get("/",(req,res) =>{
    res.send("hello");
})
app.get("/get",(req,res)=>{
    res.send(data);
})

app.listen(port,()=>{
    console.log(`running on ${port}`)
})