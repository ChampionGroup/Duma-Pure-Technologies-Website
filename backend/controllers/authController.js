import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import transporter from "../config/sendMaill.js";
import userAuth from "../middleware/userAuth.js";

// signup user
export const signup = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  if (!firstName || !lastName || !email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  try {
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new userModel({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "2d",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 2 * 24 * 60 * 60 * 1000,
    });

    //sending welcome email
    const mailOptions = {
        from: process.env.SENDER_EMAIL,
        to: email,
        subject: "Welcome Duma Pure Technologies",
        text: `Hello ${firstName},\n\nWelcome to Duma Pure Technologies! We are excited to have you on board.Your account has been created successfully with the following credentials:\n\nEmail: ${email}\nPassword: ${password}\n\nPlease log in to your account to start using our services.\n\nSincerely,\nDuma Pure Technologies`,
    }

    await transporter.sendMail(mailOptions);

    return res
      .status(201)
      .json({ success: true, message: "User created successfully" });

  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// login user
export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "2d",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 2 * 24 * 60 * 60 * 1000,
    });
    return res
      .status(200)
      .json({ success: true, message: "User logged in successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// logout user
export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    });
    return res
      .status(200)
      .json({ success: true, message: "User logged out successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// send verify otp
export const sendVerifyOtp = async (req, res) => { 
    try {
        const {userId} = req.body;
        const user = await userModel.findById(userId);
        if(user.isAccountVerified){
            return res.status(400).json({ success: false, message: "Account is already verified" });
        }
        const otp = String(Math.floor(100000 + Math.random() * 900000));
        user.verifyOtp = otp;
        user.verifyOtpExpireAt = Date.now() + 24 * 60 * 60 * 1000;
        await user.save();
        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: "Verify your account",
            text: `Your verification code is ${otp}. It will expire in 24 hours.`
        }
        await transporter.sendMail(mailOptions);
        return res.status(200).json({ success: true, message: "OTP sent successfully", otp });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

// verify email
export const verifyEmail = async (req, res) => {
    const {userId, otp} = req.body;
    if(!userId || !otp){
        return res.status(400).json({ success: false, message: "Missing userId or otp" });
    }

    try {
        const user = await userModel.findById(userId);
        if(!user){
            return res.status(404).json({ success: false, message: "User not found" });
        }
        if(user.verifyOtp !== otp || user.verifyOtp === ""){
            return res.status(400).json({ success: false, message: "Invalid OTP" });
        }
        if(user.verifyOtpExpireAt < Date.now()){
            return res.status(400).json({ success: false, message: "OTP expired" });
        }
        user.isAccountVerified = true;
        user.verifyOtp = "";
        user.verifyOtpExpireAt = 0;
        await user.save();
        return res.status(200).json({ success: true, message: "Email verified successfully" });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

// check if user is authenticated
export const isAuthenticated = async (req, res) => {
    try {
        const { token } = req.cookies;
        if (!token) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }
        return res.status(200).json({ success: true, message: "Authenticated" });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

export const sendResetOtp = async (req, res) => {
    const {email} = req.body;
    if(!email){
        return res.status(400).json({ success: false, message: "Email is required" });
    }
    
    try {
        const user = await userModel.findOne({email});
        if(!user){
            return res.status(404).json({ success: false, message: "User not found" });
        }
        const otp = Math.floor(100000 + Math.random() * 900000);
        user.resetOtp = otp;
        user.resetOtpExpireAt = Date.now() + 15 * 60 * 1000;
        await user.save();
        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: "Password reset OTP",
            text: `Your verification code for reseting your password is ${otp}. It will expire in 15 minutes.`
        }
        await transporter.sendMail(mailOptions);
        return res.status(200).json({ success: true, message: "OTP sent successfully", otp });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

export const resetPassword = async (req, res) => {
    const {email, otp, newPassword} = req.body;
    if(!email || !otp || !newPassword){
        return res.status(400).json({ success: false, message: "All fields are required" });
    }

    try {
        const user = await userModel.findOne({email});
        if(!user){
            return res.status(404).json({ success: false, message: "User not found" });
        }
        if(user.resetOtp !== otp || user.resetOtp === ""){
            return res.status(400).json({ success: false, message: "Invalid OTP" });
        }

        if(user.resetOtpExpireAt < Date.now()){
            return res.status(400).json({ success: false, message: "OTP expired" });
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        user.resetOtp = "";
        user.resetOtpExpireAt = 0;
        await user.save();
        return res.status(200).json({ success: true, message: "Password reset successfully" });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}