const express = require('express');
const app = express();
const userModule = require('./api/userModule/userController');
const route = express.Router();
const bodyParser = require('body-parser');
const mongo = require('./common/database/mongo')
require('dotenv').config();

//Parsing body to read request parameters, query params and body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))

//initiating mongo connection
mongo.initMongoConnection();

//registering userModule
app.use('/user',userModule);

route.get('/ping',async(req,res,next)=>{
    return res.status(200).json({"message":"ping SuccessFul"});
});

route.post('/ping',async(req,res,next)=>{
    console.log(req.body.email);
    return res.status(200).json({"message":"ping SuccessFul"});
});

app.listen(3000,function(){
  console.log("Listening to port 3000");
})
