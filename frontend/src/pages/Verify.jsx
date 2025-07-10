import React, { useContext, useEffect } from 'react';

import { useSearchParams } from 'react-router-dom';

import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Verify = () => {
  
  const { navigate, token, setCartItems, backendUrl,orderData } = useContext(ShopContext);
  const [searchParams, setSearchParams] = useSearchParams();

  const success = searchParams.get('success');
  const sessionId = searchParams.get('session_id');
  
  const verifyPayment = async () => {
  try {
    if (!token) {
      navigate('/login');
      return;
    }
    if (success === 'true' && sessionId) {
     
  const response = await axios.post(backendUrl + "/api/order/verifyStripe", {
  session_id: sessionId,
  ...orderData
}, {
  headers: { token }
});



      if (response.data.success) {
         localStorage.removeItem("orderData"); 
        setCartItems([]);
        navigate('/orders'); // ✅ Payment success
      } else {
        console.log(response.data);
        
        toast.error('Payment verification failed.');
        navigate('/place-order');   //  Stripe verification failed
      }
    } else {
      toast.error('Payment was canceled or session is invalid.');
      navigate('/place-order');     //  Payment canceled or no session ID
    }
  } catch (error) {
    console.error(error);
    toast.error('Something went wrong during verification.');
    navigate('/place-order');       //  Unexpected error
  }
};


  useEffect(() => {
    verifyPayment();
  }, [token]);

  return (
    <div>
      {/* Optional loading or message can go here */}
    </div>
  );
};

export default Verify;
