const mongoose=require("mongoose");

const url="mongodb://localhost:27017/cookbook_api";
const connect=mongoose.connect(url,{useNewUrlParser:true,useCreateIndex:true,useUnifiedTopology:true});

connect.then(db=>{
    console.log("Server connected to database");
},err=>{
    console.log(err);
}
);
