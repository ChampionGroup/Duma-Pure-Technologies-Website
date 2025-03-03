import jwt from "jsonwebtoken";

const userAuth = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ success: false, message: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Assuming the token contains the user ID
        next();
    } catch (error) {
        res.status(400).json({ success: false, message: 'Invalid token.' });
    }
}

export default userAuth;