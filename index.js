const express = require("express");
const app = express();
const data = require("./data.json");
const {findRecord} = require("./db");

const { MongoClient, ServerApiVersion } = require("mongodb");
const uri =
  `mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@${process.env.SERVER}/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { serverApi: ServerApiVersion.v1 });

client.connect().then( ()=>{
    console.log("Connected");
}).catch((e) =>{ 
    console.log("Error");
})
let port = process.env.PORT || 3000

app.get("/",(req,res) =>{
    res.send("hello");
})
app.get("/get",(req,res)=>{
    res.send(data);
})

app.get("/new",(req,res)=>{
    try{
        findRecord(client,"sample_analytics","customers",{}).then(data =>{
                    res.status(200).send(data);
                })
    }
    catch(e){
        res.send(e);
    }

})

app.listen(port,"0.0.0.0",()=>{
    console.log(`running on ${port}`)
})