const dotenv = require("dotenv");

dotenv.config();

const { MONGO_URL } = process.env;
const { JWT_SECRET } = process.env;
const { EMAIL_USERNAME } = process.env;
const { EMAIL_PASSWORD } = process.env;
const { OLD_MONGO_URL } = process.env;
const { AUTH0_AUDIENCE } = process.env;
const { AUTH0_DOMAIN } = process.env;
const config = {
  MONGO_URL,
  JWT_SECRET,
  EMAIL_PASSWORD,
  EMAIL_USERNAME,
  OLD_MONGO_URL,
  AUTH0_DOMAIN,
  AUTH0_AUDIENCE,
};

module.exports = { config };
