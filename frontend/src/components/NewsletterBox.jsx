
import React, { useContext, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';


const NewsletterBox = () => {
  const [email,setEmail]=useState('');
  const{setSubscribed,backendUrl}=useContext(ShopContext);
  const initRazorpayPayment = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "My Shop",
      description: "Order Payment",
      order_id: order.id, // Razorpay order_id
  
      handler: async function (response) {
        console.log("Payment response:", response);
        try {
          const verifyRes = await axios.post(
            backendUrl + "/api/user/subscribeVerify",
            {
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
              email, 
            },
            
          );
  
          if (verifyRes.data.success) {
            toast.success("🎉 Congratulations! You are now a subscribed member.");
            setSubscribed(true);
            
          } else {
            toast.error("Payment verification failed.");
          }
        } catch (error) {
          console.error(error);
          toast.error("Payment error: " + error.message);
        }
      },
  
      theme: {
        color: "#3399cc",
      },
    };
  
    const rzp = new window.Razorpay(options);
    rzp.open();
  };
  

  
   const onSubmitHandler = async (event) => {
        event.preventDefault();

 try {
    const response = await axios.post(
      backendUrl + "/api/user/subscribeRazor",{email}
      
     
    );

    if (response.data.success) {
      const order = response.data.order;
      initRazorpayPayment(order); // 👇 Pass Razorpay order to init function
    } else {
      toast.error(response.data.message);
    }
  } catch (err) {
    console.log(err);
    toast.error("Payment initiation failed");
  }



        
      //    try {
      //   const response= await axios.post(backendUrl+"/api/user/subscribe",{email});
      //   if(response.data.success){
      //     toast.success(response.data.message);
      //     setSubscribed(true);
      //   }else{
      //      toast.error(response.data.message);
      //   }
       
      // } catch (error) {
      //    toast.error(error.message);
      // }
   }
        
    
  return (
    <div className="text-center">
      <p className="text-2xl font-medium text-gray-800">
        Subscribe now & get 20% off
      </p>
      <p className="mt-3 text-gray-400">
        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
      </p>
      <form  onSubmit={onSubmitHandler}className="flex items-center w-full gap-3 pl-3 mx-auto my-6 border sm:w-5/12">
        <input
          className="w-1/2 py-3 outline-none sm:flex-1 "
          type="email"
          placeholder="Enter your email"
          onChange={(e)=>setEmail(e.target.value)}
          value={email} 
        />
        <button
          type="submit"
          className="px-10 py-4 text-xs text-white bg-black"
        >
          SUBSCRIBE
        </button>
      </form>
    </div>
  );
};

export default NewsletterBox;
