const { User } = require("../models/user.model");
const {
  getAuth0UserInfo,
} = require("../middlewares/tokenValidationMiddleware");
const findUser = require("../utils/findUser");
// const clientURL = "http://localhost:5173";
const clientURL = "https://hosafti-77d46.web.app";

//^ getAllUsers
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    console.log(error);
    res.status(400).send("ERROR");
  }
};

const getPersonalUser = async (req, res) => {
  try {
    const user = await findUser(req);
    console.log(user);
    res.send(user);
  } catch (error) {
    console.error(error.stack);
  }
};

const signupNewUser = async (userInfo, res) => {
  const { email, given_name, family_name, picture } = userInfo;

  try {
    const newUser = new User({
      email: email,
      firstName: given_name,
      lastName: family_name,
      profilePicture: picture,
    });
    await newUser.save();
    res.status(200).send("User registered successfully");
  } catch (error) {
    console.error(error.stack);
    return res.status(500).send("Error");
  }
};

//^ login
const login = async (req, res) => {
  try {
    const userInfo = await getAuth0UserInfo(req);
    const { email, email_verified } = userInfo;

    if (!email_verified || !email) {
      return res
        .status(401)
        .send(`Email not ${!email ? "received" : "verified"}`);
    }
    let user = await User.findOne({ email });
    if (!user) {
      await signupNewUser(userInfo, res);
    } else {
      res.status(200).send("User logged in");
    }
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).send("Error registering user");
  }
};

// const updateUserDetails = async (req, res) => {
//   const { body, params } = req;
//   const { id } = params;
//   try {
//     const product = Product.findByIdAndUpdate(id, body, { new: true });
//     if (product) return res.send(product);
//     return res.send("product wasn't found");
//   } catch (error) {
//     console.log(error);
//     res.status(400).send("Error");
//   }
// };

//^delete
const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    await User.findByIdAndDelete(id);
    return res.send("Deleted Successfully");
  } catch (error) {
    console.log(error);
    return res.status(400).send("Error");
  }
};

module.exports = {
  getAllUsers,
  login,
  deleteUser,
  getPersonalUser,
};
