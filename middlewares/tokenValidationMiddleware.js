const axios = require("axios");
const { auth } = require("express-oauth2-jwt-bearer");
const { config } = require("../config");

const { AUTH0_DOMAIN, AUTH0_AUDIENCE } = config;

const jwtCheck = auth({
  audience: AUTH0_AUDIENCE,
  issuerBaseURL: AUTH0_DOMAIN,
  tokenSigningAlg: "RS256",
});

const getAuth0UserInfo = async (req) => {
  const accessToken = req.headers.authorization.split(" ")[1];
  const response = await axios.get(`${AUTH0_DOMAIN}/userinfo`, {
    headers: { authorization: `Bearer ${accessToken}` },
  });

  const userInformation = response.data;
  return userInformation;
};
module.exports = { jwtCheck, getAuth0UserInfo };
