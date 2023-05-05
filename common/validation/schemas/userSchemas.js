const userSchema ={

    userName:{
        type:"string",
        maxLength:26
    },
    email:{
        type:"string",
        maxLength:null
    },
    department:{
        type:"string",
        maxLength:24
    }

}
module.exports = userSchema