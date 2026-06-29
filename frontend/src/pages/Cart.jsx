import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { assets } from "../assets/assets";

const Cart = () => {
  const { products, currency, cartItems, updateQuantity, delivery_fee } =
    useContext(ShopContext);
  const navigate = useNavigate();

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
    <div className="border-t pt-14">
      <div className="text-2xl mb-3">
        <Title text1="YOUR" text2="CART" />
      </div>

      {/* Cart Items */}
      <div>
        {cartData.length === 0 && (
          <p className="text-gray-500 text-sm py-8">Your cart is empty.</p>
        )}
        {cartData.map(({ itemId, size, quantity }) => {
          const product = products.find((p) => p._id === itemId);
          if (!product) return null;
          return (
            <div key={`${itemId}-${size}`}>
              <div className="py-4 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4">
                <div className="flex items-start gap-6">
                  <img
                    className="w-16 sm:w-20"
                    src={product.image[0]}
                    alt={product.name}
                  />
                  <div>
                    <p className="text-xs sm:text-lg font-medium">
                      {product.name}
                    </p>
                    <div className="flex items-center gap-5 mt-2">
                      <p>
                        {currency}
                        {product.price}
                      </p>
                      <p className="px-2 sm:px-3 sm:py-1 border bg-slate-50">
                        {size}
                      </p>
                    </div>
                  </div>
                </div>
                <input
                  type="number"
                  min={1}
                  value={quantity}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    if (val >= 1) updateQuantity(itemId, size, val);
                  }}
                  className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1"
                />
                <img
                  onClick={() => updateQuantity(itemId, size, 0)}
                  src={assets.bin_icon}
                  className="w-4 mr-4 sm:w-5 cursor-pointer"
                  alt="remove"
                />
              </div>
              <hr />
            </div>
          );
        })}
      </div>

      {/* Cart Totals */}
      <div className="flex justify-end my-20">
        <div className="w-full sm:w-[450px]">
          <div className="text-2xl">
            <Title text1="CART" text2="TOTALS" />
          </div>

          <div className="flex flex-col gap-2 mt-2 text-sm">
            <div className="flex justify-between">
              <p>Subtotal</p>
              <p>
                {currency}
                {subtotal}.00
              </p>
            </div>
            <hr />
            <div className="flex justify-between">
              <p>Shipping Fee</p>
              <p>
                {currency}
                {delivery_fee}
              </p>
            </div>
            <hr />
            <div className="flex justify-between font-medium text-base">
              <b>Total</b>
              <b>
                {currency}
                {subtotal + delivery_fee}.00
              </b>
            </div>
          </div>

          <div className="w-full text-end">
            <button
              onClick={() => navigate("/place-order")}
              className="bg-black text-white text-sm my-8 px-8 py-3 hover:bg-gray-800 active:bg-gray-700 transition-colors"
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
