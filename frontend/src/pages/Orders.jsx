
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { backendUrl, currency } from "../App";
import { assets } from "../assets/assets";

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    if (!token) return;

    try {
      const { data } = await axios.post(
        `${backendUrl}/api/order/list`,
        {},
        { headers: { token } }
      );

      if (data.succes) {
        setOrders(data.orders);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    }
  };

  const statusHandler= async(e,orderId)=>{
      
    try {
      
      const response=await axios.post(backendUrl+'/api/order/status',{orderId,status:e.target.value},{headers:{token}})
      if(response.data.success){
        await fetchAllOrders()
      }
      
    } catch (error) {
      console.log(error);
      toast.error(response.data.message)
      
    }
      
    }
  
  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <section className="min-h-screen px-4 py-10 bg-gray-50 sm:px-8">
      <h1 className="mb-8 text-2xl font-semibold tracking-tight text-gray-800">
        Orders
      </h1>

      {/* ------- Orders List ------- */}
      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order._id}
            className="p-6 transition-shadow bg-white border border-gray-200 shadow-sm rounded-2xl hover:shadow-md"
          >
            {/* top row */}
            <div className="flex items-center gap-4">
              <img
                src={assets.parcel_icon}
                alt="parcel"
                className="w-10 h-10 shrink-0"
              />

              <div className="flex-1">
                {/* product list */}
                {order.items.map((item, idx) => (
                  <p
                    key={idx}
                    className="text-sm text-gray-700 first:mt-0 mt-0.5"
                  >
                    {item.name} × {item.quantity}
                    <span className="ml-1 text-xs text-gray-500">
                      ({item.size})
                    </span>
                    {idx !== order.items.length - 1 && <span>, </span>}
                  </p>
                ))}

                {/* amount */}
                <p className="mt-2 text-lg font-medium text-gray-900">
                  {currency}
                  {order.amount}
                </p>
              </div>

              {/* status */}
              <div className="flex flex-col items-end gap-2 sm:flex-row sm:items-center">
                <span
                  className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${
                    order.payment
                      ? "bg-emerald-100 text-emerald-600"
                      : "bg-amber-100 text-amber-600"
                  }`}
                >
                  {order.payment ? "Paid" : "Pending"}
                </span>

                <select value={order.status} onChange={(e)=>statusHandler(e,order._id)}
                  className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-700 focus:border-black focus:outline-none"
                  
                >
                  <option value='Order Placed'>Order Placed</option>
                  <option value='Packing'>Packing</option>
                  <option value='Shipped'>Shipped</option>
                  <option value='Out for delivery'>Out for delivery</option>
                  <option value='Delivered'>Delivered</option>
                </select>
              </div>
            </div>

            {/* divider */}
            <hr className="my-4 border-dashed" />

            {/* address & meta */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-0.5 text-sm">
                <p className="font-medium text-gray-800">
                  {order.address.firstName} {order.address.lastName}
                </p>
                <p className="text-gray-600">{order.address.street}</p>
                <p className="text-gray-600">
                  {order.address.city}, {order.address.state},{" "}
                  {order.address.zipcode}
                </p>
                <p className="text-gray-600">{order.address.country}</p>
                <p className="text-gray-600">{order.address.phone}</p>
              </div>

              <div className="space-y-0.5 text-sm sm:text-right">
                <p className="text-gray-600">
                  Items&nbsp;:&nbsp;{order.items.length}
                </p>
                <p className="text-gray-600">
                  Method&nbsp;:&nbsp;{order.paymentMethod}
                </p>
                <p className="text-gray-600">
                  Date&nbsp;:&nbsp;
                  {new Date(order.date).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Orders;
