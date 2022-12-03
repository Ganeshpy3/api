const {accounts} = require("../dbQuery/setup");

const postMethod = function(app,client){
    app.post("/signup",(req,res)=>{
        accounts(client,"signup",{"EMAIL":req.body.EMAIL,"PASSWORD":req.body.PASSWORD}).then(r=>{
            res.status(200).send(r);
        })
    })

    app.post("/login",(res,req)=>{
        console.log(res);
        accounts(client,"login",{"EMAIL":req.body.EMAIL,"PASSWORD":req.body.PASSWORD}).then(r=>{
            res.status(200).send(r);
        })
    })
}

module.exports = {
    "postMethod" : postMethod
}