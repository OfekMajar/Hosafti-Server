const { Router } = require("express");
const {
  getAllGroceryLists,
  getOneGroceryList,
  createGroceryList,
  updateGroceryList,
  deleteGroceryList,
  getGroupGroceryLists,
  updateMainList,
} = require("../controllers/groceryList.controllers");
const { auth } = require("../middlewares/auth");
const router = Router();

//^ get all
router.get("/", getAllGroceryLists);

//^ get one list
router.get("/groceryList/:id", getOneGroceryList);

//^ get  group Lists
router.get("/group/:id", getGroupGroceryLists);
//^ create list
router.post("/createGroceryList", createGroceryList);

//^ add /remove product from main list
router.post("/updateMainList", updateMainList);
//^ update
router.patch("/updateGroceryList/:id", updateGroceryList);

//^delete user
router.delete("/:id", deleteGroceryList);
module.exports = router;
