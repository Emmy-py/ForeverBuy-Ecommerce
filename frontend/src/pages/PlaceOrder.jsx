import { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { assets } from "../assets/assets";

const PlaceOrder = () => {
  const { products, currency, cartItems, delivery_fee } = useContext(ShopContext);
  const [method, setMethod] = useState("cod");

  const cartData = [];
  for (const [itemId, sizes] of Object.entries(cartItems)) {
    for (const [size, quantity] of Object.entries(sizes)) {
      if (quantity > 0) cartData.push({ itemId, size, quantity });
    }
  }

  const subtotal = cartData.reduce((total, { itemId, quantity }) => {
    const product = products.find((p) => p._id === itemId);
    return product ? total + product.price * quantity : total;
  }, 0);

  return (
    <div className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t border-gray-300">
      {/* Left — Delivery Information */}
      <div className="flex flex-col gap-4 w-full sm:max-w-120">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1="DELIVERY" text2="INFORMATION" />
        </div>

        <div className="flex gap-3">
          <input
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full text-sm outline-none focus:border-gray-500"
            type="text"
            placeholder="First name"
          />
          <input
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full text-sm outline-none focus:border-gray-500"
            type="text"
            placeholder="Last name"
          />
        </div>

        <input
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full text-sm outline-none focus:border-gray-500"
          type="email"
          placeholder="Email address"
        />

        <input
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full text-sm outline-none focus:border-gray-500"
          type="text"
          placeholder="Street"
        />

        <div className="flex gap-3">
          <input
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full text-sm outline-none focus:border-gray-500"
            type="text"
            placeholder="City"
          />
          <input
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full text-sm outline-none focus:border-gray-500"
            type="text"
            placeholder="State"
          />
        </div>

        <div className="flex gap-3">
          <input
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full text-sm outline-none focus:border-gray-500"
            type="text"
            placeholder="Zip code"
          />
          <input
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full text-sm outline-none focus:border-gray-500"
            type="text"
            placeholder="Country"
          />
        </div>

        <input
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full text-sm outline-none focus:border-gray-500"
          type="tel"
          placeholder="Phone"
        />
      </div>

      {/* Right — Cart Totals + Payment */}
      <div className="mt-8 sm:mt-0">
        {/* Cart Totals */}
        <div className="w-full sm:min-w-90">
          <div className="text-2xl my-3">
            <Title text1="CART" text2="TOTALS" />
          </div>

          <div className="flex flex-col gap-2 mt-2 text-sm">
            <div className="flex justify-between pb-1 border-b border-gray-200">
              <p className="text-gray-600">Subtotal</p>
              <p>{currency}{subtotal.toFixed(2)}</p>
            </div>
            <div className="flex justify-between pb-1 border-b border-gray-200">
              <p className="text-gray-600">Shipping Fee</p>
              <p>{currency}{delivery_fee}</p>
            </div>
            <div className="flex justify-between font-medium">
              <p>Total</p>
              <p>{currency}{(subtotal + delivery_fee).toFixed(2)}</p>
            </div>
          </div>
        </div>

        {/* Payment Method */}
        <div className="mt-12">
          <div className="text-base sm:text-lg font-medium mb-4">
            <Title text1="PAYMENT" text2="METHOD" />
          </div>

          <div className="flex gap-3 flex-col lg:flex-row">
            {/* Stripe */}
            <div
              onClick={() => setMethod("stripe")}
              className={`flex items-center gap-3 border p-3 px-5 cursor-pointer rounded transition-colors ${
                method === "stripe" ? "border-green-400" : "border-gray-300"
              }`}
            >
              <div
                className={`w-3.5 h-3.5 rounded-full border-2 shrink-0 ${
                  method === "stripe" ? "border-green-500 bg-green-500" : "border-gray-400"
                }`}
              />
              <img className="h-5 mx-4" src={assets.stripe_logo} alt="Stripe" />
            </div>

            {/* Razorpay */}
            <div
              onClick={() => setMethod("razorpay")}
              className={`flex items-center gap-3 border p-3 px-5 cursor-pointer rounded transition-colors ${
                method === "razorpay" ? "border-green-400" : "border-gray-300"
              }`}
            >
              <div
                className={`w-3.5 h-3.5 rounded-full border-2 shrink-0 ${
                  method === "razorpay" ? "border-green-500 bg-green-500" : "border-gray-400"
                }`}
              />
              <img className="h-5 mx-4" src={assets.razorpay_logo} alt="Razorpay" />
            </div>

            {/* Cash on Delivery */}
            <div
              onClick={() => setMethod("cod")}
              className={`flex items-center gap-3 border p-3 px-5 cursor-pointer rounded transition-colors ${
                method === "cod" ? "border-green-400" : "border-gray-300"
              }`}
            >
              <div
                className={`w-3.5 h-3.5 rounded-full border-2 shrink-0 ${
                  method === "cod" ? "border-green-500 bg-green-500" : "border-gray-400"
                }`}
              />
              <p className="text-gray-500 text-sm font-medium mx-4">CASH ON DELIVERY</p>
            </div>
          </div>

          <div className="w-full text-end mt-8">
            <button className="bg-black text-white text-sm px-16 py-3 hover:bg-gray-800 active:bg-gray-700 transition-colors">
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
