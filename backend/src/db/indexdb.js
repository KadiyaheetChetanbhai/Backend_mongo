import mongoose from 'mongoose';
import { DB_NAME } from "../constants.js";

// Connect to MongoDB
const connectdb = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
    }
    catch {
        (error) => {
            console.log("connection failed due to ", error);
            process.exit(1);
        }
    }
}
export default connectdb;