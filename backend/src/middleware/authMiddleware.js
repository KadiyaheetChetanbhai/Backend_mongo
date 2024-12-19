import jwt from "jsonwebtoken";
import { user } from "../models/user.model.js"; 

export const protect = async (req, res, next) => {
    let token;
    
    try {
            // Get token from header
            token = req.headers.authorization;

            // Verify token
            const verifytoken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

            const rootUser = await user.findOne({_id:verifytoken._id});
            next();
        } catch (error) {
            res.status(401).json({ message: "Not authorized, token failed" });
        }
}
