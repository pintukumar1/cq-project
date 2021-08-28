const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token) {
    return res.status(401).json({ message: "Unauthorized request" });
  }
  try {
    const decodedToken = jwt.verify(token, config.get("jwtSecret"));
    req.user = decodedToken.user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token is not valid" });
  }
};
