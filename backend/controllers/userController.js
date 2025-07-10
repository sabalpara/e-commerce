import userModel from "../models/userModel.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import razorpay from 'razorpay'
import crypto from 'crypto'
// Route for user login
import {v2 as cloudinary} from 'cloudinary';
import productModel from "../models/productModel.js";

const currency='inr'
const deliveryCharge=5000;


const razorpayInstance=new razorpay({key_secret:  process.env.RAZORPAY_KEY_SECRET,key_id:process.env.RAZORPAY_KEY_ID
})
const RAZORPAY_SECRET = process.env.RAZORPAY_KEY_SECRET;
const createToken=(id)=>{

    return jwt.sign({id},process.env.JWT_SECRATE)
}

const loginUser = async (req, res) => {

    try {
        const {email,password}=req.body;
        
        //validate;
        //console.log("i am in login ");
        

        const exist= await userModel.findOne({email});

        if(!exist){
             return res.json({success:false,message:"please register first"})
        }
       const isMatch=await  bcrypt.compare(password,exist.password)
          if(!isMatch){
             return res.json({success:false,message:"please enter a valid password"})
          }

          const token=createToken(exist._id);
           res.json({success:true,token})

    } catch (error) {
    console.log(error);
    res.json({success:false,message:error.message})
    }
   
}

// Route for user register
const subscribe = async (req, res) => {


  try {
    const { email } = req.body;
      console.log(email);
      
     const exist = await userModel.findOne({ email });
    
    

    if (!exist) {
      return res.json({
        success: false,
        message: "Please enter a valid email"
      });
    }
    const options = {
      amount: deliveryCharge * 100,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpayInstance.orders.create(options);

    res.json({
      success: true,
      order,
    });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
  // try {
  //   const { email } = req.body;

  //   const exist = await userModel.findOne({ email });
  //   console.log(email);
    

  //   if (!exist) {
  //     return res.json({
  //       success: false,
  //       message: "Please enter a valid email"
  //     });
  //   }

  //   exist.isSubscribe = true;
  //   exist.subscriptionDate = new Date(); // set current date & time
  //   await exist.save();

  //   return res.json({
  //     success: true,
  //     message: "🎉 Congratulations! You are now a subscribed member."
  //   });
  // } catch (error) {
  //   console.error("Subscription error:", error);
  //   return res.status(500).json({
  //     success: false,
  //     message: "Something went wrong. Please try again later."
  //   });
  // }
};
const IsSubscribe= async (req,res)=>{
 try {
    const { email } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({
        status:false,
       
      });
    }
   if (user.isSubscribe && user.subscriptionDate) {
  const now = new Date();
  const sixMonthsLater = new Date(user.subscriptionDate);
  sixMonthsLater.setMonth(sixMonthsLater.getMonth() + 6);

  if (now > sixMonthsLater) {
    user.isSubscribe = false;
    user.subscriptionDate = null;
    await user.save(); 
    return res.json({
        status:false,
      });

  }
   return res.json({
        status:true,
      });
  
}else{
    return res.json({
        status:false,
      });
}
  } catch (error) {
    console.error("Subscription error:", error);
    return res.status(500).json({
      status: false,
      message: "Something went wrong. Please try again later."
    });
  }

}

const subscribeVerify=async(req,res)=>{
try {
    const {
     email, razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;

    const secret = RAZORPAY_SECRET;

    const generatedSignature = crypto
      .createHmac("sha256", secret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (generatedSignature !== razorpay_signature) {
      return res.status(400).json({ success: false, message: "Invalid signature" });
    }

    // ✅ Verified → Save order to DB
    // const newOrder = new orderModel({
    //   userId,
    //   items,
    //   amount,
    //   address,
    //   paymentMethod: "Razorpay",
    //   payment: true,
    //   date: Date.now()
    // });

    // await newOrder.save();
    const exist = await userModel.findOne({ email });

    exist.isSubscribe = true;
    exist.subscriptionDate = new Date();
    await exist.save();

    return res.json({
      success: true,
      message: "🎉 Congratulations! You are now a subscribed member."
    });

    // Optional: clear cart
    // await userModel.findByIdAndUpdate(userId, { cartData: {} });

    // res.json({ success: true, message: "Order placed successfully" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }

}
const registerUser = async (req, res) => {
  try {
    
    const {name,email,password}=req.body;

    const  exists =await userModel.findOne({email})

    console.log("i am in sign in");
    

    if(exists){
        return res.json({success:false,message:"user alerady exist"})
    }

    if(!validator.isEmail(email)){
        return res.json({success:false,message:"please enter a valid email"})
    }
      
    if(password.length<8){
        return res.json({success:false,message:"please enter a strong password"})
    }
    
    //hashing user password

    const salt=await bcrypt.genSalt(10)

    const hashedPassword=await bcrypt.hash(password,salt)
 
    const newUser= new userModel({
        name,
        email,
        password:hashedPassword
    })
    
    const user=await newUser.save()

    const  token=createToken(user._id)

    res.json({success:true,token})
   
  } catch (error) {
    console.log(error);
    res.json({success:false,message:error.message})
    
  }
}

// Route for admin login
const adminLogin = async (req, res) => {
try {
    
    const{email,password}=req.body;

    if(email===process.env.ADMIN_EMAIL && password===process.env.ADMIN_PASSWORD){
        const token=jwt.sign(email+password,process.env.JWT_SECRATE);
        res.json({success:true,token});
    }else{
        res.json({success:false,message:"Invalid credentials"});
    }

} catch (error) {
    console.log(error);
    res.json({success:false,message:error.message})
}
}
const info= async (req,res)=>{
    try {
      const {user}=req.body;
     // console.log(user+"hi");
      
   const exist= await userModel.findOne({email:user});
   //console.log(exist);
   
   if(exist){
     res.json({success:true,exist});
   }else
    res.json({success:false,message:"something is wrong"});
    } catch (error) {
    console.log(error);
    res.json({success:false,message:error.message})
    }

    
   
}
const addUserImage=async (req,res)=>{
 const image = req.file ? req.file.filename : null;
 const {email}=req.body;

  let images_url=  await cloudinary.uploader.upload(req.file.path, { resource_type: 'image' });


 try {
     const user=await userModel.findOne({email:email});
    user.image=images_url.secure_url;
    await user.save();
    res.json({success:true});
 } catch (error) {
    console.log(error);
    res.json({success:false,message:error.message})
 }
    }

    const likeItem=async(req,res)=>{
      const {email}=req.body;
      try {
       const user= await userModel.findOne({email});
       const like=user.like;
      
      const wishlist=  await Promise.all(like.map((id)=>( productModel.findById(id))))
      res.json({like:wishlist,success:true});
      } catch (error) {
    console.log(error);
    res.json({success:false,message:error.message})
      }
    }
    const remove =async(req,res)=>{
      const{id,email}=req.body;
      try {
        const user = await userModel.findOne({ email }); 
      user.like = user.like.filter(productId => productId.toString() !== id);
      await user.save();
      res.json({success:true});
      } catch (error) {
         res.json({success:false,message:error.message});
      }
     
     

    }
   const addtocart = async (req, res) => {
  const { email, id } = req.body;

  try {
    const user = await userModel.findOne({ email }); // ✅ Corrected method and added await

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    // Optional: prevent duplicates
    if (!user.like.includes(id)) {
      user.like.push(id);
      await user.save();
    }

    res.json({ success: true });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export { loginUser, registerUser, adminLogin,subscribe,IsSubscribe,subscribeVerify,info, addUserImage,likeItem,remove, addtocart };
