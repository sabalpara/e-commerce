import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const Orders = () => {

  const {backendUrl,token,currency}=useContext(ShopContext)
  
  const[orderData,setOrderData]=useState([]);

  const loadOrderData= async()=>{
    //console.log("jay");
    try {
      if(!token){
        return null
      }
      
      const response=await  axios.post(backendUrl+'/api/order/userorders',{},{headers:{token}})
      //console.log(response.data);
      if(response.data.success){
        let allOrderItem=[];
         //console.log( response.data.orders);
        response.data.orders.map((order)=>{
          order.items.map((item)=>{
            //console.log("byyyyyy")
            item['status']=order.status
            item['payment']=order.payment
            item['paymentMethod']=order.paymentMethod
            item['date']=order.date

            allOrderItem.push(item)
            //console.log(allOrderItem);
          })
        })
        
        //console.log(allOrderItem);
        setOrderData(allOrderItem.reverse())
        
      }
      
      
    } catch (error) { 
      
    }
  }

  
  useEffect(()=>{
    //console.log("hiii");
    loadOrderData()
  },[token])
  
  return (
    <div className='pt-16 border-t'>
      <div className='text-2xl'>
        <Title text1={'MY'} text2={'ORDERS'} />
      </div>

      <div>
        {
          orderData.map((item, index) => (
            <div key={index} className='flex flex-col gap-4 py-4 text-sm text-gray-700 border-t border-b sm:flex-row md:flex-row md:items-center md:justify-between'>
              <div className='flex items-start gap-6'>
                <img className='w-16 sm:w-20' src={item.image[0]} alt="" />
                <div>
                  <p className='font-medium sm:text-base'>{item.name}</p>
                  <div className='flex items-center gap-3 mt-2 text-base text-gray-600'>
                    <p >{currency}{item.price}</p>
                  </div>
                  <p>Quantity:{item.quantity} </p>
                  <p>Size: {item.size}</p>
                  <p className='mt-2'>Date: <span className='text-gray-400'>{new Date(item.date).toDateString()}</span></p>
                  <p className='mt-2'>Payment: <span className='text-gray-400'>{item.paymentMethod}</span></p>
                </div>
              </div>
              
              <div className='flex justify-between md:w-1/2'>
  <div className='flex items-center gap-2'>
    <p className='h-2 bg-green-500 rounded-full min-w-2'></p>
    <p className='text-sm md:text-base'>{item.status}</p>
  </div>
  <button onClick={ loadOrderData} className='px-4 py-2 text-sm font-medium border rounded-sm'>
    Track order
  </button>
</div>

              
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default Orders;
