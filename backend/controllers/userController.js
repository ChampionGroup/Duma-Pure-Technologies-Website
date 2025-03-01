import userModel from "../models/userModel.js";


export const getUserData = async (req, res) => {
    try {
        const {userId} = req.body;
        const user = await userModel.findById(userId);
        if(!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        return res.status(200).json({ success: true, userData: {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            isAccountVerified: user.isAccountVerified
        } });
        
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

