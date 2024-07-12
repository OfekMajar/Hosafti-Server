const mongoose = require("mongoose");
const { normalizeHebrew } = require("../utils/product.utils");

const productSchema = new mongoose.Schema({
  title: { type: String, require: true },
  img: { type: String },
  price: { type: String },
  category: { type: String },
  weight: { type: String },
});

productSchema.index({ title: "text" });

productSchema.pre("save", function (next) {
  this.normalizedTitle = normalizeHebrew(this.title);
  next();
});

const Product = mongoose.model("Product", productSchema);

module.exports = { Product };
