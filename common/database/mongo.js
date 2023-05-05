const mongoose = require('mongoose');
const userModel = require('./models/userModel');
const process = require('process');

class Mongo{
    static connection;

    static async initMongoConnection(){
        try{
            this.connection = await mongoose.createConnection(process.env.MONGO_URL);
            console.log("Mongo Connection successful")
        }catch(e){
            console.log("Error Occurred while creating mongo connection", e);
            process.exit(1);
        }
    }
    
    async createUser(body){
        try{
            const model = await userModel.createModel(Mongo.connection);
            const result = await model.create(body);
            delete result._id;
            delete result.__v;
            return result;
        }catch(e){
            console.log("Error Occurred while creating user", e);
        }
    }

    async getUser(userId){
        try{
            const model = await userModel.createModel(Mongo.connection);
            const result = await model.findOne({id:userId});
            return result;
        }catch(e){
            console.log("Error Occurred while fetching user", e);
        }
    }

    async replaceUser(userId,body){
        try{
            const model = await userModel.createModel(Mongo.connection);
            const result = await model.findOneAndReplace({id:userId},body,{new:true});
            return result;
        }catch(e){
            console.log("Error Occurred while replace user", e);
        }
    }

    async updateUser(userId,body){
        try{
            const model = await userModel.createModel(Mongo.connection);
            const result = await model.findOneAndUpdate({id:userId},{$set:body},{new:true});
            return result;
        }catch(e){
            console.log("Error Occurred while update user", e);
        }
    }

    async deleteUser(userId){
        try{
            const model = await userModel.createModel(Mongo.connection);
            const result = await model.findOneAndDelete({id:userId});
            return result;
        }catch(e){
            console.log("Error Occurred while deleting user", e);
        }
    }
}

module.exports = Mongo;