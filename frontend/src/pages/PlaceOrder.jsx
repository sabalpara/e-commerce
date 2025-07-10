import React, { useContext, useState } from 'react'
import Title from '../components/Title';
import CartTotal from '../components/CartTotal';
import { assets } from '../assets/assets';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';
const PlaceOrder = () => {
   const[method ,setMethod]=useState('cod')
   const [new_orderData1,setNew_orderData]=useState({});
   const {
  navigate,
  backendUrl,
  token,
  cartItems,
  setCartItems,
  getCartAmount,
  delivery_fee,
  products,setOrderData,orderData

} = useContext(ShopContext);
   const [formData, setFormData] = useState({
  firstName: '',
  lastName: '',
  email: '',
  street: '',
  city: '',
  state: '',
  zipcode: '',
  country: '',
  phone: ''
});
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
          backendUrl + "/api/order/verifyRazorpay",
          {
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
            ...new_orderData1, // include items, amount, address, userId
          },
          {
            headers: { token },
          }
        );

        if (verifyRes.data.success) {
          toast.success("Payment successful!");
          setCartItems({});
          navigate("/orders");
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


const onChangeHandler =(e)=>{
  const name= e.target.name;

  const value=e.target.value;
  setFormData(data=>({...data,[name]:value}))  
}

const onsubmitHandler=async(e)=>{
   e.preventDefault();
  //  console.log("hiiiiiii");
   

   try {
    
    let orderItems=[]
    
    for(const items in cartItems){
      for(const item in cartItems[items]){
        if(cartItems[items][item]>0){
            const itemInfo=structuredClone(products.find(products=>products._id===items)) 
            if(itemInfo){
             // console.log(item);
              itemInfo.size=item;
              itemInfo.quantity=cartItems[items][item];
              orderItems.push(itemInfo)
            }
        }
      }
    }
    let new_orderData={
      address:formData,
      items:orderItems,
      amount:getCartAmount()+delivery_fee
    };
    setNew_orderData({address:formData,
      items:orderItems,
      amount:getCartAmount()+delivery_fee});
    
    localStorage.setItem("orderData", JSON.stringify(new_orderData));
     
     console.log(method);
     
    switch(method){
    
        case'cod':
        const response=await axios.post(backendUrl+"/api/order/place",new_orderData,{headers:{token}})

        if(response.data.success){
          setCartItems({})
          navigate('/orders')
        }else{
          toast.error(response.data.message);
        }
        break;

        case'stripe':

        const responseStripe=await axios.post(backendUrl+"/api/order/stripe",new_orderData,{headers:{token}})
        
        if(responseStripe.data.success){
          const{session_url}=responseStripe.data
          window.location.replace(session_url)
           //setCartItems({})
           //navigate('/orders')
        }else{
          toast.error(responseStripe.data.message);
        }

        break;
        
        case 'razorpay':
  try {
    const response = await axios.post(
      backendUrl + "/api/order/razorpay",
      new_orderData,
      { headers: { token } }
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
  break;

        default:
          
        break;
      
    }
    
    
   } catch (error) {
    console.log(error);
    toast.error(error.message)
    
   }
}
  return (

   
    
    <form onSubmit={onsubmitHandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>

    <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
      {/* ------------------ Left Side ------------------ */}
      <div className='my-3 text-xl sm:text-2xl'>
        <Title text1={'DELIVERY'} text2={'INFORMATION'} />
      </div>

      <div className='flex gap-3'>
        <input  required onChange={onChangeHandler } name='firstName' value={formData.firstName }  className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='text' placeholder='First name'/>
        <input required onChange={onChangeHandler } name='lastName' value={formData.lastName} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='text' placeholder='Last name' />
      </div>

      <input required  onChange={onChangeHandler } name='email' value={formData.email}  className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='email' placeholder='Email'/>
      <input required onChange={onChangeHandler } name='street' value={formData.street}   className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='text'  placeholder='Street'/>

      <div className='flex gap-3'>
        <input  required  
        onChange={onChangeHandler } name='city' value={formData.city}
  
        className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='text' placeholder='city'/>
        <input required onChange={onChangeHandler } name='state' value={formData.state}
        className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='text' placeholder='State' />
      </div>

      <div className='flex gap-3'>
        <input  required onChange={onChangeHandler } name='zipcode' value={formData.zipcode}
        className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='number' placeholder='Zipcode'/>
        <input  required
        onChange={onChangeHandler } name='country' value={formData.country}
        className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='text' placeholder='Country' />
      </div>
      <input  required
      onChange={onChangeHandler } name='phone' value={formData.phone}
      className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='number' placeholder='Phone'/>
    </div>

      {/* ----------- Right Side ----------- */}
<div className='mt-8'>

  <div className='mt-8 min-w-80'>
    <CartTotal />
  </div>

  <div className='mt-12'>
    <Title text1={'PAYMENT'} text2={'METHOD'} />

    {/* ----------- Payment Method Selection ----------- */}
    <div className='flex flex-col gap-3 lg:flex-row'>
      
      <div onClick={()=>setMethod('stripe')} className='flex items-center gap-3 p-2 px-3 border cursor-pointer'>
        <p className={`min-w-3.5 h-3.5 border rounded-full ${method==='stripe'? 'bg-green-400':''}`}></p>
        <img className='h-5 mx-4' src={assets.stripe_logo} alt="" />
      </div>

      <div onClick={()=>setMethod('razorpay')} className='flex items-center gap-3 p-2 px-3 border cursor-pointer'>
        <p className={`min-w-3.5 h-3.5 border rounded-full ${method==='razorpay'? 'bg-green-400':''}`}></p>
        <img className='h-5 mx-4' src={assets.razorpay_logo} alt="" />
      </div>

      <div onClick={()=>setMethod('cod')} className='flex items-center gap-3 p-2 px-3 border cursor-pointer'>
        <p className={`min-w-3.5 h-3.5 border rounded-full ${method==='cod'? 'bg-green-400':''}`}></p>
        <p className='mx-4 text-sm font-medium text-gray-500'> CASH ON DELIVERY </p>
      </div>
      

    </div>
    
    <div className='w-full mt-8 text-end'>
  <button  type='submit'  className='px-16 py-3 text-sm text-white bg-black'>
    PLACE ORDER
  </button>
</div>

    
  </div>
</div>

    
    </form>
  );
};

export default PlaceOrder;
