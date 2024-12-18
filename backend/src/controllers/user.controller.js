import { user } from "../models/user.model.js"; 

// **Register User**
export const registerUser = async (req, res) => {
    try {
        const { name, email, Phone_No, password } = req.body;

        // Check if user already exists
        const existingUser = await user.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Create new user
        const newUser = await user.create({ name, email, Phone_No, password });

        // Generate tokens
        const accessToken = newUser.generateAccessToken();
        const refreshToken = newUser.generateRefreshToken();

        res.status(201).json({
            message: "User registered successfully",
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
            },
            accessToken,
            refreshToken,
        });
    } catch (error) {
        res.status(500).json({ message: "Registration failed", error: error.message });
    }
};

// **Login User**
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const existingUser = await user.findOne({ email });
        if (!existingUser) {
            return res.status(404).json({ message: "User not found" });
        }

        // Verify password
        const isCorrectPassword = await existingUser.isPasswordCorrect(password);
        if (!isCorrectPassword) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Generate tokens
        const accessToken = existingUser.generateAccessToken();
        const refreshToken = existingUser.generateRefreshToken();

        res.status(200).json({
            message: "Login successful",
            accessToken,
            refreshToken,
        });
    } catch (error) {
        res.status(500).json({ message: "Login failed", error: error.message });
    }
};

// **Get User Details**
export const getUserProfile = async (req, res) => {
    try {
        const userProfile = await user.findById(req.user._id).select("-password");
        if (!userProfile) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(userProfile);
    } catch (error) {
        res.status(500).json({ message: "Error fetching profile", error: error.message });
    }
};
