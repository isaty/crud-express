const userModel = require('../../common/database/models/userModel');
const Mongo = require('../../common/database/mongo');
const uuid = require('uuid');

class UserService{
    mongo;
    constructor(){
        this.mongo = new Mongo();
    }

    /**
     * 
     */
    async getUser(userId){
        try{
            console.log("Starting to fetch user");
            const user = await this.mongo.getUser(userId);
            console.log("User fetched successfully");
            return user;
        }catch(e){
            console.log("Error Occurred while creating user",e);
            throw e;
        }
    }

    /**
     * 
     */
    async createUser(requestBody){
        try{
            requestBody.id = uuid.v4();
            console.log("Starting to create user");
            const user = await this.mongo.createUser(requestBody);
            console.log("User created successfully");
            return user;
        }catch(e){
            console.log("Error Occurred while creating user",e);
            throw e;
        }
    }

    /**
     * 
     */
    async replaceUser(userId,requestBody){
        try{
            console.log("Starting to fetch user");
            const record = await this.mongo.getUser(userId);
            console.log("User fetched successfully");
            
            if(!record){
                throw {"details":"user not found"};
            }
            requestBody.id = record.id;
            console.log("Starting to replace user");
            const user = await this.mongo.replaceUser(userId,requestBody);
            console.log("User replaced successfully",user);
            return user;
        }catch(e){
            console.log("Error Occurred while replacing user",e);
            throw e;
        }
    }

    /**
     * 
     */
    async patchUser(userId,requestBody){
        try{
            console.log("Starting to fetch user");
            const record = await this.mongo.getUser(userId);
            console.log("User fetched successfully");
            
            if(!record){
                throw {"details":"user not found"};
            }
            
            console.log("Starting to update user");
            const user = await this.mongo.updateUser(userId,requestBody);
            console.log("User updated successfully");
            return user;
        }catch(e){
            console.log("Error Occurred while updating user",e);
            throw e;
        }
    }

    /**
     * 
     */
    async deleteUser(userId){
        try{
            console.log("Starting to deleted user");
            const user = await this.mongo.deleteUser(userId);
            console.log("User deleted successfully");
            return user;
        }catch(e){
            console.log("Error Occurred while deleting user",e);
            throw e;
        }
    }

}

module.exports = new UserService();