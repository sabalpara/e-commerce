import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { Link, NavLink } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
import axios from 'axios'
import { toast } from 'react-toastify';

const Navbar1 = () => {
  
  
  async function urlToFile(url, filename) {
  const response = await fetch(url);
  const blob = await response.blob();
  return new File([blob], filename, { type: blob.type });
}

  const {products}=useContext(ShopContext);
   const [visible,setVisible]=useState(false);
   const {showSearch,setShowSearch,getCartCount,token,setToken,navigate,setCartItems,cartItems, backendUrl}=useContext(ShopContext);
  const b=()=>{
   
    //console.log("my name is jay");
    
    products.map((item,index)=>handleSubmit(item,index))
  }

  const logOut=()=>{
   localStorage.removeItem('token');
    setToken(false);
    setCartItems({});
    console.log("hi");
    
    
    
    navigate('/Login')
  
  }
 
  useEffect(() => {
    setToken(localStorage.getItem('token'));
   // console.log("hi my name is Jay");
    
    
  if (localStorage.getItem('token')) {
    
  } else {
   // console.log("hi my is yours");
    
    navigate('/Login');
  }
}, []);

  const handleSubmit = async (item,index) => {
    // console.log(item.bestSeller);
    
    // if(!item.bestSeller){
    //   return;
    // }
     console.log(item.bestSeller);
    const backendUrl='http://localhost:4000';
  const formData = new FormData();
  formData.append("name", item.name);
  formData.append("description", item.description);
  formData.append("price", item.price);
  formData.append("category", item.category);
  formData.append("subCategory", item.subCategory);
  formData.append("sizes", JSON.stringify(item.sizes)); // Must be stringified
  formData.append("bestSeller", item.bestseller);
   
  
  // Add images (optional ones must be checked)
  if (item.image[0]) {
    const file1 = await urlToFile(item.image[0], "image1.png");
    formData.append("image1", file1);
  }
  if (item.image[1]) {
    const file2 = await urlToFile(item.image[1], "image2.png");
    formData.append("image2",file2);
  }
  if (item.image[2]) {
    const file3 = await urlToFile(item.image[2], "image3.png");
    formData.append("image3",file3 );
  }
  if (item.image[3]) {
     const file4 = await urlToFile(item.image[3], "image4.png");
    formData.append("image4",file4 );
  }

  try {
    const response = await axios.post(
      backendUrl + "/api/product/add",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          token: "eyJhbGciOiJIUzI1NiJ9.YWRtaW5AZm9yZXZlci5jb21TamtAMjAwNQ.Gjf7IO7jIJLqRmjCH67z0agSyC44xq0TdrJeRf1uWrc",
        },
      }
    );

    if (response.data.success) {
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }
  } catch (error) {
    toast.error(error.message);
  }
};

  
  
  return (
   
    <div className='flex items-center justify-between py-5 font-medium'>
        
         <Link to='/'> <img src={assets.logo} alt=""  className=' w-36'/> </Link>

          <ul className='hidden gap-5 text-sm text-gray-700 sm:flex'>
            <NavLink to='/' className='flex flex-col gap-1 item-center'>
              <p>HOME</p>
              <hr className='w-2/4 border-none h-[2px] bg-gray-700 ml-2 hidden'/>
            </NavLink>

             <NavLink to='/collection' className='flex flex-col gap-1 item-center'>
              <p>COLLECTION</p>
              <hr className='w-2/4 border-none h-[2px] bg-gray-700 ml-6 hidden'/>
            </NavLink>

             <NavLink to='/about' className='flex flex-col gap-1 item-center'>
              <p>ABOUT</p>
              <hr className='w-2/4 border-none h-[2px] bg-gray-700 ml-2 hidden'/>
            </NavLink>

             <NavLink to='/contact' className='flex flex-col gap-1 item-center'>
              <p>CONTACT</p>
              <hr className='w-2/4 border-none h-[2px] bg-gray-700  ml-3 hidden'/>
            </NavLink>
          </ul>
         <div className='flex items-center gap-6'>
          <img onClick={()=>setShowSearch(true)} src={assets.search_icon} className='w-5 cursor-pointer' alt="" />
          
          <div className='relative group'> 
            <img onClick={()=> token? null :navigate('/login')} src={assets.profile_icon}  className='w-5 cursor-pointer'alt="" /> 
            {/* drop down */}
            { token && <div className='absolute right-0 hidden pt-4 group-hover:block dropdown-menu'>
              <div className='flex flex-col gap-2 px-5 py-3 text-gray-500 rounded w-36 bg-slate-100'>
                <p onClick={()=>navigate('/Profile')} className='cursor-pointer hover:text-black'>My Profile</p>
                 <p onClick={()=>navigate('/orders')} className='cursor-pointer hover:text-black'>Orders</p>
                  <p onClick={logOut}  className='cursor-pointer hover:text-black'>Logout</p>
              </div>
            </div>}
             </div>
             <Link to='/cart' className='relative'>
             <img src={assets.cart_icon} alt=""  className='w-5 min-w-5'/>
             <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[-8px] '>{getCartCount()}</p>
             </Link>
             <img onClick={()=>setVisible(true)} src={assets.menu_icon} className='w-5 cursor-pointer sm:hidden' alt="" />
         </div>

         {/* sidebar menu for small screen  */}
         <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible?'w-full': 'w-0'}`}>
           <div className='flex flex-col text-gray-600 '>
            <div onClick={()=>setVisible(false)} className='flex items-center gap-4 p-3 cursor-pointer'>
              <img src={assets.dropdown_icon}  className='h-4 rotate-180'alt="" />
              <p>back</p>
            </div>
            <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border' to='/'>
              HOME
            </NavLink>
            
             <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border' to='/collection'>
              COLLECTION
            </NavLink>

             <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border' to='/about'>
              ABOUT
            </NavLink>

             <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border' to='/contact'>
              CONTACT
            </NavLink>
           </div>
         </div>
    </div>
  )
}

export default Navbar1