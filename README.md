# ForeverBuy E-Commerce

A full-stack fashion e-commerce platform built with React 19, Node.js, MongoDB, and Tailwind CSS v4. Features a customer-facing storefront, a REST API backend, and an integrated admin panel.

---

## Features

### Storefront
- Browse 52 products across Men, Women, and Kids categories
- Filter by category and sub-category (Topwear, Bottomwear, Winterwear)
- Sort by price (low to high / high to low)
- Live search from any page
- Product detail page with image gallery, size selector, and related products
- Shopping cart with quantity management and order totals
- Checkout with Stripe payment or Cash on Delivery
- Responsive mobile navigation with hamburger menu

### Admin Panel (at `/admin`)
- Add new products — up to 4 images (uploaded to Cloudinary), name, description, category, sub-category, price, sizes, bestseller flag
- List all products with one-click delete
- View and manage all orders — update status from Order Placed through to Delivered

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, React Router v7, Tailwind CSS v4, Vite 8 |
| State | React Context API |
| Backend | Node.js, Express 5 |
| Database | MongoDB via Mongoose |
| Image storage | Cloudinary |
| Payments | Stripe |
| Auth | JWT (bcrypt for passwords) |
| File uploads | Multer |

---

## Project Structure

```
foreverbuy-ecommerce/
├── frontend/                  # Customer storefront + admin panel
│   └── src/
│       ├── assets/            # Product data (52 items), images, icons
│       ├── components/        # Navbar, Footer, ProductItem, SearchBar, etc.
│       ├── context/           # ShopContext — products, cart, search state
│       └── pages/
│           ├── Home.jsx
│           ├── Collection.jsx
│           ├── Product.jsx
│           ├── Cart.jsx
│           ├── PlaceOrder.jsx
│           ├── Orders.jsx
│           ├── Login.jsx
│           ├── About.jsx
│           ├── Contact.jsx
│           └── admin/
│               ├── AdminLayout.jsx
│               ├── AdminLogin.jsx
│               ├── Add.jsx
│               ├── List.jsx
│               └── AdminOrders.jsx
│
└── backend/                   # REST API
    ├── config/                # MongoDB, Cloudinary, Swagger
    ├── controllers/           # userController, productController, orderController, cartController
    ├── middlewares/           # auth, adminAuth, multer
    ├── models/                # User, Product, Order schemas
    ├── routes/                # userRoute, productRoute, orderRoute, cartRoute
    └── server.js
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB Atlas account (or local MongoDB)
- Cloudinary account
- Stripe account

---

### Backend

```bash
cd backend
npm install
```

Create a `.env` file in `backend/`:

```env
MONGODB_URI=your_mongodb_connection_string
CLOUDINARY_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_SECRET_KEY=your_cloudinary_api_secret
JWT_SECRET=your_jwt_secret_key
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=your_admin_password
STRIPE_SECRET_KEY=your_stripe_secret_key
PORT=4000
```

Start the server:

```bash
npm run dev       # development (nodemon)
npm start         # production
```

API runs at `http://localhost:4000`
Swagger docs available at `http://localhost:4000/docs`

---

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Storefront runs at `http://localhost:5173`
Admin panel at `http://localhost:5173/admin`

---

## API Endpoints

### Users
| Method | Route | Auth | Description |
|---|---|---|---|
| POST | `/api/user/register` | — | Register a new user |
| POST | `/api/user/login` | — | Login a user |
| POST | `/api/user/admin` | — | Admin login |

### Products
| Method | Route | Auth | Description |
|---|---|---|---|
| POST | `/api/product/add` | Admin | Add a product (multipart/form-data) |
| DELETE | `/api/product/remove` | Admin | Remove a product by ID |
| GET | `/api/product/list` | — | Get all products |
| POST | `/api/product/single` | — | Get a single product by ID |

### Cart
| Method | Route | Auth | Description |
|---|---|---|---|
| POST | `/api/cart/add` | User | Add item to cart |
| POST | `/api/cart/update` | User | Update cart item quantity |
| POST | `/api/cart/get` | User | Get user's cart |

### Orders
| Method | Route | Auth | Description |
|---|---|---|---|
| POST | `/api/order/place` | User | Place a COD order |
| POST | `/api/order/stripe` | User | Place a Stripe order |
| POST | `/api/order/verifyStripe` | User | Verify Stripe payment |
| POST | `/api/order/userorders` | User | Get orders for logged-in user |
| POST | `/api/order/list` | Admin | Get all orders |
| POST | `/api/order/status` | Admin | Update order status |

---

## Author

**Emmanuel Ngene** — Software Engineer
