const { Router } = require("express");
const {
  getAllGroceryLists,
  getOneGroceryList,
  createGroceryList,
  updateGroceryList,
  deleteGroceryList,
  getGroupGroceryLists,
  updateMainList,
  getGroupHistoryList,
  checkOffListItem,
} = require("../controllers/groceryList.controllers");
const { auth, authorize, checkIfUserInGroup } = require("../middlewares/auth");
const router = Router();

//^ get all
router.get("/", getAllGroceryLists);

//^ get one list
router.get("/groceryList/:id", getOneGroceryList);

//^ get  group Lists
router.get("/group/:id", getGroupGroceryLists);
//^ create list
router.post("/createGroceryList", createGroceryList);
//^ get group 20 history lists
router.get("/getGroupHistoryList/:id",getGroupHistoryList)
//^ add /remove product from main list
router.post("/updateMainList", updateMainList);
//^ check Off List Item
router.patch("/checkOffListItem",checkOffListItem)
//^ update
router.patch("/updateGroceryList/:id", updateGroceryList);

//^delete user
router.delete("/:id",auth,authorize(["admin"]), deleteGroceryList);
module.exports = router;
