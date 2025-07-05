import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
        
        <div>
          <img src={assets.logo} className='w-32 mb-5' alt='' />
          <p className='w-full text-gray-600 md:w-2/3'>
           Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere unde corrupti quibusdam, eaque nisi enim vel deleniti neque quidem architecto eos corporis sit ad obcaecati ipsa itaque doloremque sint cum.
          </p>
        </div>

        <div>
          <p className='mb-5 text-xl font-medium'>COMPANY</p>
          <ul className='flex flex-col gap-1 text-gray-600'>
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>
        </div>

        <div>
          <p className='mb-5 text-xl font-medium'>GET IN TOUCH</p>
          <ul className='flex flex-col gap-1 text-gray-600'>
            <li>+1-212-456-7890</li>
            <li>contact@foreveryou.com</li>
          </ul>
        </div>
      </div>

      <div>
        <hr />
        <p className='py-5 text-sm text-center'>
          © Copyright 2024 @ foreveryou.com – All Rights Reserved
        </p>
      </div>
    </div>
  )
}

export default Footer
