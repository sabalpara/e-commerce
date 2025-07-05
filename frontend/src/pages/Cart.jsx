import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import Title from '../components/Title';
import CartTotal from '../components/CartTotal';
const Cart = () => {


  const [cartData, setCartData] = useState([]);
  const { products, currency, cartItems,updateQuantity,navigate,productDataPromise } = useContext(ShopContext);
  useEffect(() => {
    //console.log("hiiiiii");
 if(products.length>0){
  
    const tempData = [];

    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        if (cartItems[items][item] > 0) {
          tempData.push({
            _id: items,
            size: item,
            quantity: cartItems[items][item]
          });
        }
      }
    }




    setCartData(tempData);
 }
   
    
    // console.log(tempData);
  }, [cartItems,products]);

  return (
    <div className="border-t pt-14">
      <div className="mb-3 text-2xl">
        <Title text1={'YOUR'} text2={'CART'} />
      </div>

      <div>
        { 
       
          cartData.map(  (item, index) => {
             
              //console.log(productData);
            const productData = products.find(
              (product) => product._id === item._id
            );
                   // console.log(cartData)
            //console.log(productData);
            
            
            return (
              <div key={index} className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr]  gap-4 items-center">
                <div className="flex items-start gap-6">
                  <img
                    className="w-16 sm:w-20"
                    src={productData.image[0]}
                    alt=""
                  />
                  <div>
                    <p className="text-xs font-medium sm:text-lg">
                      {productData.name}
                    </p>

                   
                      <div className="flex items-center gap-5 mt-2">
                        <p>{currency}{productData.price}</p>
                        <p className="px-2 border sm:px-3 sm:py-1 bg-slate-50">{item.size}</p>
                      </div>
                   

                    

                  </div>
                </div>
                <input  onChange ={(e)=>e.target.value===''|| e.target.value==='0' ?null :updateQuantity(item._id, item.size,Number(e.target.value))}className="px-1 py-1 border max-w-10 sm:max-w-20 sm:px-2"type="number"  min={1} defaultValue={item.quantity}/>

                    <img
                      onClick={() => updateQuantity(item._id, item.size,0)}
                      className="w-4 mr-4 cursor-pointer sm:mr-6"
                      src={assets.bin_icon}
                      alt=""
                    />

              </div>
            );
          })
        }
      </div>
      
      <div className='flex justify-end my-20'>
  <div className='w-full sm:w-[450px]'>
    
    <CartTotal />
    <div className='w-full text-end'>
  <button onClick={()=>navigate('place-order')} className='px-8 py-3 my-8 text-sm text-white bg-black'>
    PROCEED TO CHECKOUT
  </button>
</div>

  </div>
</div>

      
    </div>
  );

};

export default Cart;
