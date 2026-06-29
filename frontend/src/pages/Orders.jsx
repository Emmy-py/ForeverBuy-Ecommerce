import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";

const Orders = () => {
  const { products, currency, cartItems } = useContext(ShopContext);

  const orderData = [];
  for (const [itemId, sizes] of Object.entries(cartItems)) {
    for (const [size, quantity] of Object.entries(sizes)) {
      if (quantity > 0) {
        const product = products.find((p) => p._id === itemId);
        if (product) {
          orderData.push({ product, size, quantity });
        }
      }
    }
  }

  return (
    <div className="border-t border-gray-300 pt-16">
      <div className="text-2xl">
        <Title text1="MY" text2="ORDERS" />
      </div>

      <div className="mt-8">
        {orderData.length === 0 ? (
          <p className="text-gray-500 text-sm">No orders yet.</p>
        ) : (
          orderData.map(({ product, size, quantity }, index) => (
            <div
              key={index}
              className="py-4 border-t border-b border-gray-200 text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
            >
              {/* Left: image + details */}
              <div className="flex items-start gap-6">
                <img
                  className="w-16 sm:w-20 object-cover"
                  src={product.image[0]}
                  alt={product.name}
                />
                <div>
                  <p className="sm:text-base font-medium">{product.name}</p>
                  <div className="flex items-center gap-3 mt-1 text-base text-gray-700">
                    <p>{currency}{product.price}</p>
                    <p className="text-sm text-gray-500">Quantity: {quantity}</p>
                    <p className="text-sm text-gray-500">Size: {size}</p>
                  </div>
                  <p className="mt-1 text-sm text-gray-400">
                    Date: <span className="text-gray-600">25, May, 2024</span>
                  </p>
                </div>
              </div>

              {/* Right: status + button */}
              <div className="md:w-1/2 flex justify-between md:justify-end gap-8 items-center">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500 inline-block" />
                  <p className="text-sm">Ready to ship</p>
                </div>
                <button className="border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-50 transition-colors">
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
