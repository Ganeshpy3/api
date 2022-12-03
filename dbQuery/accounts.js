const bcrypt = require('bcrypt');
const { SHA256 } = require('crypto-js');
// const sha256 = require('')
const saltRounds = 10;
const {insertRecord,fetchRecord} = require("./query");
const createUser = function(db,userMap){
    return new Promise(function (resolve,reject){
        insertRecord(db.collection("IAM"),userMap,false).then(response =>{
            console.log(response);
            var dataMap = createAuthenticationRecord(response);
            insertRecord(db.collection("token"),dataMap,false).then(res =>{
                resolve({"ID":response.insertedId,"csrf":dataMap.Access_Token});

            })
            // resolve(response);
            
        })

    });
}

const encryptPassword = function(password){
    return new Promise( (resolve,reject) =>{
        bcrypt.genSalt(saltRounds, function(err, salt) {
            bcrypt.hash(password, salt, function(err, hash) {
                resolve(hash);
            });
        });

    }); 
}

const isUserAlreadyPresent = function(db,email){
    return new Promise(function (resolve,reject){
        fetchRecord(db.collection("IAM"),{"EMAIL":email},{'projection':{"_id" : 0,"EMAIL": 1 }},false).then( res =>{
                if(!res){
                    resolve(false)
                }
               resolve(true);
            }).catch(e =>{
                reject(e)
            })
    });
}

const signUp = async function(iam,userMap){
    return new Promise( async (resolve,reject)=>{
        var isUserAlreadyPresen = await isUserAlreadyPresent(iam,userMap.EMAIL);
        if(isUserAlreadyPresen){
            resolve({"status":"error","message":"User already exist"});
        }
        else{
            var hashedPassword = await encryptPassword(userMap.PASSWORD);
            userMap.PASSWORD = hashedPassword;
            const time = new Date();
            userMap.Added_Time = time;
            userMap.Modified_Time = time;
            userMap.Last_Login_Time =time;
            const res = await createUser(iam,userMap);
            resolve(res)
        }
    });
}

const createRefreshToken = function(userMap){
    var time = new Date();
    return SHA256(userMap.insertedId+time+""+saltRounds+Math.random()+"")+"";
}

const createAccessToken = function(resfreshToken){
    return SHA256(resfreshToken.length+resfreshToken+(Math.random()*Math.random()))+"";
}

const createAuthenticationRecord = function(userMap){
    console.log("hre");
    var resfreshToken = createRefreshToken(userMap);
    var dataMap = {
        "Refresh_Token":resfreshToken,
        "Access_Token":createAccessToken(resfreshToken),
        "ID" : userMap.insertedId,
        "Expiry_Time": getCurrentTime()+3600000
    }
    return dataMap;
}

const getCurrentTime = function(){
    var time = new Date();
    return time.getTime();
}

const login = function(db,credsMap){
    
}

// createAuthenticationRecord(null,{"insertedId":"1"})

module.exports = {
    "accountSignUp" : signUp,
    "accountlogin"  : login,
}
