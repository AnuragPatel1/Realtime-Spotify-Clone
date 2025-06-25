import mongoose from "mongoose";

export async function connectDB(){
    try {
        await mongoose.connect(`${process.env.MONGO_URI}/spotify`)
        console.log("Database is connected successfully");
    } catch (error) {
        console.log("Error in connecting the database",error);
        process.exit(1);
    }
}