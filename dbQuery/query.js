

const fetchRecord = function(cursor,query,options,isMultipleRecord){
    return new Promise((resolve,reject)=>{
        if(!isMultipleRecord){
            cursor.findOne(query,options).then((data=>{
                resolve(data);
            })).catch((e)=>{
                resolve(e);
            })
        }
        else{
            cursor.find(query,options).then((data=>{
                resolve(data);
            })).catch((e)=>{
                resolve(e);
            })
        }
        
    })
    
}

const insertRecord = function(cursor,record,isMultipleRecord){
    return new Promise((resolve,reject)=>{
        if(!isMultipleRecord){
            cursor.insertOne(record).then((data=>{
                resolve(data);
            })).catch((e)=>{
                resolve(e);
            })
        }
        else{
            cursor.insertMany(insertOne).then((data=>{
                resolve(data);
            })).catch((e)=>{
                resolve(e);
            })
        }
        
    })
}



module.exports ={
    "fetchRecord" :fetchRecord,
    "insertRecord" : insertRecord,
}