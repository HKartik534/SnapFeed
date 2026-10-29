const mongoose=require("mongoose")

async function connectDb() {
    await mongoose.connect("")
    console.log("Database connected");
    
    
}

module.exports=connectDb
