import { createContext, useState } from "react";

import { useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
 
//  import { products } from "../assets/assets";
import axios from 'axios';
export const ShopContext = createContext();




const ShopContextProvider = (props) => {
  const currency = '$';
  const delivery_fee = 10;
  const backendUrl=import.meta.env.VITE_BACKEND_URL
  const [search ,setSearch]=useState('');
   const [showSearch ,setShowSearch]=useState(false);
   const[cartItems,setCartItems]=useState({});
    const[products,setProducts]=useState([]);
    const[token,setToken]=useState('');
   const navigate=useNavigate();
   
  let productDataPromiseResolve;
  function compareCartItems(a, b) {
  const keysA = Object.keys(a);
  const keysB = Object.keys(b);
  if (keysA.length !== keysB.length) return false;

  for (let key of keysA) {
    if (!b.hasOwnProperty(key)) return false;

    const sizesA = a[key];
    const sizesB = b[key];

    const sizeKeysA = Object.keys(sizesA);
    const sizeKeysB = Object.keys(sizesB);

    if (sizeKeysA.length !== sizeKeysB.length) return false;

    for (let size of sizeKeysA) {
      if (!sizesB.hasOwnProperty(size)) return false;
      if (sizesA[size] !== sizesB[size]) return false;
    }
  }

  return true;
}
const productDataPromise = new Promise((resolve) => {
  productDataPromiseResolve = resolve;
});
   const updateQuantity=async (itemId, size,quantity)=>{
  //  let cartData=structuredClone(cartItems);
  //  cartData[itemId][size]=quantity;
  //  setCartItems(cartData);

   try {
  
   const response= await axios.post(backendUrl+"/api/cart/update",{itemId,size,quantity},{headers:{token}})

  if(response.data.success){
  // toast.success(response.data.message);
  getUserCart();
  }else{
    toast.error(response.data.message)
  }

} catch (error) {
  console.log(error);
  toast.error(error.message)
  
}
   }
   
const addToCart = async (itemId, size) => {
 if(!size){
  toast.error('Select Product Size');
  return;
 }


  // let cartData=structuredClone(cartItems);
  // if (cartData[itemId]) {
  //   if (cartData[itemId][size]) {
  //     cartData[itemId][size] += 1;
  //   } else {
  //     cartData[itemId][size] = 1;
  //   }
  // } else {
  //   cartData[itemId] = {};
  //   cartData[itemId][size] = 1;
  // }

  // setCartItems(cartData);
try {
  
   const response= await axios.post(backendUrl+"/api/cart/add",{itemId,size},{headers:{token}})

  if(response.data.success){
  toast.success(response.data.message);
  getUserCart();
  }else{
    toast.error(response.data.message)
  }

} catch (error) {
  console.log(error);
  toast.error(error.message)
  
}

 
};
const getUserCart = async (token) => {
  try {
    const { data } = await axios.post(
      `${backendUrl}/api/cart/get`,
      {},
      { headers: { token } }
    );

    if ( data.success ) {
      // update only when really needed
      setCartItems(data.cartData);
    }
  } catch (err) {
    console.error(err);
    toast.error(err.message);
  }
};

const getCartCount=()=>{
  //console.log(cartItems);
  
  let totalCount=0;
  for(const item in cartItems){
     for(const size in cartItems[item]){
       try {
        if(cartItems[item][size]>0){
          totalCount+=cartItems[item][size];
        }
       } catch (error) {
        
       }
     }
  }
  return totalCount;
}

const getCartAmount =  () => {
  let totalAmount = 0;
  //console.log(cartItems);
  if(products.length===0){
    return 0;
  }
  
  // if(Object.keys(cartItems).length === 0)
  //   return 0;
    for (const items in cartItems) {
    
    
    
    // await productDataPromise;
    let itemInfo = products.find((product) => product._id === items);
   
    //console.log(itemInfo);
    
    for (const item in cartItems[items]) {
      try {
        if (cartItems[items][item] > 0) {
          totalAmount += itemInfo.price * cartItems[items][item];
        }
      } catch (error) {
        // Optional: handle individual item errors
        console.error("Error calculating total:", error);
      }
    }
  }
 //console.log(totalAmount);
 
 
  
   return totalAmount;
};

const productData=async ()=>{

  try {
    const response= await axios.get(backendUrl+'/api/product/list');

    if(response.data.success){
      setProducts(response.data.products);
      
      productDataPromiseResolve();
      
    }else{
      console.log(response.data.message);
      
    }
    
  } catch (error) {
    console.log(error.message);
    
  }
  



}
 const [Amount,setAmount]=useState(0);

    

useEffect(() => {
 productData()
}, [])

useEffect(() => {
  const localToken = localStorage.getItem('token');
    //console.log(token);
    
      
      
     getUserCart(token);
    //console.log(cartItems);
    //console.log("hiiiiiifjiehfiehfierfhierfieh");
  
    
    
    
  
}, [cartItems, token]);



  const value = {
    products,
    currency,                                  
    delivery_fee,
    search ,
    setSearch,
    showSearch ,
    navigate,
    setShowSearch,cartItems,setCartItems,addToCart,getCartCount,updateQuantity,getCartAmount,backendUrl,token,setToken,Amount,setAmount,productDataPromise
  };


  return (
    <ShopContext.Provider value={value}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
