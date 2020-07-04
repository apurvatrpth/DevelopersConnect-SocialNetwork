const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
  const token = req.header("auth-token");

  // if no token exists in the header
  if (!token) {
    return res.status(401).json({ msg: "Token required!" });
  }

  //verify token
  try {
    decoded = jwt.verify(token, config.get("jwtToken"));
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(400).json({ msg: "Token is invalid!" });
  }
};
