import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js"

export const register = async(req, res) => {
    try
    {
        const {fullname, email, phoneNumber, password, workstatus} = req.body;
        if(!fullname || !email || !phoneNumber || !password || !workstatus){
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        };
        

        const file = req.file;
        const fileUri = getDataUri(file);
        const cloudResponse =  await cloudinary.uploader.upload(fileUri.content);

        console.log(fullname, email, phoneNumber, password, workstatus);
        console.log(cloudResponse);
        

        const user = await User.findOne({email});
        if(user){
            return res.status(400).json({
                message:'User already exist with same this email',
                success: false,
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log(fullname,email,phoneNumber, password, workstatus)

        const newUser = await User.create({
            fullname,
            email,
            phoneNumber,
            password:hashedPassword,
            workstatus,
            profile:{
                profilePhoto: cloudResponse.secure_url,
            }
        });

        console.log(newUser);
        

        return res.status(201).json({
            message:"Account created successfully",
            success: true
        });
    }
    catch (error) {
        console.error("Error during registration:", error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }    
}

export const login = async (req, res) => {
    try {
        const { id, password } = req.body;

        // Check if id or password is missing
        if (!id || !password) {
            return res.status(400).json({
                message: "Email/Phone and password are required",
                success: false
            });
        }

        let user;
        
        // Email and Mobile Number validation 
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
        const phoneRegex = /^[0-9]{10}$/;

        if (emailRegex.test(id)) {
            // If id is an email
            user = await User.findOne({ email: id });
            console.log(user.profile.profilePhoto);
            
        } else if (phoneRegex.test(id)) {
            // If id is a phone number
            user = await User.findOne({ phoneNumber: id });
            console.log(user.profile.profilePhoto);
        } else {
            return res.status(400).json({
                message: "Please provide a valid email or phone number",
                success: false
            });
        }


        // If no user is found
        if (!user) {
            return res.status(400).json({
                message: "Incorrect email/phone number or password",
                success: false,
            });
        }

        // Check if the password matches
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "Incorrect email/phone number or password",
                success: false
            });
        }

        // Create JWT token
        const tokenData = {
            userId: user._id
        };

        console.log(tokenData);

        const token = await jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' });

        console.log(`token = ${token}`)

        // Return user data and token in response, set httpOnly cookie
        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            workstatus: user.workstatus,
            profile: user.profile
        };

        res.status(200).cookie("token", token, { 
            maxAge: 1 * 24 * 60 * 60 * 1000, // 1 day
            httpOnly: true, // Ensure it’s not accessible via JavaScript
            sameSite: 'strict', // Ensure it’s only sent on same-site requests
            secure: process.env.NODE_ENV === 'production'? true : false // Only send cookie over HTTPS in production
        })
        return res.json({
        message: `Welcome back ${user.fullname}`,
        user,
        success: true
    });

        } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Server error, please try again later",
            success: false
        });
    }
};

export const logout = async(req, res) => {
    try{
        return res.status(200).cookie("token", "", {maxAge: 0}).json({
            message: "Logout successfully!",
            success: true
        })
    }
    catch(error){
        console.log(error);
    }
}

export const updateProfile = async(req, res) => {
    try{
        const {fullname, email, phoneNumber, bio, skills} = req.body;
        
        console.log(fullname, email, phoneNumber, bio, skills);
        
        const file = req.file;
        const fileUri = getDataUri(file);
        const cloudResponse =  await cloudinary.uploader.upload(fileUri.content);
        
        let skillsArray;
        if (skills) {
            skillsArray = skills.split(",");
        }

        const userId = req.id;
        let user = await User.findById(userId);

        if(!user){
            return res.status(400).json({
                message: "User not found.",
                success: false
            })
        }

        if(fullname) user.fullname = fullname
        if(email) user.email = email
        if(phoneNumber) user.phoneNumber = phoneNumber
        if(bio) user.profile.bio = bio
        if(skills) user.profile.skills = skillsArray

        if(cloudResponse){
            user.profile.resume = cloudResponse.secure_url
            user.profile.resumeOriginalName = file.originalname
        }

        await user.save();

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            workstatus: user.workstatus,
            profile: user.profile
        }

        return res.status(200).json({
            message: "Profile updated succesully.",
            user,
            success:true
        })
    }
    catch(error){
        console.log(error);  
    }
}

export const dummy = async(req, res) => {
    try {
        const {text} = req.body;
    const userId = req.id;
    let user = await User.findById(userId);

    if(!user){
        return res.status(400).json({
            message: "User not found.",
            success: false
        })
    }

    localStorage.setItem("text", text);
    console.log(text);
    } catch (error) {
        console.log(error);
    }
}