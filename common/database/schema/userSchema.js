const { Schema } = require('mongoose');
const userSchema = new Schema({
    id:{
        type:String
    },
    userName:{
        type:String
    },
    email:{
        type:String
    },
    department:{
        type:String
    }
});

module.exports = userSchema;