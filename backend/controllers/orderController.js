
//placing order using cod methods

import { response } from "express";
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from'stripe';
import razorpay from 'razorpay'
import crypto from 'crypto'
//GETWAY initialize

//global variables
const currency='inr'
const deliveryCharge=10;

const stripe=new Stripe(process.env.STRIPE_SECRET_KEY)
const razorpayInstance=new razorpay({key_secret:  process.env.RAZORPAY_KEY_SECRET,key_id:process.env.RAZORPAY_KEY_ID
})
const RAZORPAY_SECRET = process.env.RAZORPAY_KEY_SECRET;
const placeOrder=async (req,res)=>{

    
    try {
        const{userId,items,amount,address}=req.body;

        const orderData={
            userId,items,amount,address,
            paymentMethod: "COD",
            payment:false,
            date:Date.now()
        }
      const newOrder= new   orderModel(orderData);

       await newOrder.save()

       await userModel.findByIdAndUpdate(userId,{cartData:{}})

       res.json({success:true,message:"order placed"})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
        
    }

}

//placing order using stripe methods

const placeOrderStripe = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;
    const { origin } = req.headers;

    const line_items = items.map(item => ({
      price_data: {
        currency: currency,
        product_data: { name: item.name },
        unit_amount: item.price * 100
      },
      quantity: item.quantity
    }));

    line_items.push({
      price_data: {
        currency: currency,
        product_data: { name: 'Delivery Charges' },
        unit_amount: deliveryCharge * 100
      },
      quantity: 1
    });

    const session = await stripe.checkout.sessions.create({
      success_url: `${origin}/verify?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/verify?success=false`,
      line_items,
      mode: 'payment',
     
    });

    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};


//verify stripe
const varifystripe = async (req, res) => {
   
   
  try {
   const { userId, items, amount, address,session_id } = req.body;
     console.log(session_id+" hi  jay "+userId+" hi "+amount);
    if (!session_id) {
      return res.json({ success: false, message: ' Payment is not Processed' });
    }

    
   

    

    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod: 'Stripe',
      payment: true,
      date: Date.now()
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    res.json({ success: true });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message+" hi " });
  }
};

//placing order using rezorpay methods

const placeOrderRazorpay = async (req, res) => {
  try {
    const { amount } = req.body;

    const options = {
      amount: amount * 100,
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
};




const verifyRazorpay = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      userId,
      items,
      amount,
      address
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
    const newOrder = new orderModel({
      userId,
      items,
      amount,
      address,
      paymentMethod: "Razorpay",
      payment: true,
      date: Date.now()
    });

    await newOrder.save();

    // Optional: clear cart
    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    res.json({ success: true, message: "Order placed successfully" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};



// All orderss data for admin panel

//placing order using cod methods

const allOrders=async (req,res)=>{
    try {
        
        const orders= await orderModel.find({});

        res.json({succes:true,orders});


    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}

//user order data for frontend

const userOrders=async (req,res)=>{
    
    try {
        const {userId}=req.body;
        const orders=await orderModel.find({userId})

        res.json({success:true,orders})

    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }

}

//update orderstatus from admin

const updateStatus=async (req,res)=>{
    try {
        
        const {orderId,status}=req.body

        await orderModel.findByIdAndUpdate(orderId,{status})

        res.json({success:true,message:'Status updated'})


    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}

export{placeOrder,placeOrderRazorpay,placeOrderStripe,allOrders,userOrders,updateStatus,varifystripe,verifyRazorpay}