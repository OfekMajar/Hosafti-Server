const { Router } = require("express");
const {
  getAllGroups,
  getOneGroup,
  createGroup,
  updateGroup,
  deleteGroup,
  joinGroup,
  getAllUserCreatedGroups,
  getUserParticiptedGroups,
  moveListToHistory,
} = require("../controllers/group.controllers");
const { auth, authInviteLink } = require("../middlewares/auth");
const router = Router();

//^ get all
router.get("/", getAllGroups);

//^ get all users created groups
router.get("/user/:id", getAllUserCreatedGroups);

//^get user participed groups
router.get("/myGroups/:id",getUserParticiptedGroups)
//^ get one group
router.get("/group/:id", getOneGroup);

//^ createGroup
router.post("/createGroup", auth, createGroup);

//^ move list to history
router.patch("/moveListToHistory/:id",moveListToHistory)
//^ update
// router.patch("/updateGroup/:id", updateGroup);

router.patch("/joinGroup",authInviteLink,joinGroup)
//^delete user
router.delete("/:id", deleteGroup);
module.exports = router;
