import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const MyProfile = () => {
  const { backendUrl } = useContext(ShopContext);
  const [user, setUser] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const getUserInfo = async () => {
    try {
      
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `${backendUrl}/api/user/info`,
        {user:localStorage.getItem('email')},
        
      );
      if (res.data.success) {
        // console.log("hi");
        
        // console.log(res.data);
        setUser(res.data.exist);
        setImagePreview(res.data.exist?.image);
      } else {
        toast.error("Failed to load user info");
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const formData = new FormData();
      formData.append("image1", file);
       formData.append("email", localStorage.getItem('email'));

      const token = localStorage.getItem("token");
      const res = await axios.post(`${backendUrl}/api/user/addUserImage`, formData );

      if (res.data.success) {
        
        
        toast.success("Profile picture updated");
        getUserInfo();
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <div className="max-w-3xl px-4 py-12 mx-auto">
      <h2 className="pb-4 mb-6 text-2xl font-semibold text-center border-b">My Profile</h2>

      {/* Profile Section */}
      <div className="flex flex-col items-center gap-4 mb-10 sm:flex-row sm:items-start">
        <div className="relative">
          <img
            src={imagePreview || "https://i.pravatar.cc/120"}
            alt="Profile"
            className="object-cover border rounded-full shadow-md w-28 h-28"
          />
          <input
            type="file"
            accept="image/*"
            className="absolute top-0 left-0 opacity-0 cursor-pointer w-28 h-28"
            onChange={handleImageUpload}
            title="Change profile photo"
          />
        </div>
       <div className="text-center sm:text-left">
  <p className="text-gray-800">
    <span className="font-semibold">Name:</span> {user?.name || "User Name"}
  </p>
  <p className="text-gray-800">
    <span className="font-semibold">Email:</span> {user?.email || "Email not available"}
  </p>
</div>

      </div>

      {/* Profile Options */}
      <div className="grid grid-cols-2 gap-6 md:grid-cols-3">
        {[
          { label: "My Orders", icon: "📦", path: "/orders" },
          { label: "Wishlist", icon: "❤️", path: "/wishlist" },
          { label: "Logout", icon: "🚪", action: handleLogout },
        ].map((item, i) => (
          <div
            key={i}
            onClick={() => item.path ? (window.location.href = item.path) : item.action?.()}
            className="flex flex-col items-center justify-center p-4 transition duration-200 border rounded-md shadow cursor-pointer hover:shadow-lg"
          >
            <div className="mb-2 text-3xl">{item.icon}</div>
            <div className="font-medium">{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyProfile;
