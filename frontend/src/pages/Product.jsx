import { useContext, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import ProductItem from "../components/ProductItem";

const Product = () => {

  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);

  const productData = useMemo(
    () => products.find((item) => item._id === productId) || null,
    [productId, products]
  );

  const relatedProducts = useMemo(() => {
    if (!productData) return [];
    return products
      .filter((item) => item.category === productData.category && item._id !== productId)
      .slice(0, 5);
  }, [productData, productId, products]);

  const [selectedImage, setSelectedImage] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [activeTab, setActiveTab] = useState('description');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [productId]);

  const image = selectedImage && productData?.image.includes(selectedImage)
    ? selectedImage
    : productData?.image[0] || '';

  return productData ? (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">

      {/* Product Data */}
      <div className="flex gap-12 flex-col sm:flex-row">

        {/* Thumbnail column */}
        <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full gap-2">
          {productData.image.map((item, index) => (
            <img
              onClick={() => setSelectedImage(item)}
              src={item}
              key={index}
              className={`w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer border-2 ${image === item ? 'border-orange-500' : 'border-transparent'}`}
            />
          ))}
        </div>

        {/* Main image */}
        <div className="w-full sm:w-[50%]">
          <img src={image} className="w-full h-auto" alt={productData.name} />
        </div>

        {/* Product info */}
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>

          <div className="flex items-center gap-1 mt-2">
            {[1,2,3,4].map((s) => (
              <svg key={s} className="w-3.5 fill-orange-400" viewBox="0 0 20 20">
                <path d="M10 15l-5.878 3.09L5.6 11.636 1 7.545l6.061-.882L10 1l2.939 5.663 6.061.882-4.6 4.091 1.478 6.454z"/>
              </svg>
            ))}
            <svg className="w-3.5 fill-gray-300" viewBox="0 0 20 20">
              <path d="M10 15l-5.878 3.09L5.6 11.636 1 7.545l6.061-.882L10 1l2.939 5.663 6.061.882-4.6 4.091 1.478 6.454z"/>
            </svg>
            <p className="pl-2 text-sm text-gray-500">(122)</p>
          </div>

          <p className="mt-5 text-3xl font-medium">{currency}{productData.price}</p>
          <p className="mt-5 text-gray-500 md:w-4/5">{productData.description}</p>

          {/* Size selector */}
          {productData.sizes && productData.sizes.length > 0 && (
            <div className="flex flex-col gap-4 my-8">
              <p className="font-medium">Select Size</p>
              <div className="flex gap-2">
                {productData.sizes.map((size, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedSize(size)}
                    className={`border py-2 px-4 text-sm ${selectedSize === size ? 'border-orange-500 bg-orange-50' : 'bg-gray-100'}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          <button
            onClick={() => {
              if (!selectedSize) return;
              addToCart(productData._id, selectedSize);
            }}
            className={`px-8 py-3 text-sm text-white transition-colors ${
              selectedSize
                ? "bg-black active:bg-gray-700 hover:bg-gray-800"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            ADD TO CART
          </button>
          {!selectedSize && (
            <p className="text-xs text-red-500 mt-2">Please select a size</p>
          )}

          <hr className="mt-8 sm:w-4/5" />
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% Original product.</p>
            <p>Cash on delivery is available on this product.</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>

      </div>

      {/* Description / Reviews tabs */}
      <div className="mt-20">
        <div className="flex">
          <button
            onClick={() => setActiveTab('description')}
            className={`px-5 py-3 text-sm border ${activeTab === 'description' ? 'font-bold' : 'text-gray-500'}`}
          >
            Description
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`px-5 py-3 text-sm border ${activeTab === 'reviews' ? 'font-bold' : 'text-gray-500'}`}
          >
            Reviews (122)
          </button>
        </div>
        <div className="border px-6 py-6 text-sm text-gray-500 flex flex-col gap-4">
          {activeTab === 'description' ? (
            <>
              <p>
                An e-commerce website is an online platform that facilitates the buying and selling of products or services over the internet. It serves as a virtual marketplace where businesses and individuals can showcase their products, interact with customers, and conduct transactions without the need for a physical presence. E-commerce websites have gained immense popularity due to their convenience, accessibility, and the global reach they offer.
              </p>
              <p>
                E-commerce websites typically display products or services along with detailed descriptions, images, prices, and any available variations (e.g., sizes, colors). Each product usually has its own dedicated page with relevant information.
              </p>
            </>
          ) : (
            <p>No reviews yet. Be the first to review this product.</p>
          )}
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-24">
          <div className="text-center text-3xl py-2">
            <div className="flex items-center justify-center gap-2">
              <p className="text-gray-500 font-light tracking-widest">RELATED</p>
              <p className="text-gray-700 font-medium tracking-widest">PRODUCTS</p>
              <p className="text-gray-700 font-medium">—</p>
            </div>
            <p className="w-3/4 m-auto text-xs sm:text-sm text-gray-400 mt-2">
              Simply dummy text of the printing and typesetting industry.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6 mt-12">
            {relatedProducts.map((item) => (
              <ProductItem
                key={item._id}
                id={item._id}
                image={item.image[0]}
                name={item.name}
                price={item.price}
              />
            ))}
          </div>
        </div>
      )}

    </div>
  ) : <div className="opacity-0"></div>;
};

export default Product;
