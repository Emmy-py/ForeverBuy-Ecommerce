import  { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
import ProductItem from './ProductItem'

export default function LatestCollections() {

  const { products } = useContext(ShopContext)
  const [latestProduct, setLatestProducts] = useState([])

  useEffect(() => {
    setLatestProducts(products.slice(0, 10))
  }, [products])


  return (
    <div className='my-10'>

      <div className='my-6 flex flex-col items-center md:my-8'>
        <Title text1={'LATEST'} text2={'COLLECTIONS'} />

        <p className='text-xs text-gray-600 sm:text-sm md:text-base w-3/4 text-center'>
          Explore the latest additions to our collection, featuring modern styles and everyday essentials.
        </p>
      </div>

      {/* Rendering Products */}
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>

        {latestProduct.map((item, index) => (
          <ProductItem
            key={index}
            id={item._id}
            image={item.image}
            name={item.name}
            price={item.price}
          />
        ))}

      </div>

    </div>
  )
}
