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
const { auth, authorize } = require("../middlewares/auth");
// const { Product } = require("../models/product.model");
// const { normalizeHebrew } = require("../utils/product.utils");
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
router.delete(
  "/category/:category",
  auth,
  authorize(["admin"]),
  deleteCategory
);

//^ delete product
router.delete("/:id", auth, authorize(["admin"]), deleteProduct);

router.get("/autoCompSearch", getWithAutoComp);

// router.put("/normalize-titles", async (req, res) => {
//   console.log("starting");
//   try {
//     const products = await Product.find();

//     const updatePromises = products.map((product) => {
//       const normalizedTitle = normalizeHebrew(product.title);
//       if (product.normalizedTitle !== normalizedTitle) {
//         product.normalizedTitle = normalizedTitle;
//         return product.save();
//       }
//       return Promise.resolve();
//     });

//     await Promise.all(updatePromises);
//     console.log("starting");

//     res
//       .status(200)
//       .send("All product titles have been normalized successfully.");
//   } catch (error) {
//     console.error("Error normalizing product titles:", error);
//     res.status(500).send("An error occurred while normalizing product titles.");
//   }
// });

module.exports = router;
