import React from "react";

const MyProfile = () => {
  return (
    <div className="max-w-4xl px-4 py-12 mx-auto">
      <h2 className="pb-4 mb-6 text-2xl font-semibold border-b">My Profile</h2>

      <div className="flex items-center gap-6">
        {/* Profile Picture */}
        <img
          src="https://i.pravatar.cc/120" // You can replace with actual user image
          alt="Profile"
          className="border rounded-full shadow-md w-28 h-28"
        />

        {/* User Info */}
        <div>
          <h3 className="text-xl font-semibold">Sabalpara Jay</h3>
          <p className="text-gray-600">Email: jay@example.com</p>
          <p className="text-gray-600">Phone: +91-98765-43210</p>
          <p className="text-gray-600">Address: Gandhinagar, Gujarat, India</p>
        </div>
      </div>

      {/* Profile Options */}
      <div className="grid grid-cols-2 gap-6 mt-10 md:grid-cols-3">
        {[
          { label: "My Orders", icon: "📦" },
          { label: "Wishlist", icon: "❤️" },
          { label: "Saved Cards", icon: "💳" },
          { label: "Addresses", icon: "🏠" },
          { label: "Coupons", icon: "🎟️" },
          { label: "Logout", icon: "🚪" },
        ].map((item, i) => (
          <div
            key={i}
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
