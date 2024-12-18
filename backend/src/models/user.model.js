import mongoose, { Schema } from 'mongoose';
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        tolowercase: true,
        trim: true,
    },
    email: {
        type: String,
        required: [true,"please provide an email"],
        unique: true,
        lowercase: true,
        trim: true,
    },
    Phone_No: {
        type: Number,
        unique: true,
        required: false,
    },
    password: {
        type: String,
        required: [true, "please provide a password"],
    }

},
    { timestamps: true }
);

userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            name: this.username,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: "15m"
        }
    )
}
userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn:"15m"
        }
    )
}


export const user = mongoose.model('user', userSchema);