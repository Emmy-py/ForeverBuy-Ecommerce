import { v2 as cloudinary } from 'cloudinary'
import productModel from '../models/productModel.js'

// POST /api/product/add  (admin)
const addProduct = async (req, res) => {
    try {
        const { name, description, price, category, subCategory, sizes, bestseller } = req.body

        if (!name || !description || !price || !category || !subCategory || !sizes) {
            return res.status(400).json({ success: false, message: 'All product fields are required.' })
        }

        const images = ['image1', 'image2', 'image3', 'image4']
            .map(key => req.files[key]?.[0])
            .filter(Boolean)

        if (images.length === 0) {
            return res.status(400).json({ success: false, message: 'At least one product image is required.' })
        }

        const imageUrls = await Promise.all(
            images.map(img =>
                cloudinary.uploader.upload(img.path, { resource_type: 'image' })
                    .then(result => result.secure_url)
            )
        )

        const product = new productModel({
            name,
            description,
            price: Number(price),
            image: imageUrls,
            category,
            subCategory,
            sizes: JSON.parse(sizes),
            bestseller: bestseller === 'true',
            date: Date.now(),
        })

        await product.save()
        res.status(201).json({ success: true, message: 'Product added successfully.' })
    } catch (error) {
        console.error(error)
        res.status(500).json({ success: false, message: 'Failed to add product. Please try again.' })
    }
}

// DELETE /api/product/remove  (admin)
const removeProduct = async (req, res) => {
    try {
        const { id } = req.body

        if (!id) {
            return res.status(400).json({ success: false, message: 'Product ID is required.' })
        }

        const product = await productModel.findByIdAndDelete(id)
        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found.' })
        }

        res.status(200).json({ success: true, message: 'Product removed successfully.' })
    } catch (error) {
        console.error(error)
        res.status(500).json({ success: false, message: 'Failed to remove product. Please try again.' })
    }
}

// POST /api/product/single
const singleProduct = async (req, res) => {
    try {
        const { productId } = req.body

        if (!productId) {
            return res.status(400).json({ success: false, message: 'Product ID is required.' })
        }

        const product = await productModel.findById(productId)
        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found.' })
        }

        res.status(200).json({ success: true, product })
    } catch (error) {
        console.error(error)
        res.status(500).json({ success: false, message: 'Failed to fetch product. Please try again.' })
    }
}

// GET /api/product/list
const listProducts = async (req, res) => {
    try {
        const products = await productModel.find({})
        res.status(200).json({ success: true, products })
    } catch (error) {
        console.error(error)
        res.status(500).json({ success: false, message: 'Failed to fetch products. Please try again.' })
    }
}

export { addProduct, removeProduct, singleProduct, listProducts }
