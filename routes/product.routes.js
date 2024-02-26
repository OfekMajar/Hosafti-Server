const { Router } = require("express");
const {
  getAllProducts,
  getOneProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getCategory,
  deleteCategory,
  getWithAutoComp,
} = require("../controllers/product.controllers");
const { Product } = require("../models/product.model");
const { auth, authorize } = require("../middlewares/auth");
const router = Router();
// const { auth } = require("../middlewares/auth");

//^ get all

router.get("/", getAllProducts);

//^ get one
router.get("/product/:id", getOneProduct);

//^ get category
router.get("/category/:category", getCategory);
//^ create product
router.post("/", createProduct);

//^ update product
router.patch("/:id", updateProduct);

//^ delete category
router.delete("/category/:category",auth,authorize(["admin"]), deleteCategory);

//^ delete product
router.delete("/:id",auth,authorize(["admin"]), deleteProduct);

router.get("/autoCompSearch",getWithAutoComp);

module.exports = router;
