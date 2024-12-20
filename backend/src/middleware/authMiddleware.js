import jwt from "jsonwebtoken";
import { user } from "../models/Users/user.model.js";

export const protect = async (req, res, next) => {
    let token;
    try {
         token = req.headers.authorization;
         token = token.split(" ")[1];
        console.log(process.env.TOKEN_SECRET)
        const verifytoken = jwt.verify(token,process.env.TOKEN_SECRET);
        
        const rootUser = await user.findOne({_id:verifytoken._id});

        
        if(!rootUser) {throw new Error("user not found")}

       
        req.rootUser = rootUser
        req.userId = rootUser._id

        next();

    }
    
     catch (error) {
        console.log(error);
        return res.status(500).json({ message: "internal server error " });
    }
}
