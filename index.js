const express = require("express");
const app = express();
const bodyparser = require('body-parser');
app.use(bodyparser.json());
require('dotenv').config()
const {accounts} = require("./dbQuery/setup");
const {handleRequest} = require("./router/requestHandler")
const { MongoClient, ServerApiVersion } = require("mongodb");
const uri =
  `mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@${process.env.SERVER}/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { serverApi: ServerApiVersion.v1 });

client.connect().then( ()=>{
    console.log("Connected");
}).catch((e) =>{ 
    console.log("Error" ,e);
})
let port = process.env.PORT || 3000

handleRequest(app,client);


app.listen(port,"0.0.0.0",()=>{
    console.log(`running on ${port}`)
})