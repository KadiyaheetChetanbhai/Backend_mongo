import mongoose from 'mongoose';
import { DB_NAME } from "../constants.js";
import dotenv from 'dotenv';
dotenv.config();


// Connect to MongoDB
const connectdb = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
        console.log(`MongoDB connected: ${3000}`);  
        console.log(`$connectionInstance.connection.host`);  
    }
    catch {
        (error) => {
            console.log("connection failed due to ", error);
            process.exit(1);
        }
    }
}
export default connectdb;