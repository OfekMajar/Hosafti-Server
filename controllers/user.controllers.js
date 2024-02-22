const { User } = require("../models/user.model");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../utils/jwt");

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

//^ register
const register = async (req, res) => {
  const { email, password, fullName } = req.body;

  const isEmailUsed = await User.findOne({ email });
  if (isEmailUsed) {
    return res.status(400).send("email already in use");
  }
  try {
    const hash = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hash, fullName, role: "free" });

    await user.save();
    const token = generateToken({
      email: user.email,
      id: user._id,
      role: "free",
    });
    return res.send({
      user: { email, id: user._id, role: "free", fullName },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send("Error");
  }
};

//^ login
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        const token = generateToken({
          email: user.email,
          id: user._id,
          role: "free",
          fullName:user.fullName
        });
        return res.send(token);
      }
      return res.status(401).send("Email or password are incorrect");
    }

    return res.status(401).send("Email or password are incorrect");
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

//^ user Forgot Password
// const userForgotPassword = async (req, res) => {
//   const { body, params } = req;
//   const {oldPassword,newPassword,email}=body
//   try {
//     const user = await User.findOne({ email });
//     if (user) {
//       const isMatch = await bcrypt.compare(oldPassword, user.password);
//     }
//   } catch (error) {

//   }
//   const { id } = params;
//   try {
//     const user = await User.findByIdAndUpdate(id, body, { new: true });
//     console.log(user);
//     if (user) return res.send(user);
//     return res.send("user wasn't found");
//   } catch (error) {
//     console.log(error);
//     return res.status(400).send("Error");
//   }
// };

const updateUserDetails = async (req, res) => {
  const { body, params } = req;
  const { id } = params;
  try {
    const product = Product.findByIdAndUpdate(id, body, { new: true });
    if (product) return res.send(product);
    return res.send("product wasn't found");
  } catch (error) {
    console.log(error);
    res.status(400).send("Error");
  }
};
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
  register,
  login,
  updateUserDetails,
  deleteUser,
};
