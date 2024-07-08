const { verifyToken } = require("../utils/jwt");

const auth = (req, res, next) => {
  try {
    const userToken = req.headers["authorization"];
    if (!userToken) return res.status(401).send("unAuthorized");
    const token = userToken.split(" ")[1];
    const payload = verifyToken(token);
    if (!payload) return res.status(401).send("unAuthorized");
    req.user = payload;
    next();
  } catch (error) {
    console.log(error);
    return res.status(400).send("token expired");
  }
};

const authInviteLink = (req, res, next) => {
  try {
    const inviteLinkToken = req.headers["authorization"];
    if (!inviteLinkToken) return res.status(401).send("unAuthorized");
    const token = inviteLinkToken.split(" ")[1];
    const payload = verifyToken(token);
    if (!payload) return res.status(401).send("unAuthorized");
    req.group = payload;
    next();
  } catch (error) {
    console.log(error);
    return res.status(400).send("token expired");
  }
};

const authorize = (roles) => {
  return (req, res, next) => {
    const user = req.user;
    if (roles.includes(user.role)) next();
    else res.status(401);
  };
};

const checkIfUserInGroup = () => {
  return (req, res, next) => {
    const user = req.user;
    const { body } = req;
    console.log("t");
    next();
  };
};

module.exports = { auth, authInviteLink, authorize, checkIfUserInGroup };
