import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Orders = () => {
  const { backendUrl, token, currency } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);
  const navigate = useNavigate();

  const loadOrderData = async () => {
    try {
      if (!token) return;

      const response = await axios.post(
        `${backendUrl}/api/order/userorders`,
        {},
        { headers: { token } }
      );

      if (response.data.success) {
        const allOrderItem = [];

        response.data.orders.forEach((order) => {
          order.items.forEach((item) => {
            item.status = order.status;
            item.payment = order.payment;
            item.paymentMethod = order.paymentMethod;
            item.date = order.date;
            allOrderItem.push(item);
          });
        });

        setOrderData(allOrderItem.reverse());
      }
    } catch (error) {
      console.error("Failed to load orders:", error);
    }
  };

  useEffect(() => {
    loadOrderData();
  }, [token]);

  return (
    <div className="pt-16 border-t">
      <div className="text-2xl">
        <Title text1="MY" text2="ORDERS" />
      </div>

      <div>
        {orderData.length === 0 ? (
          <p className="mt-10 text-gray-500 text-center">No orders found.</p>
        ) : (
          orderData.map((item, index) => (
            <div
              key={index}
              className="flex flex-col gap-4 py-4 text-sm text-gray-700 border-t border-b sm:flex-row md:flex-row md:items-center md:justify-between"
            >
              <div className="flex items-start gap-6">
                <img className="w-16 sm:w-20" src={item.image[0]} alt="" />
                <div>
                  <p className="font-medium sm:text-base">{item.name}</p>
                  <p className="text-gray-600">Price: {currency}{item.price}</p>
                  <p>Quantity: {item.quantity}</p>
                  <p>Size: {item.size}</p>
                  <p className="mt-2">
                    Date: <span className="text-gray-400">{new Date(item.date).toDateString()}</span>
                  </p>
                  <p className="mt-1">
                    Payment: <span className="text-gray-400">{item.paymentMethod}</span>
                  </p>
                </div>
              </div>

              <div className="flex justify-between md:w-1/2">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <p className="text-sm md:text-base">{item.status}</p>
                </div>
                <button
                  onClick={() => navigate("/track-order", { state: { item } })}
                  className="px-4 py-2 text-sm font-medium border rounded hover:bg-gray-50"
                >
                  Track Order
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Orders;
