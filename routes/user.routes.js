const { Router } = require("express");
const {
  getAllUsers,
  register,
  login,
  deleteUser,
  getPersonalUser,
} = require("../controllers/user.controllers");
const { auth, authorize } = require("../middlewares/auth");
const { jwtCheck } = require("../middlewares/tokenValidationMiddleware");
const router = Router();

//^ get all
router.get("/", getAllUsers);

router.get("/personal", getPersonalUser);

//^ login
router.post("/login", jwtCheck, login);

//^ update
// router.patch("/updateUserDetails/:id", updateUserDetails);

//^delete user
router.delete("/:id", auth, authorize(["admin"]), deleteUser);

module.exports = router;
