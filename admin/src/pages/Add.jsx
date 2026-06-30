import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'
import { backendUrl } from '../App'

const SIZES = ['S', 'M', 'L', 'XL', 'XXL']

const Add = ({ token }) => {
  const [images, setImages] = useState([null, null, null, null])
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('Men')
  const [subCategory, setSubCategory] = useState('Topwear')
  const [price, setPrice] = useState('')
  const [sizes, setSizes] = useState([])
  const [bestseller, setBestseller] = useState(false)

  const setImage = (index, file) => {
    setImages(prev => prev.map((img, i) => (i === index ? file : img)))
  }

  const toggleSize = (size) => {
    setSizes(prev =>
      prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
    )
  }

  const resetForm = () => {
    setImages([null, null, null, null])
    setName('')
    setDescription('')
    setCategory('Men')
    setSubCategory('Topwear')
    setPrice('')
    setSizes([])
    setBestseller(false)
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault()

    const hasImage = images.some(Boolean)
    if (!hasImage) {
      toast.error('Please upload at least one product image.')
      return
    }

    try {
      const formData = new FormData()
      images.forEach((img, i) => {
        if (img) formData.append(`image${i + 1}`, img)
      })
      formData.append('name', name)
      formData.append('description', description)
      formData.append('price', price)
      formData.append('category', category)
      formData.append('subCategory', subCategory)
      formData.append('sizes', JSON.stringify(sizes))
      formData.append('bestseller', String(bestseller))

      const res = await axios.post(`${backendUrl}/api/product/add`, formData, {
        headers: { token },
      })

      if (res.data.success) {
        toast.success(res.data.message)
        resetForm()
      } else {
        toast.error(res.data.message)
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message)
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col w-full items-start gap-4">
      {/* Image upload */}
      <div>
        <p className="mb-2 font-medium">Upload Image</p>
        <div className="flex gap-2">
          {images.map((img, i) => (
            <label key={i} htmlFor={`image${i}`} className="cursor-pointer">
              <img
                className="w-20 h-20 object-cover border border-gray-200 rounded"
                src={img ? URL.createObjectURL(img) : assets.upload_area}
                alt={`Upload ${i + 1}`}
              />
              <input
                id={`image${i}`}
                type="file"
                accept="image/*"
                hidden
                onChange={e => setImage(i, e.target.files[0] || null)}
              />
            </label>
          ))}
        </div>
      </div>

      {/* Name */}
      <div className="w-full">
        <p className="mb-2 font-medium">Product name</p>
        <input
          value={name}
          onChange={e => setName(e.target.value)}
          className="w-full max-w-[500px] px-3 py-2 border border-gray-300 rounded outline-none focus:border-gray-500"
          type="text"
          placeholder="Type here"
          required
        />
      </div>

      {/* Description */}
      <div className="w-full">
        <p className="mb-2 font-medium">Product description</p>
        <textarea
          value={description}
          onChange={e => setDescription(e.target.value)}
          className="w-full max-w-[500px] px-3 py-2 border border-gray-300 rounded outline-none focus:border-gray-500 resize-none"
          rows={4}
          placeholder="Write content here"
          required
        />
      </div>

      {/* Category / Sub-category / Price */}
      <div className="flex flex-col sm:flex-row gap-4 w-full">
        <div>
          <p className="mb-2 font-medium">Product category</p>
          <select
            value={category}
            onChange={e => setCategory(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded outline-none focus:border-gray-500"
          >
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>

        <div>
          <p className="mb-2 font-medium">Sub category</p>
          <select
            value={subCategory}
            onChange={e => setSubCategory(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded outline-none focus:border-gray-500"
          >
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
          </select>
        </div>

        <div>
          <p className="mb-2 font-medium">Product Price</p>
          <input
            value={price}
            onChange={e => setPrice(e.target.value)}
            className="w-28 px-3 py-2 border border-gray-300 rounded outline-none focus:border-gray-500"
            type="number"
            min="0"
            placeholder="25"
            required
          />
        </div>
      </div>

      {/* Sizes */}
      <div>
        <p className="mb-2 font-medium">Product Sizes</p>
        <div className="flex gap-2 flex-wrap">
          {SIZES.map(size => (
            <button
              key={size}
              type="button"
              onClick={() => toggleSize(size)}
              className={`px-4 py-1.5 rounded border text-sm font-medium transition-colors ${
                sizes.includes(size)
                  ? 'bg-pink-100 border-pink-400 text-pink-700'
                  : 'bg-slate-100 border-slate-200 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Bestseller */}
      <div className="flex items-center gap-2">
        <input
          id="bestseller"
          type="checkbox"
          checked={bestseller}
          onChange={e => setBestseller(e.target.checked)}
          className="w-4 h-4 cursor-pointer accent-pink-500"
        />
        <label htmlFor="bestseller" className="cursor-pointer text-sm">
          Add to bestseller
        </label>
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="px-8 py-3 bg-black text-white rounded hover:bg-gray-800 transition-colors font-medium tracking-wide"
      >
        ADD
      </button>
    </form>
  )
}

export default Add
