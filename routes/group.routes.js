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
  isUserInGroup,
} = require("../controllers/group.controllers");
const { auth, authInviteLink, authorize } = require("../middlewares/auth");
const router = Router();

//^ get all
router.get("/", getAllGroups);

//^ get all users created groups
router.get("/user/:id", getAllUserCreatedGroups);

//^get user participed groups
router.get("/myGroups/:id", getUserParticiptedGroups);

//^ get one group
router.get("/group/:id", getOneGroup);

//^ check if user in group
router.patch("/checkIfUserInGroup/:groupId", isUserInGroup);
//^ createGroup
router.post("/createGroup", auth, createGroup);

//^ move list to history
router.patch("/moveListToHistory/:id", moveListToHistory);
//^ update
// router.patch("/updateGroup/:id", updateGroup);
//^ join group
router.patch("/joinGroup", authInviteLink, joinGroup);
//^delete group
router.delete("/:id",auth,authorize(["admin"]), deleteGroup);
module.exports = router;
