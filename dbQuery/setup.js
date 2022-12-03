const {accountSignUp} = require("./accounts");

var setup = {


}

const account = async function(client,type,data){
    var cursor = client.db("accounts");
    if(type == "signup"){
        return await accountSignUp(cursor,data);
    }
    else if(type == "login"){
        return await accountSignUp(cursor,data);
    }

}





module.exports = {
    "queryHandler" : setup,
    "accounts": account
}