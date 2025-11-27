const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  try {
    // Token should come from headers
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "Access denied. No token provided." });
    }

    const token = authHeader.split(" ")[1];

    // Verify token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: "Invalid or expired token." });
      }

      // Save decoded user info for further use
      req.user = decoded;
      next();
    });
  } catch (error) {
    console.error("JWT verify error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = { verifyToken };
