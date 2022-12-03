const {postMethod} = require("./postMethod");


const handleRequest = function(app,client){
    postMethod(app,client);
}


module.exports = {
    "handleRequest" : handleRequest
}