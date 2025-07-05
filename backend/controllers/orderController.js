
//placing order using cod methods

import { response } from "express";
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from'stripe';
//GETWAY initialize

const stripe=new Stripe(process.env.STRIPE_SECRET_KEY)

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

const placeOrderStripe=async (req,res)=>{
    
}

//placing order using rezorpay methods

const placeOrderRazorpay=async (req,res)=>{
    
}

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

export{placeOrder,placeOrderRazorpay,placeOrderStripe,allOrders,userOrders,updateStatus}