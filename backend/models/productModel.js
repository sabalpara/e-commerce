import mongoose from "mongoose";


const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: [String],
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  sizes: {
    type: Array,
    required: true,
  },
  subCategory: {
    type: String,
    required: true,
  },
  bestSeller :{
    type:Boolean,
    required:true
  },
  date:{
    type:Date,
    required:true
  }

});

const Product = mongoose.models.product || mongoose.model("product", productSchema);

export default Product;
