import React, { useContext,useState,useEffect } from 'react'
import Title from './Title';
import { ShopContext } from '../context/ShopContext';

const CartTotal = () => {
  const { currency, delivery_fee, getCartAmount, cartItems, subscribed } = useContext(ShopContext);

  const originalAmount = getCartAmount();
  const discountedAmount = Math.floor(originalAmount * 0.8); // 20% off

  return (
    <div className='w-full'>
      <div className='text-2xl'>
        <Title text1={'CART'} text2={'TOTALS'} />
      </div>

      <div className='flex flex-col gap-2 mt-2 text-sm'>

        {/* Subtotal */}
        <div className='flex justify-between'>
          <p>Subtotal</p>
          <p>
            {subscribed ? (
              <>
                <span className="mr-2 text-gray-500 line-through">{currency} {originalAmount}.00</span>
                <span className="text-green-600">{currency} {discountedAmount}.00</span>
              </>
            ) : (
              `${currency} ${originalAmount}.00`
            )}
          </p>
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
            {currency}{" "}
            {originalAmount === 0
              ? 0
              : (subscribed ? discountedAmount : originalAmount) + delivery_fee}.00
          </b>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;
