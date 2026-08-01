const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    const token = req.header("Authorization");

    console.log("Received Header:", token);
    console.log("JWT Secret:", process.env.JWT_SECRET);

    if (!token) {
      return res.status(401).json({
        message: "Access Denied. No Token Provided.",
      });
    }

    const actualToken = token.startsWith("Bearer ")
      ? token.split(" ")[1]
      : token;

    console.log("Actual Token:", actualToken);

    const decoded = jwt.verify(actualToken, process.env.JWT_SECRET);

    req.user = decoded;

    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      message: "Invalid Token",
    });
  }
};

module.exports = authMiddleware;