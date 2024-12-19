import { user } from "../models/user.model.js";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
const keysecreat = process.env.TOKEN_SECRET;
import jwt from "jsonwebtoken";


// email config

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
})


// **Register User**
export const registerUser = async (req, res) => {
    const { name, email, Phone_No, password, confirm_password } = req.body;

    try {


        //to check if all details are filled or not 
        if (!name || !email || !Phone_No || !password || !confirm_password) {
            console.log("error")
            res.status(422)    //unprocessable entity 
        }


        // Check if user already exists
        const existingUser = await user.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        } else if (password !== confirm_password) {
            res.status(422).json({ error: "please give same password as confirm password" })
        } else {
            // Create new user
            const newUser = new user({ name, email, Phone_No, password, confirm_password });
            //generate tokens 
            const accessToken = newUser.generateAccessToken();
            const storedata = await newUser.save();
            res.status(201).json({
                message: `User registered successfully with details `,
                user: storedata,
                accessToken,
            });
        }
    } catch (error) {
        res.status(500).json({ message: "Registration failed", error: error.message });
    }
};



// **Login User**
export const loginUser = async (req, res) => {
    console.log(req.body);

    try {
        const { email, password } = req.body;

        if (!email || !password) {
            res.status(422).json({ error: "fill the details " })
        }

        // Check if user exists
        const existingUser = await user.findOne({ email });
        if (!existingUser) {
            return res.status(404).json({ message: "User not found" });
        }

        // Verify password
        const isCorrectPassword = await bcrypt.compare(password, existingUser.password)
        if (!isCorrectPassword) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Generate tokens
        const accessToken = await existingUser.generateAccessToken();
        //console.log(accessToken)   to check for access token

        res.status(200).json({
            message: "Login successful",
            accessToken,
        });
    } catch (error) {
        res.status(500).json({ message: "Login failed", error: error.message });
    }
};




//userlogout

export const userlogout = async (req, res) => {
    try {
        //code to logout user
        req.user.tokens = req.user.tokens.filter((currElement) => {
            return currElement.token !== req.token
        })
        req.user.save();
        res.status(201).json({ message: "user logout successfully" })

    }
    catch {
        (error) => {
            res.status(422).json({ error })
        }
    }
};

// send email Link For reset Password
export const resetpassword = async (req, res) => {
    console.log(req.body, "reset password")

    const { email } = req.body;

    if (!email) {
        res.status(401).json({ status: 401, message: "Enter Your Email" })
    }
    console.log(email)
    try {
        const userfind = await user.findOne({ email: email });
        console.log(userfind, "userfind")

        // token generate for reset password
        const token = jwt.sign({ _id: userfind._id }, keysecreat, {
            expiresIn: "5m"
        });
        console.log(token, "token")

        const setusertoken = await user.findByIdAndUpdate({ _id: userfind._id }, { verifytoken: token }, { new: true });
        console.log(setusertoken, "setusertoken")
        if (setusertoken) {
            const mailOptions = {
                from: process.env.EMAIL,
                to: email,
                subject: "Sending Email For password Reset",
                text: `This Link Valid For 5 MINUTES http://localhost:3000/forgotpassword/${userfind.id}/${setusertoken.verifytoken}`
            }

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log("error", error);
                    res.status(401).json({ status: 401, message: "email not send" })
                } else {
                    console.log("Email sent", info.response);
                    res.status(201).json({ status: 201, message: "Email sent Succsfully" })
                }
            })
            res.status(200).json(setusertoken)

        }
    } catch (error) {
        res.status(401).json({ status: 401, message: "invalid user" })
    }
};
// verify user for forgot password time
export const forgotpassword = async (req, res) => {
    const { id, token } = req.body;

    try {
        console.log(id, token)
        const validuser = await user.findOne({ _id: id, verifytoken: token });

        const verifyToken = jwt.verify(token, keysecreat);
        console.log("reached")
        console.log(verifyToken)
        console.log(validuser)

        if (validuser && verifyToken._id) {
            res.status(201).json({ status: 201, validuser })
        } else {
            res.status(401).json({ status: 401, message: "user not exist" })
        }

    } catch (error) {
        res.status(401).json({ status: 401, error, message: "trouble happend" })
    }
};


export const changepassword=async(req,res)=>{
    const {id,token} = req.params;

    const {password} = req.body;

    try {
        const validuser = await userdb.findOne({_id:id,verifytoken:token});
        
        const verifyToken = jwt.verify(token,keysecret);

        if(validuser && verifyToken._id){
            const newpassword = await bcrypt.hash(password,12);

            const setnewuserpass = await userdb.findByIdAndUpdate({_id:id},{password:newpassword});

            setnewuserpass.save();
            res.status(201).json({status:201,setnewuserpass})

        }else{
            res.status(401).json({status:401,message:"user not exist"})
        }
    } catch (error) {
        res.status(401).json({status:401,error})
    }
};











