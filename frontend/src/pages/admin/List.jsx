import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { BACKEND_URL } from "./AdminLayout";

const List = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/api/product/list`);
      if (res.data.success) {
        setProducts(res.data.products);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const removeProduct = async (id) => {
    try {
      const res = await axios.delete(`${BACKEND_URL}/api/product/remove`, {
        data: { id },
      });
      if (res.data.success) {
        toast.success(res.data.message);
        setProducts((prev) => prev.filter((p) => p._id !== id));
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <p className="mb-4 font-semibold text-lg">All Products List</p>

      {/* Table header */}
      <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-2 px-4 bg-gray-100 border border-gray-200 text-sm font-medium text-gray-600">
        <p>Image</p>
        <p>Name</p>
        <p>Category</p>
        <p>Price</p>
        <p className="text-center">Action</p>
      </div>

      {/* Rows */}
      {products.length === 0 ? (
        <p className="text-gray-400 text-sm mt-4">No products found.</p>
      ) : (
        products.map((product) => (
          <div
            key={product._id}
            className="grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-2 px-4 border border-t-0 border-gray-200 text-sm text-gray-700"
          >
            <img
              src={product.image[0]}
              alt={product.name}
              className="w-12 h-12 object-cover rounded"
            />
            <p>{product.name}</p>
            <p>{product.category}</p>
            <p>${product.price}</p>
            <p
              onClick={() => removeProduct(product._id)}
              className="text-center cursor-pointer text-gray-500 hover:text-red-500 transition-colors font-bold text-base"
            >
              ✕
            </p>
          </div>
        ))
      )}
    </div>
  );
};

export default List;
