import jwt from "jsonwebtoken";
import User from "../models/User.js";

// const response = await fetch(`http://localhost:3000/api/book`, {
//   method: "POST",
//   body: JSON.stringify({
//     title,
//     caption,
//     image, 
//     rating, 
//   }),
//   headers: {
//     Authorization: `Bearer ${token}`,
//     "Content-Type": "application/json",
//   },
// });


const protectRoute = async (req, res, next) => {
  try {
    // get token
    const token = req.header("Authorization").replace("Bearer ", "");
    if (!token) { return res.status(401).json({ message: "Not authentication token,access denied" });

    // verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // find user
    const user=await User.findById(decoded.userId).select("-password");
    if (!user) return res.status(401).json({ message: "User not found" });

    req.user = user;
    next();
}
  } catch (error) {
    console.log("Authentication error", error);
    res.status(401).json({ message: "Not authentication token,access denied" });
  }
};

export default protectRoute;
