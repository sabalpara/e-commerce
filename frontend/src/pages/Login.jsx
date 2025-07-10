import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';


const Login = () => {
  
  const [currentState, setCurrentState] = useState('Login');
  const{token,setToken,navigate,backendUrl,}= useContext(ShopContext);
  const [name,setName]=useState('');
  const[email,setEmail]=useState('');
  const[password,setPassword]=useState('');

  useEffect(() => {
  if (token) {
    navigate('/');
  } 
}, [token]);

  
 useEffect(() => {
  const stored = localStorage.getItem('token');
  if (stored && stored !== token) setToken(stored);
}, [token]);
  
  
  const onSubmitHandler=async (e)=>{
    e.preventDefault()

    console.log(currentState);
    

    try {
      
      if(currentState==='Sign-up'){
        
        try {
         // console.log("hi my name is  jay");
          
           const response =await axios.post(backendUrl+'/api/user/register',{name,email,password}) 
       // console.log(response.data);
        
        if(response.data.success){
            // console.log(response.data.token);
            // console.log(response.data.success);
          localStorage.setItem('token',response.data.token);
          setToken(response.data.token);
          localStorage.setItem('email',email);
        
          
        
          
        }else{
          toast.error(response.data.message);
        }
        } catch (error) {
          
          
          toast.error(error.message);
        }
       
      }else{
       // console.log("i am in login");
        
        try {
           const response =await axios.post(backendUrl+'/api/user/login',{email,password}) 
         // console.log(response.data);
        //console.log(response.data+" hi my name is jay");
        
        if(response.data.success){
            // console.log(response.data.token);
            // console.log(response.data.success);
          localStorage.setItem('token',response.data.token);
          setToken(response.data.token);
           localStorage.setItem('email',email);
         // console.log("i am in login"+token)
        
          
        
          
        }else{
          toast.error(response.data.message);
        }
        } catch (error) {
          toast.error(error.message);
        }
      }

      
    } catch (error) {
      toast.error(error.message)
    }
  }

  

  return (
    < form  onSubmit={onSubmitHandler}className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
      <div className='inline-flex items-center gap-2 mt-10 mb-2'>
        <p className='text-3xl prata-regular'>{currentState}</p>
        <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
      </div>

     {currentState==='Login'?'':<input
        type="text" onChange={(e)=>setName(e.target.value)}  value={name}
        className='w-full px-3 py-2 border border-gray-800'
        placeholder='Your Name' required
      />} 
      <input
        type="email"onChange={(e)=>setEmail(e.target.value)}  value={email}
        className='w-full px-3 py-2 border border-gray-800'
        placeholder='Your Email' required
      />
      <input
        type="password" onChange={(e)=>setPassword(e.target.value)}  value={password}
        className='w-full px-3 py-2 border border-gray-800'
        placeholder='Password' required
      />

      <div className='w-full flex justify-between text-sm mt-[-8px]'>
  <p className='cursor-pointer'>Forgot your password?</p>
  {
    currentState === 'Login' ? (
      <p onClick={() => setCurrentState('Sign-up')} className='cursor-pointer'>
        Create an account
      </p>
    ) : (
      <p onClick={() => setCurrentState('Login')} className='cursor-pointer'>
        Login here
      </p>
    )
  }
</div>

<button className='px-8 py-2 mt-4 font-light text-white bg-black'>
  {currentState==='Login'?'Sign In': 'Sign Up'}
</button>
    </form>
  );
};

export default Login;
