import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  product: { type: String, required: true },
  price: { type: Number, required: true },
  color: { type: String, required: true },
  size: { type: Number, required: true },
});

const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;
