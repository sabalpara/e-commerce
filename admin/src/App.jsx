import React from 'react'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import { Route, Routes } from 'react-router-dom'
import Add from './pages/Add'
import List from './pages/List'
import Orders from './pages/Orders'
import { useState } from 'react'
import Login from './components/Login'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react'
import AdminTransactions from './pages/AdminTransactions'
export const currency="$";
export const backendUrl= import. meta.env.VITE_BACKEND_URL;

const App = () => {
  const[token,setToken]=useState(localStorage.getItem('token')?localStorage.getItem('token'):'');
  console.log(token);
  
   
  useEffect(()=>{
    localStorage.setItem('token',token)
  },[token])
  return (
    <div className='min-h-screen bg-gray-50'>
      <ToastContainer/>
      {
        token===""?<Login setToken={setToken} />
        :
        <>
     <Navbar setToken={setToken}/>
     <hr />
     <div className='flex w-full'>
      <Sidebar></Sidebar>

      <div className='w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base'>
  <Routes>
    <Route path='/add' element={<Add token={token}/>} />
    <Route path='/list' element={<List token={token}/>} />
    <Route path='/orders' element={<Orders token={token}/>} />
   
  </Routes>
</div>

     </div>
    </>

      }
        </div>
  )
}

export default App