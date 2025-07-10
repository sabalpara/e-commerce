import React, { useContext, useEffect } from 'react'
import { Route,Routes } from 'react-router-dom'
import Home from './pages/Home'
import Contact from './pages/Contact'
import About from './pages/About'

import Collection from './pages/Collection'
import Product from './pages/Product'
import Cart from './pages/Cart'
import PlaceOrder from './pages/PlaceOrder'
import Orders from './pages/Orders'
 import Navbar1 from './components/Navbar1'
import Login from './pages/Login'
import Footer from './components/Footer'
import SearchBar from './components/SearchBar'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { ShopContext } from './context/ShopContext'
import MyProfile from './pages/MyProfile'
import Verify from './pages/Verify'
import Wishlist from './pages/wishlist'
import TrackOrder from './pages/TrackOrder'
Wishlist
const App = () => {
 
  const { token, navigate } = useContext(ShopContext);


  return (
    <div  className='px-4 sm:px-[5vw] md:px-[7vw] lg:px[9vw] '>
      <ToastContainer/>
      <Navbar1/>
      <SearchBar/>
     <Routes>
   <Route path='/' element={<Home/>}/>
   <Route path='/product/:productId' element={<Product/>}/>
   <Route path='/collection' element={<Collection/>}/>
   <Route path='/contact' element={<Contact/>}/>
   <Route path='/cart' element={<Cart/>}/>
   <Route path='/place-order' element={<PlaceOrder/>}/>
   <Route path='/Login' element={<Login/>}/>
   <Route path='/orders' element={<Orders/>}/>
   <Route path='/about' element={<About/>}/>
   <Route path='/Profile' element={<MyProfile/>}/>
   <Route path='/verify' element={<Verify/>}/>
   <Route path='/wishlist' element={<Wishlist/>}/>
   <Route path='/track-order' element={<TrackOrder/>}/>

     </Routes>
     <Footer/>
    </div>
    
  )
}

export default App