const jwt = require("jsonwebtoken");
const { config } = require("../config");
const  jwtSecret = config.JWT_SECRET;

const generateToken = (payload) => {
  const token = jwt.sign(payload, jwtSecret, { expiresIn: "30d" });
  return token;
};
const generateGroupLinkToken = (payload) => {
  const token = jwt.sign(payload, jwtSecret, { expiresIn: "15m" });
  return token;
};
const verifyToken = (token) => {
  const payload = jwt.verify(token, jwtSecret);
  return payload;
};
const generateResetPasswordToken = (payload) => {
  const token = jwt.sign(payload, jwtSecret, { expiresIn: "3m" });
  return token;
};

module.exports = { generateToken, verifyToken, generateGroupLinkToken,generateResetPasswordToken };
