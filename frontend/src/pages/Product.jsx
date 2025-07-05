import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProduct';

const Product = () => {
  const { productId } = useParams();
  const { products, currency,addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState('');
  const[size,setSize]=useState('')

  useEffect(() => {
    const fetchProductData = () => {
      products.forEach((item) => {
        if (item._id === productId) {
          setProductData(item);
          setImage(item.image[0]);
        }
      });
    };

    fetchProductData();
  }, [productId, products]);

  return productData ? (
    <div className='pt-10 transition-opacity duration-500 ease-in border-t-2 opacity-100'>
      <div className='flex flex-col gap-8 sm:flex-row sm:gap-12'>

        {/* Thumbnails */}
        <div className='flex sm:flex-col gap-3 overflow-x-auto sm:overflow-y-auto sm:w-[200px]'>
          {productData.image.map((item, index) => (
            <img
              onClick={() => setImage(item)}
              src={item}
              key={index}
              className='w-[150px] h-[190px] object-cover cursor-pointer border border-gray-300 rounded-md'
              alt={`thumb-${index}`}
            />
          ))}
        </div>

        {/* Main Image */}
        <div className='w-full sm:w-[50%] flex justify-center items-center'>
          <img
            src={image}
            className='w-[600px]  object-cover'
            alt='Main Product'
          />
        </div>

        {/* Product Info */}
        <div className='sm:w-[30%] flex flex-col justify-center'>
          <h1 className='mb-2 text-2xl font-medium'>{productData.name}</h1>

          <div className='flex items-center gap-1 mb-2'>
            <img src={assets.star_icon} alt="star" className="w-3" />
            <img src={assets.star_icon} alt="star" className="w-3" />
            <img src={assets.star_icon} alt="star" className="w-3" />
            <img src={assets.star_icon} alt="star" className="w-3" />
            <img src={assets.star_dull_icon} alt="star" className="w-3" />
            <p className="pl-2 text-sm text-gray-500">(122)</p>
          </div>

          <p className='mb-4 text-3xl font-semibold'>
            {currency}{productData.price}
          </p>

          <p className='text-sm leading-6 text-gray-600'>
            {productData.description}
          </p>
          <div className='flex flex-col gap-4 my-8'>
  <p>Select Size</p>
  <div className='flex gap-2'>
    {productData.sizes.map((item, index) => (
      <button
        onClick={() => setSize(item)}
        className={`px-4 py-2 bg-gray-100 border ${item === size ? 'border-orange-500' : ''}`}

        key={index}
      >
        {item}
      </button>
    ))}
  </div>
</div>

<button onClick={()=>addToCart(productData._id,size)} className='w-40 px-8 py-3 text-sm text-white bg-black active:bg-gray-700'>
  Add to Cart
</button>

<hr className='mt-8 sm:w-4/5' />

<div className='flex flex-col gap-1 mt-5 text-sm text-gray-500'>
  <p>100% Original product.</p>
  <p>Cash on delivery is available on this product.</p>
  <p>Easy return and exchange policy within 7 days.</p>
</div>
        </div>

      </div>

  <div className='mt-20'>
  <div className='flex'>
    <b className='px-5 py-3 text-sm border'>Description</b>
    <p className='px-5 py-3 text-sm border'>Reviews (122)</p>
  </div>

  <div className='flex flex-col gap-4 px-6 py-6 text-sm text-gray-500 border'>
    <p>
    An e-commerce website is an online platform that facilitates the buying and selling of goods and services over the internet.
    These websites enable businesses to reach a global audience and provide consumers with the convenience of shopping from anywhere at any time.
  </p>
  <p>
    E-commerce websites typically display products or services along with detailed descriptions, prices, images, specifications, and customer reviews.
    They often feature search functionality, filters, and sorting options to help users quickly find what they're looking for.
  </p>
  </div>
</div>
     <RelatedProducts category={productData.category} subCategory={productData.subCategory}/>
    </div>
  ) : (
    <div className='opacity-0'></div>
  );
};

export default Product;
