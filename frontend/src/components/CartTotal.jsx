import React, { useContext } from 'react'
import Title from './Title';
import { ShopContext } from '../context/ShopContext';
import { useState } from 'react';
import { useEffect } from 'react';

const CartTotal = () => {
    const{currency,delivery_fee,getCartAmount,cartItems}=useContext(ShopContext);
   const [Amount,setAmount]=useState(0)
//     useEffect(() => {
//  setAmount(getCartAmount())
//  console.log("my name is jay");
 
// }, [cartItems]);
   
  return (
    <div className='w-full'>
      <div className='text-2xl'>
        <Title text1={'CART'} text2={'TOTALS'} />
      </div>

      <div className='flex flex-col gap-2 mt-2 text-sm'>
        
        {/* Subtotal */}
        <div className='flex justify-between'>
          <p>Subtotal</p>
          <p>{currency} {getCartAmount()}.00</p>
        </div>
        <hr />

        {/* Shipping Fee */}
        <div className='flex justify-between'>
          <p>Shipping Fee</p>
          <p>{currency} {delivery_fee}.00</p>
        </div>
        <hr />

        {/* Total */}
        <div className='flex justify-between'>
          <b>Total</b>
          <b>
            {currency} {getCartAmount() === 0 ? 0 :getCartAmount() + delivery_fee}.00
          </b>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;