const { Router } = require("express");
const {
  getAllUsers,
  register,
  login,
  userForgotPassword,
  deleteUser,
  updateUserDetails,
} = require("../controllers/user.controllers");
const { auth } = require("../middlewares/auth");
const router = Router();

//^ get all
router.get("/", getAllUsers);

//^ register
router.post("/register", register);

//^ login
router.post("/login", login);

//^ update
router.patch("/updateUserDetails/:id", updateUserDetails);

//^delete user
router.delete("/:id", deleteUser);


module.exports = router;
