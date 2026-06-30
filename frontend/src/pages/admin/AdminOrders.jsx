import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { assets as adminAssets } from "../../assets/foreverBuy-assets/admin_assets/assets";
import { BACKEND_URL } from "./AdminLayout";

const STATUS_OPTIONS = [
  "Order Placed",
  "Packing",
  "Shipped",
  "Out for Delivery",
  "Delivered",
];

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const res = await axios.post(`${BACKEND_URL}/api/order/list`);
      if (res.data.success) {
        setOrders(res.data.orders.reverse());
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const updateStatus = async (orderId, status) => {
    try {
      const res = await axios.post(`${BACKEND_URL}/api/order/status`, {
        orderId,
        status,
      });
      if (res.data.success) {
        setOrders((prev) =>
          prev.map((o) => (o._id === orderId ? { ...o, status } : o))
        );
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div>
      <p className="mb-4 font-semibold text-lg">Order Page</p>

      {orders.length === 0 ? (
        <p className="text-gray-400 text-sm">No orders found.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {orders.map((order) => {
            const addr = order.address;
            const itemsText = order.items
              .map((i) => `${i.name} x ${i.quantity} ${i.size}`)
              .join(", ");
            const date = new Date(order.date).toLocaleDateString();

            return (
              <div
                key={order._id}
                className="grid grid-cols-1 sm:grid-cols-[auto_1fr_auto_auto_auto] gap-4 items-start border border-gray-200 bg-white p-5 rounded"
              >
                {/* Parcel icon */}
                <img
                  src={adminAssets.parcel_icon}
                  alt=""
                  className="w-12 shrink-0"
                />

                {/* Items + address */}
                <div className="text-sm">
                  <p className="text-gray-800 font-medium leading-5">
                    {itemsText}
                  </p>
                  <p className="mt-2 text-gray-700 font-medium">
                    {addr.firstName} {addr.lastName}
                  </p>
                  <p className="text-gray-500">
                    {addr.street},<br />
                    {addr.city}, {addr.state}, {addr.country}, {addr.zipcode}
                  </p>
                  <p className="text-gray-500">{addr.phone}</p>
                </div>

                {/* Meta */}
                <div className="text-sm text-gray-600 space-y-1 min-w-[130px]">
                  <p>Items : {order.items.length}</p>
                  <p>Method : {order.paymentMethod}</p>
                  <p>Payment : {order.payment ? "Done" : "Pending"}</p>
                  <p>Date : {date}</p>
                </div>

                {/* Amount */}
                <p className="text-sm font-medium text-gray-800 min-w-[60px]">
                  ${order.amount}
                </p>

                {/* Status dropdown */}
                <select
                  value={order.status}
                  onChange={(e) => updateStatus(order._id, e.target.value)}
                  className="text-sm border border-gray-300 rounded px-2 py-1.5 outline-none focus:border-gray-500 bg-white"
                >
                  {STATUS_OPTIONS.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
