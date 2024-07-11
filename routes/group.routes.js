const { Router } = require("express");
const {
  getAllGroups,
  getOneGroup,
  createGroup,
  updateGroup,
  deleteGroup,
  joinGroup,
  getAllUserCreatedGroups,
  getUserParticipatedGroups,
  moveListToHistory,
  isUserInGroup,
} = require("../controllers/group.controllers");
const { auth, authInviteLink, authorize } = require("../middlewares/auth");
const { jwtCheck } = require("../middlewares/tokenValidationMiddleware");
const router = Router();

//^ get all
router.get("/", getAllGroups);

//^ get all users created groups
router.get("/user/:id", getAllUserCreatedGroups);

//^get user Participated groups
router.get("/myGroups", getUserParticipatedGroups);

//^ get one group
router.get("/group/:id", getOneGroup);

//^ check if user in group
router.get("/checkIfUserInGroup/:groupId", isUserInGroup);
//^ createGroup
router.post("/createGroup", createGroup);

//^ move list to history
router.patch("/moveListToHistory/:id", moveListToHistory);
//^ update
// router.patch("/updateGroup/:id", updateGroup);
//^ join group
router.patch("/joinGroup", authInviteLink, joinGroup);
//^delete group
router.delete("/:id", auth, authorize(["admin"]), deleteGroup);
module.exports = router;
