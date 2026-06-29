import { createContext, useEffect, useState } from "react";
import { products } from "../assets/assets";

export const ShopContext = createContext();

const CART_KEY = "foreverbuy_cart";

const ShopContextProvider = (props) => {

  const currency = "$";
  const delivery_fee = 10;

  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem(CART_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (itemId, size) => {
    setCartItems(prev => ({
      ...prev,
      [itemId]: {
        ...prev[itemId],
        [size]: (prev[itemId]?.[size] || 0) + 1,
      },
    }));
  };

  const updateQuantity = (itemId, size, quantity) => {
    setCartItems(prev => {
      const updated = {
        ...prev,
        [itemId]: { ...prev[itemId], [size]: quantity },
      };
      if (quantity <= 0) {
        delete updated[itemId][size];
        if (Object.keys(updated[itemId]).length === 0) delete updated[itemId];
      }
      return updated;
    });
  };

  const getCartCount = () => {
    let count = 0;
    for (const sizes of Object.values(cartItems)) {
      for (const qty of Object.values(sizes)) count += qty;
    }
    return count;
  };

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    updateQuantity,
    getCartCount,
  };

  return (
    <ShopContext.Provider value={value}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
