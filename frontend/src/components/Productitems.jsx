import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Link } from 'react-router-dom';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

const ProductItem = ({ id, image, name, price }) => {
  const { currency, wishlist, toggleWishlist } = useContext(ShopContext);
  const isWishlisted = wishlist.some(item => item._id === id);

  return (
    <div className="relative overflow-hidden transition border rounded-md shadow group hover:shadow-md">
      {/* Wishlist Icon */}
      <button
        onClick={(e) => {
          e.preventDefault(); // prevent navigating when clicking the icon
          toggleWishlist(id);
        }}
        className="absolute top-2 right-2 z-10 bg-white p-1.5 rounded-full shadow hover:scale-110 transition text-red-500"
        title={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
      >
        {isWishlisted ? <FaHeart /> : <FaRegHeart />}
      </button>

      <Link className="block text-gray-700" to={`/product/${id}`}>
        <div className="overflow-hidden">
          <img
            className="object-cover w-full h-48 transition-transform duration-300 group-hover:scale-110"
            src={image[0]}
            alt={name}
          />
        </div>
        <div className="px-3 py-2">
          <p className="text-sm font-medium">{name}</p>
          <p className="text-sm text-gray-600">
            {currency}
            {price}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default ProductItem;
