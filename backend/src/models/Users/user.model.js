import mongoose, { Schema } from 'mongoose';
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
const keysecreat = process.env.TOKEN_SECRET

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        tolowercase: true,
        trim: true,
    },
    email: {
        type: String,
        required: [true, "please provide an email"],
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
    },
    confirm_password: {
        type: String,
        required: [true, "please provide a confirm password"],
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    role:{
        type: String,
        enum: ["user", "admin"],
        default: "user"
        
    },
    verifytoken: {
        typr: String,
    }

},
    { timestamps: true }
);




//to hash password 
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10)
    this.confirm_password = await bcrypt.hash(this.password, 10)
    next()
})





userSchema.methods.generateAccessToken = async function () {
    try {
        let token = jwt.sign({
            _id: this._id,
            email: this.email,
            name: this.username,
        }, keysecreat, {
            expiresIn: "1d"
        })
        console.log(token)
        return token
    } catch {
        (error) => {
            console.log(error)
        }
    }
}

export const user = mongoose.model('users', userSchema);