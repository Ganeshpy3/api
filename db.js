// const { MongoClient, ServerApiVersion } = require("mongodb");
// const uri =
//   "mongodb+srv://root:6m3vFT2dYDEWAXBF@db.u7h1jzi.mongodb.net/?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { serverApi: ServerApiVersion.v1 });


// async function run() {
//   try {
//     // Connect the client to the server (optional starting in v4.7)
//     await client.connect();
//     // Establish and verify connection
//     await client.db("sample_airbnb").listCollections();
//     console.log("Connected successfully to server");
//     const cursor =await client.db("sample_airbnb").listCollections();

//     const a = await client.db("sample_airbnb").collection("listingsAndReviews").find({});
//     await a.forEach(doc => console.log(doc));

//   await cursor.forEach(doc => console.log(doc));

//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);

const getCollectionList = async function(client,dbName){

    return new Promise( async (resolve,reject) =>{
        try{
            const collectionList = await client.db(dbName).listCollections();
            var obj = []
            await collectionList.forEach(element => {
                obj.push(element)
            });

            resolve(obj)
        }
        catch(e){
            reject("error")
        }
        
    })

}

const findRecord = async function(client,dbName,collectionName,queryObj){

    return new Promise( async (resolve,reject) =>{
        try{
            const records = await client.db(dbName).collection(collectionName).find(queryObj).limit(10);
            var obj = []
            await records.forEach(rec =>{
                delete rec._id;
                delete rec.tier_and_details;
                obj.push(rec);
            })
            resolve(obj);
        }
        catch(e){
            reject("error")
        }
        
    })

}

// try{
//     client.connect().then( ()=>{
//         console.log("Connected");
//     })
//     // getCollectionList(client,"sample_airbnb").then(data=>{
//     //     console.log(data);
//     // });

//     findRecord(client,"sample_analytics","customers",{}).then(data =>{
//         console.log(data);
//     })

// }
// catch(e){
//     console.log("Error in connections",e);
// }

module.exports = {
    "findRecord":findRecord

}
