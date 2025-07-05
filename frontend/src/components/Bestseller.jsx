import { ShopContext } from '../context/ShopContext';
import Productitems from './Productitems';
import Title from './Title';
import { useContext, useEffect, useState } from 'react';

const BestSeller = () => {
  const { products } = useContext(ShopContext);
  const [bestSeller, setBestSeller] = useState([]);

 
   
  useEffect(() => {
    //console.log(products);
    //console.log("hi");
    
    const bestProduct = products.filter((item) => item.bestSeller);
    //console.log(bestProduct);
    
    setBestSeller(bestProduct.slice(0, 5));
  }, [products]);
 
  return (
    <div className='my-10'>
      <div className='py-8 text-3xl text-center'>
        <Title text1='BEST' text2='SELLERS' />
        <p className='w-3/4 m-auto text-xs text-gray-600 sm:text-sm md:text-base'>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
        </p>
      </div>

       {/*  rendering product */}
      <div className='grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-y-6 '>
        {
            bestSeller.map((item,ind)=>(
                <Productitems key={ind} id={item._id} image={item.image} name={item.name} price={item.price}/>
            ))
        }
      </div>
    </div>
  );
};

export default BestSeller;
