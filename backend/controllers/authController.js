import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import transporter from "../config/sendMaill.js";

// signup user
export const signup = async (req, res) => {
  const { firstName, lastName, email, password, confirmPassword } = req.body;
  console.log("Request Body:", req.body);
  if (!firstName || !lastName || !email || !password || !confirmPassword) {
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

    if (password !== confirmPassword) {
      return res
        .status(400)
        .json({ success: false, message: "Passwords do not match" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new userModel({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      confirmPassword: hashedPassword, // You might want to remove this field or handle it differently
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

    // Generate OTP
    const otp = String(Math.floor(100000 + Math.random() * 900000));
    user.verifyOtp = otp;
    user.verifyOtpExpireAt = Date.now() + 24 * 60 * 60 * 1000; // 24 hours expiry
    await user.save();

    // Send OTP email
    const otpMailOptions = {
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: "Verify your account",
      text: `Your verification code is ${otp}. It will expire in 24 hours.`,
    };

    await transporter.sendMail(otpMailOptions);

    return res.status(201).json({
      success: true,
      message: "Signup successful. Please verify your email.",
      userId: user._id,
    });
  } catch (error) {
    console.error("Error during signup:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};
// login user
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "2d",
    });

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      userData: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
    });
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
    const { userId } = req.body;
    const user = await userModel.findById(userId);
    if (user.isAccountVerified) {
      return res
        .status(400)
        .json({ success: false, message: "Account is already verified" });
    }
    const otp = String(Math.floor(100000 + Math.random() * 900000));
    user.verifyOtp = otp;
    user.verifyOtpExpireAt = Date.now() + 24 * 60 * 60 * 1000;
    await user.save();
    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: "Verify your account",
      text: `Your verification code is ${otp}. It will expire in 24 hours.`,
    };
    await transporter.sendMail(mailOptions);
    return res
      .status(200)
      .json({ success: true, message: "OTP sent successfully", otp });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// verify email
export const verifyEmail = async (req, res) => {
  const { userId, otp } = req.body;

  // Validate input
  if (!userId || !otp) {
    return res
      .status(400)
      .json({ success: false, message: "Missing userId or OTP." });
  }

  try {
    // Find the user by userId
    const user = await userModel.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }

    // Log the received and stored OTP for debugging
    console.log("Received OTP:", otp);
    console.log("Stored OTP:", user.verifyOtp);
    console.log(
      "OTP Expiry Time:",
      new Date(user.verifyOtpExpireAt).toLocaleString()
    );
    console.log("Current Time:", new Date().toLocaleString());

    // Check if OTP matches and is not empty
    if (String(user.verifyOtp) !== String(otp) || user.verifyOtp === "") {
      return res.status(400).json({ success: false, message: "Invalid OTP." });
    }

    // Check if OTP has expire
    if (user.verifyOtpExpireAt < Date.now()) {
      return res
        .status(400)
        .json({ success: false, message: "OTP has expired." });
    }
    // Mark the user as verified and clear OTP fields
    user.isAccountVerified = true;
    user.verifyOtp = ""; // Clear the OTP
    user.verifyOtpExpireAt = 0; // Clear the expiry time
    await user.save();

    // Log successful verification
    console.log("Email verified successfully for user:", user.email);
    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: "Welcome to Duma Pure Technologies!",
      text: `Hello ${user.firstName},
      Welcome to Duma Pure Technologies! We are excited to have you on board. Your account has been created successfully with the following credentials:
      Email: ${user.email}
      Password: ${user.password}
      Please log in to your account to start using our services.
      Sincerely,
      Duma Pure Technologies`,
    };

    await transporter.sendMail(mailOptions);
    return res
      .status(200)
      .json({ success: true, message: "Email verified successfully." });
  } catch (error) {
    console.error("Error during email verification:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};
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
};

export const sendResetOtp = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res
      .status(400)
      .json({ success: false, message: "Email is required" });
  }

  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    const otp = Math.floor(100000 + Math.random() * 900000);
    user.resetOtp = otp;
    user.resetOtpExpireAt = Date.now() + 15 * 60 * 1000;
    await user.save();
    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: "Password reset OTP",
      text: `Your verification code for reseting your password is ${otp}. It will expire in 15 minutes.`,
    };
    await transporter.sendMail(mailOptions);
    return res
      .status(200)
      .json({ success: true, message: "OTP sent successfully", otp });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;
  if (!email || !otp || !newPassword) {
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
    if (user.resetOtp !== otp || user.resetOtp === "") {
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }

    if (user.resetOtpExpireAt < Date.now()) {
      return res.status(400).json({ success: false, message: "OTP expired" });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.resetOtp = "";
    user.resetOtpExpireAt = 0;
    await user.save();
    return res
      .status(200)
      .json({ success: true, message: "Password reset successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Get user data
export const getUserData = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded.id).select("-password");

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    return res.status(200).json({
      success: true,
      userData: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Error fetching user data:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};
