const { Router } = require("express");
const {
  getAllUsers,
  register,
  login,
  userForgotPassword,
  deleteUser,
  userResetPassword,
} = require("../controllers/user.controllers");
const { auth, authorize } = require("../middlewares/auth");
const { jwtCheck ,authentic} = require("../middlewares/tokenValidationMiddleware");
const router = Router();

//^ get all
router.get("/", getAllUsers);

//^ register
router.post("/register", authentic, register);

//^ login
router.post("/login", login);

//^ forgot password
router.post("/forgotPassword", userForgotPassword);
//^ reset password
router.post("/resetPassword", auth, userResetPassword);

//^ update
// router.patch("/updateUserDetails/:id", updateUserDetails);

//^delete user
router.delete("/:id", auth, authorize(["admin"]), deleteUser);

module.exports = router;
