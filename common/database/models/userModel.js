const mongoose = require('mongoose');
const userSchema = require('../schema/userSchema')
class UserModel{
    async createModel(connection){
        try{
            return connection.model('user',userSchema);
        }catch(e){
            console.log("Error Occurred while creating model",e);
        }
    } 
}
module.exports = new UserModel();
