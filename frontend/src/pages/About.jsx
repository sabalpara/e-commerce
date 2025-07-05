import React from 'react'
import Title from '../components/Title';
import NewsletterBox from '../components/NewsletterBox';
import { assets } from '../assets/assets';

const About = () => {
  
  return (
    <div>

      <div className='pt-8 text-2xl text-center border-t'>
        <Title text1={'ABOUT'} text2={'US'} />
      </div>

      <div className='flex flex-col gap-16 my-10 md:flex-row'>
        <img className='w-full md:max-w-[450px]' src={assets.about_img} alt="" />
        <div className='flex flex-col justify-center gap-6 text-gray-600 md:w-2/4'>
          <p>
            Forever was born out of a passion for innovation and a desire to revolutionize the way people experience everyday products. 
            We strive to blend creativity and technology to bring meaningful and sustainable solutions to the global market.
          </p>
          <p>
            Since our inception, we've worked tirelessly to curate a diverse selection of premium offerings that cater to a wide range of 
            needs and preferences. Our commitment to quality, customer satisfaction, and environmental responsibility guides everything we do.
          </p>
          <b className='text-gray-800'>Our Mission</b>
          <p>
            Our mission at Forever is to empower customers with choice, convenience, and confidence in their purchases. 
            We aim to set new standards in innovation, transparency, and customer care—making a positive impact on every life we touch.
          </p>
        </div>
      </div>

      <div className='py-4 text-xl'>
        <Title text1={'WHY'} text2={'CHOOSE US'} />
      </div>

<div className='flex flex-col mb-20 text-sm md:flex-row'>
  <div className='flex flex-col gap-5 px-10 py-8 border md:px-16 sm:py-20'>
    <b>Quality Assurance:</b>
    <p className='text-gray-600'>
      We meticulously select and vet each product to ensure top-notch quality. 
      Our rigorous quality control process involves multiple layers of inspection and testing, 
      so you can have complete confidence in every purchase you make through our platform.
    </p>
  </div>

  <div className='flex flex-col gap-5 px-10 py-8 border md:px-16 sm:py-20'>
    <b>Convenience:</b>
    <p className='text-gray-600'>
      With our user-friendly interface and hassle-free process, shopping is a breeze. 
      We’ve optimized the customer journey from product discovery to checkout, 
      making it easier than ever to find exactly what you need, when you need it, 
      without any unnecessary steps or confusion.
    </p>
  </div>

  <div className='flex flex-col gap-5 px-10 py-8 border md:px-16 sm:py-20'>
    <b>Exceptional Customer Service:</b>
    <p className='text-gray-600'>
      Our team of dedicated professionals is here to assist you every step of the way. 
      Whether you have questions about a product, need help with your order, or require post-purchase support, 
      we’re committed to providing timely, helpful, and friendly service to ensure your satisfaction.
    </p>
  </div>
</div>
  <NewsletterBox/>

    </div>
  );
};

export default About