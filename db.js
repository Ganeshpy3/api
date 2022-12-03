

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

const createUser = function(client,newUser){
    return new Promise(function (resolve,reject){
        var obj= {"EMAIL":"test@gmail.com","PASSWORD":"32","Added_Time":new Date()};
        client.db("accounts").collection("IAM").insertOne(obj).then( res =>{
            resolve(res)
        }).catch(e =>{
            reject(e)
        })
    })
}

const findUser = function(client){
    return new Promise(function (resolve,reject){
        client.db("accounts").collection("IAM").findOne({"EMAIL":"test@gmsail.com"}).then( res =>{
            if(!res){
                resolve(true)
            }
            resolve(false)
        }).catch(e =>{
            reject(e)
        })
    })
}

module.exports = {
    "findRecord":findRecord,
    "createUser":createUser,
    "findUser" : findUser

}
