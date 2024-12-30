
import bcrypt from "bcrypt";
import User from "../models/userModel.js";
import { generateToken } from "../lib/utils.js";
import cloudinary from "../lib/cloudinary.js";

export const signUpController= async (req,res)=>{

    try {
        const { email, fullName,  password } = req.body;
    
        // Check if all fields are provided
        if (!email || !fullName  || !password) {
          const missingFields = [];
          if (!email) missingFields.push("email");
          if (!fullName) missingFields.push("fullName");
          if (!password) missingFields.push("password");
          return res.status(400).json({
            message: `The following fields are missing: ${missingFields.join(", ")}.`,
          });
        }
    
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          return res.status(400).json({ message: "Email already in use." });
        }
    
        // Hash the password before saving
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
    
        // Create a new user
        const newUser = new User({
          email,
          fullName,
          password: hashedPassword, // Store hashed password
        });
    
        // Save the user (triggers schema validation)
        if (newUser) {
            // generate jwt token here
            generateToken(newUser._id, res);
            await newUser.save();
      
            return res.status(201).json({
              _id: newUser._id,
              fullName: newUser.fullName,
              email: newUser.email,
              profilePic: newUser.profilePic,
            });
          } else {
            return res.status(400).json({ message: "Invalid user data" });
          }
    
        //return res.status(201).json({ message: "User registered successfully." });
      } catch (error) {
        if (error.name === "ValidationError") {
          // Catch validation errors
          const messages = Object.values(error.errors).map((err) => err.message);
          return res.status(400).json({ message: messages.join(", ") });
        }
        console.error("Signup Error:", error);
        return res.status(500).json({ message: "Internal server error." });
      }

}


export const loginController=async (req,res)=>{

    try {
        const { email, password } = req.body;
    
        // Check if email and password are provided
        if (!email || !password) {
          return res.status(400).json({ message: "Email and password are required." });
        }
    
        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
          return res.status(404).json({ message: "User not found." });
        }
    
        // Compare the provided password with the stored hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
          return res.status(400).json({ message: "Invalid credentials." });
        }
    
        // Generate a JWT token
        generateToken(user._id, res);

    res.status(200).json({
      message: "Login successful.",
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilePic,
    });
  } catch (error) {
        console.error("Login Error:", error);
        return res.status(500).json({ message: "Internal server error." });
      }

}

export const logoutController=async (req,res)=>{
     //if loggin out clear out all the cookies
     try {
        res.cookie("jwt", "", { maxAge: 0 });//"jwt" here is the cookiename that we gave in utils.js
        res.status(200).json({ message: "Logged out successfully" });
      } catch (error) {
        console.log("Error in logout controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
      }
}

export const updateProfileController = async (req, res) => {
  try {
    const { profilePic, email, fullName } = req.body; // Destructure email and fullName
    const userId = req.user._id;

    // Validate inputs
    if (!email && !fullName && !profilePic) {
      return res.status(400).json({ message: "At least one field (email, fullName, or profilePic) must be provided" });
    }

    const updateData = {}; // Object to hold fields to update

    // If profilePic is provided, upload it and add to updateData
    if (profilePic) {
      const uploadResponse = await cloudinary.uploader.upload(profilePic);
      updateData.profilePic = uploadResponse.secure_url;
    }

    // If email is provided, add to updateData
    if (email) {
      updateData.email = email;
    }

    // If fullName is provided, add to updateData
    if (fullName) {
      updateData.fullName = fullName;
    }

    // Update user in database
    const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true });

    res.status(200).json(updatedUser); // Send updated user data
  } catch (error) {
    console.log("Error in updateProfileController:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


export const checkAuthController=(req,res)=>{

    try {
        res.status(200).json(req.user);
      } catch (error) {
        console.log("Error in checkAuth controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
      }

}


