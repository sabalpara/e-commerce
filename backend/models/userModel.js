import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  cartData: { type: Object, default: {} },
  isSubscribe: { type: Boolean, default: false },
  subscriptionDate: { type: Date, default: null } ,
  image: { type: String, default: "https://cdn-icons-png.flaticon.com/512/847/847969.png" },
  like: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product"
    }
  ]
}, { minimize: false });


const userModel = mongoose.models.user || mongoose.model('user', userSchema);

export default userModel;
