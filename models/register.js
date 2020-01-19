const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const registerSchema=new Schema({

register_fullname:{
        type:String
    },
    register_email:{
        type:String
    },
    register_password:{
        type:String
    }
   
});

const register=mongoose.model("register",registerSchema);
module.exports=register;