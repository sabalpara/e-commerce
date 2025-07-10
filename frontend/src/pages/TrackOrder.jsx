import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const orderSteps = ["Order Placed", "Shipped", "Out for Delivery", "Delivered"];

const TrackOrder = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  // Get item from state or localStorage
  const item = state?.item || JSON.parse(localStorage.getItem("trackItem"));

  useEffect(() => {
    if (item) {
      localStorage.setItem("trackItem", JSON.stringify(item));
    } else {
      navigate("/orders");
    }
  }, [item, navigate]);

  if (!item) return null;

  const currentStep = orderSteps.indexOf(item.status);

  return (
    <div className="max-w-3xl px-4 py-10 mx-auto">
      <h2 className="mb-6 text-2xl font-semibold text-center">Track Your Order</h2>

      {/* Order Summary */}
      <div className="flex items-start gap-6 p-4 mb-6 border rounded shadow">
        <img src={item.image[0]} alt={item.name} className="w-24 rounded h-28" />
        <div className="flex-1">
          <h3 className="text-lg font-medium">{item.name}</h3>
          <p>Price: ₹{item.price}</p>
          <p>Size: {item.size}</p>
          <p>Quantity: {item.quantity}</p>
          <p>Date: {new Date(item.date).toDateString()}</p>
          <p>Payment: {item.paymentMethod}</p>
          <p>Status: <span className="font-medium text-blue-600">{item.status}</span></p>
        </div>
      </div>

      {/* Order Progress with Estimated Dates */}
      <div className="flex flex-col gap-6 mt-10">
        {orderSteps.map((step, index) => {
          const estimateDate = new Date(item.date);
          estimateDate.setDate(estimateDate.getDate() + 2 * index);
          const formattedDate = estimateDate.toDateString();

          return (
            <div key={index} className="flex items-center gap-4">
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-sm font-bold
                  ${index <= currentStep ? "bg-green-600" : "bg-gray-300"}`}
              >
                {index + 1}
              </div>
              <div>
                <p className={`text-sm font-medium ${index <= currentStep ? "text-green-700" : "text-gray-500"}`}>
                  {step}
                </p>
                <p className="text-xs text-gray-400">
                  Estimated: {formattedDate}
                </p>
                {index === currentStep && (
                  <p className="text-xs text-blue-500">In progress</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TrackOrder;
