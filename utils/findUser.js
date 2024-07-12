const {
  getAuth0UserInfo,
} = require("../middlewares/tokenValidationMiddleware");
const { User } = require("../models/user.model");

async function findUser(req) {
  try {
    const userInfo = await getAuth0UserInfo(req);
    const user = await User.findOne({ email: userInfo.email });
    return user;
  } catch (error) {
    console.error(error.stack);
  }
}

module.exports = findUser;
