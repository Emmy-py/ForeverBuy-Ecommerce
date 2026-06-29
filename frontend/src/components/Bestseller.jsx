import { useContext, useMemo } from "react"
import { ShopContext } from "../context/ShopContext"
import Title from "./Title"
import ProductItem from "./ProductItem"

const Bestseller = () => {

    const { products } = useContext(ShopContext)
    const bestseller = useMemo(
        () => products.filter(item => item.bestseller).slice(0, 5),
        [products]
    )

    return (
        <div className="my-7">

            <div className="flex flex-col items-center justify-center">
                <Title text1={'BEST'} text2={'SELLER'} />

                <p className='text-xs text-gray-600 sm:text-sm md:text-base w-3/4 text-center'>
                    Discover customer favorites and trending products that have become our top-selling items.
                </p>
            </div>

            {/* Rendering Best Sellers */}

            <div className="grid mt-8 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">

                {bestseller.map((item, index) => (
                    <ProductItem
                        key={index}
                        id={item._id}
                        image={item.image[0]}
                        name={item.name}
                        price={item.price}
                    />
                ))}

            </div>

        </div>
    )
}

export default Bestseller