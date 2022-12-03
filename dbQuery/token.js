const  SHA256 = require("crypto-js/sha256");

var date = new Date();
var userID ="1";
var a= SHA256(userID+date.getTime()+date.getDate() * date.getFullYear() * date.getMilliseconds()+"")+"";

console.log(a)

