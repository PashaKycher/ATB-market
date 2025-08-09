import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

if(!process.env.MONGO_URL){
    throw new Error("MONGO_URL is not defined");
}
async function connectDB(){
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log("Error connecting to MongoDB",error);
        process.exit(1);
    }
}
export default connectDB;