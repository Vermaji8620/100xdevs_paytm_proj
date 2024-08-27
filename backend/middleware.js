const JWT_SECRET = require("./config.js");
const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ message: "No such token" });
  }
  const token = authHeader.split(" ")[1];
  try {
    const verification = jwt.verify(token, JWT_SECRET, () => {
      return res
        .status(401)
        .json({ message: "Some error occuredd while verifying " });
    });

    req.userId = verification.userId;

    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = authMiddleware;
