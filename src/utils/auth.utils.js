import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const authMiddleware = async (req, res, next) => {
  try {
    let token;
    
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({ success: false, message: "No token provided" });
    }
    
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch user
    const user = await User.findById(decoded.id).select("-password -refreshToken");
    if (!user) {
      return res.status(401).json({ success: false, message: "User not found" });
    }

    // Attach user info to request
    req.user = { id: user._id, role: user.role };

    next();
  } catch (error) {
    console.error("Auth Middleware Error:", error.message);
    return res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
};
