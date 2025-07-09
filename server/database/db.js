import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const USERNAME=process.env.DB_USERNAME;
const PASSWORD=process.env.DB_PASSWORD;


const Connection = async()=>{

    const URL =`mongodb+srv://${USERNAME}:${PASSWORD}@whatsapp-clone.7wz4ueb.mongodb.net/?retryWrites=true&w=majority&appName=Whatsapp-Clone`;
    try{
        await mongoose.connect(URL,{useUnifiedTopology : true});
        console.log("Database Connected");
    }catch(error){
        console.log("Error while connecting to database:",error.message);
    }
}

export default Connection;