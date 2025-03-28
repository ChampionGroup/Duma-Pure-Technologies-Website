import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true , unique: true },
    password: { type: String, required: true},
    confirmPassword: { type: String, required: true},
    verifyOtp: { type: String, default: ""},
    verifyOtpExpireAt: { type: Number, default: 0 },
    isAccountVerified: { type: Boolean, default: false },
    resetOtp: { type: String, default: "" },
    resetOtpExpireAt: { type: Number, default: 0 },
    lastLogin: { type: Date, default: Date.now },
});

const userModel = mongoose.models.User || mongoose.model("User", userSchema);
export default userModel;