import axios from 'axios';
import React, { useState, useContext, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import { toast } from 'react-toastify';

const ReviewItem = ({ user, star, commentText, avatar }) => {
  const { backendUrl } = useContext(ShopContext);
  const [info, setInfo] = useState(null); // null to make check easier

  const getInfo = async () => {
    try {
      const resp = await axios.post(backendUrl + '/api/user/info', { user });
      if (resp.data.success) {
        setInfo(resp.data.exist);
        console.log(resp.data.exist);
        
      } else {
        toast.error(resp.data.message || "Failed to fetch user info");
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    }
  };

  useEffect(() => {
    getInfo();
  }, [user]);

  return (
    <div className="pb-3 mb-4 border-b">
      <div className="flex items-center gap-3 mb-2">
        <img
          src={avatar || "https://i.pravatar.cc/40"}
          alt={info?.name || "User"}
          className="w-8 h-8 rounded-full"
        />
        <div>
          <p className="font-medium">{info?.name || user}</p>
          <div className="flex text-sm text-yellow-400">
            {'★'.repeat(star)}{'☆'.repeat(5 - star)}
          </div>
        </div>
      </div>
      <p className="text-sm text-gray-700">{commentText}</p>
    </div>
  );
};

export default ReviewItem;
