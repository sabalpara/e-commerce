import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Wishlist = () => {
  const {
    backendUrl,
    token,
    wishlist,
    toggleWishlist,
    whishlistData,
    addToCart,
    currency
  } = useContext(ShopContext);

  const removeElement = async (id) => {
    toggleWishlist(id);
  };

  const handleAddToCart = async(item) => {
    if (!item.sizes || item.sizes.length === 0) {
      toast.error("No sizes available for this product.");
      return;
    }
     await toggleWishlist(item._id);
    const size = item.sizes[0]; // default to first size
    addToCart(item._id, size);
   
  };

  return (
    <>
      <p className='mb-2 text-lg font-semibold'>Wishlist</p>
      <div className='flex flex-col gap-2'>
        {/* Table Headers */}
        <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_2fr] items-center py-1 px-2 border bg-gray-100 text-sm'>
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className='text-center'>Action</b>
        </div>

        {/* Wishlist Items */}
        {wishlist.map((item, index) => (
          <div
            key={index}
            className='grid grid-cols-[1fr_3fr_1fr_1fr_2fr] md:grid-cols-[1fr_3fr_1fr_1fr_2fr] items-center py-2 px-2 border text-sm gap-2'
          >
            <img
  className='object-cover w-12 h-12 rounded'
  src={Array.isArray(item.image) && item.image[0] ? item.image[0] : "https://cdn-icons-png.flaticon.com/512/847/847969.png"}
  alt={item.name || "Product"}
/>
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>{currency}{item.price}</p>

            <div className='flex justify-end gap-2 md:justify-center'>
              <button
                onClick={() => handleAddToCart(item)}
                className='px-2 py-1 text-xs text-white bg-green-500 rounded hover:bg-green-600'
              >
                Add to Cart
              </button>
              <button
                onClick={() => removeElement(item._id)}
                className='px-2 py-1 text-xs text-white bg-red-500 rounded hover:bg-red-600'
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Wishlist;
