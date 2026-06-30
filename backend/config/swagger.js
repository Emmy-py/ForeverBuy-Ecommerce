const ok = (description, extra = {}) => ({
    description,
    content: { 'application/json': { schema: { type: 'object', properties: { success: { type: 'boolean', example: true }, ...extra } } } },
})

const err = (description) => ({
    description,
    content: { 'application/json': { schema: { type: 'object', properties: { success: { type: 'boolean', example: false }, message: { type: 'string' } } } } },
})

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'ForeverBuy API',
        version: '1.0.0',
        description: 'REST API for ForeverBuy fashion e-commerce',
    },
    servers: [{ url: 'http://localhost:4000' }],
    components: {
        securitySchemes: {
            userToken: {
                type: 'apiKey',
                in: 'header',
                name: 'token',
                description: 'JWT returned from /api/user/login or /api/user/register',
            },
            adminToken: {
                type: 'apiKey',
                in: 'header',
                name: 'token',
                description: 'JWT returned from /api/user/admin',
            },
        },
        schemas: {
            Product: {
                type: 'object',
                properties: {
                    _id: { type: 'string' },
                    name: { type: 'string' },
                    description: { type: 'string' },
                    price: { type: 'number' },
                    image: { type: 'array', items: { type: 'string' } },
                    category: { type: 'string' },
                    subCategory: { type: 'string' },
                    sizes: { type: 'array', items: { type: 'string' } },
                    bestseller: { type: 'boolean' },
                    date: { type: 'number' },
                },
            },
            Order: {
                type: 'object',
                properties: {
                    _id: { type: 'string' },
                    userId: { type: 'string' },
                    items: { type: 'array', items: { type: 'object' } },
                    amount: { type: 'number' },
                    address: { type: 'object' },
                    status: { type: 'string', example: 'Order Placed' },
                    paymentMethod: { type: 'string', enum: ['COD', 'Stripe'] },
                    payment: { type: 'boolean' },
                    date: { type: 'number' },
                },
            },
            Address: {
                type: 'object',
                properties: {
                    firstName: { type: 'string' },
                    lastName: { type: 'string' },
                    email: { type: 'string' },
                    street: { type: 'string' },
                    city: { type: 'string' },
                    state: { type: 'string' },
                    zipcode: { type: 'string' },
                    country: { type: 'string' },
                    phone: { type: 'string' },
                },
            },
        },
    },
    paths: {
        // ─── USER ────────────────────────────────────────────────────────
        '/api/user/register': {
            post: {
                tags: ['User'],
                summary: 'Register a new user',
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                required: ['name', 'email', 'password'],
                                properties: {
                                    name: { type: 'string', example: 'Jane Doe' },
                                    email: { type: 'string', example: 'jane@example.com' },
                                    password: { type: 'string', example: 'secret123' },
                                },
                            },
                        },
                    },
                },
                responses: {
                    201: ok('User registered', { token: { type: 'string' } }),
                    400: err('Validation error — missing fields, invalid email, or weak password'),
                    409: err('Email already in use'),
                    500: err('Server error'),
                },
            },
        },
        '/api/user/login': {
            post: {
                tags: ['User'],
                summary: 'Log in as a user',
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                required: ['email', 'password'],
                                properties: {
                                    email: { type: 'string', example: 'jane@example.com' },
                                    password: { type: 'string', example: 'secret123' },
                                },
                            },
                        },
                    },
                },
                responses: {
                    200: ok('Login successful', { token: { type: 'string' } }),
                    400: err('Missing email or password'),
                    401: err('Incorrect password'),
                    404: err('No account found with this email'),
                    500: err('Server error'),
                },
            },
        },
        '/api/user/admin': {
            post: {
                tags: ['User'],
                summary: 'Log in as admin',
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                required: ['email', 'password'],
                                properties: {
                                    email: { type: 'string', example: 'admin@foreverbuy.com' },
                                    password: { type: 'string', example: 'admin123' },
                                },
                            },
                        },
                    },
                },
                responses: {
                    200: ok('Admin login successful', { token: { type: 'string' } }),
                    400: err('Missing email or password'),
                    401: err('Invalid admin credentials'),
                    500: err('Server error'),
                },
            },
        },

        // ─── PRODUCT ─────────────────────────────────────────────────────
        '/api/product/add': {
            post: {
                tags: ['Product'],
                summary: 'Add a product (admin)',
                security: [{ adminToken: [] }],
                requestBody: {
                    required: true,
                    content: {
                        'multipart/form-data': {
                            schema: {
                                type: 'object',
                                required: ['name', 'description', 'price', 'category', 'subCategory', 'sizes'],
                                properties: {
                                    name: { type: 'string' },
                                    description: { type: 'string' },
                                    price: { type: 'number' },
                                    category: { type: 'string', example: 'Men' },
                                    subCategory: { type: 'string', example: 'Topwear' },
                                    sizes: { type: 'string', example: '["S","M","L","XL"]' },
                                    bestseller: { type: 'string', enum: ['true', 'false'] },
                                    image1: { type: 'string', format: 'binary' },
                                    image2: { type: 'string', format: 'binary' },
                                    image3: { type: 'string', format: 'binary' },
                                    image4: { type: 'string', format: 'binary' },
                                },
                            },
                        },
                    },
                },
                responses: {
                    201: ok('Product added successfully'),
                    400: err('Missing required fields or no image provided'),
                    401: err('No token provided'),
                    403: err('Admin access only'),
                    500: err('Server error'),
                },
            },
        },
        '/api/product/remove': {
            delete: {
                tags: ['Product'],
                summary: 'Remove a product (admin)',
                security: [{ adminToken: [] }],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                required: ['id'],
                                properties: { id: { type: 'string' } },
                            },
                        },
                    },
                },
                responses: {
                    200: ok('Product removed successfully'),
                    400: err('Product ID is required'),
                    401: err('No token provided'),
                    403: err('Admin access only'),
                    404: err('Product not found'),
                    500: err('Server error'),
                },
            },
        },
        '/api/product/single': {
            post: {
                tags: ['Product'],
                summary: 'Get a single product by ID',
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                required: ['productId'],
                                properties: { productId: { type: 'string' } },
                            },
                        },
                    },
                },
                responses: {
                    200: ok('Product data', { product: { $ref: '#/components/schemas/Product' } }),
                    400: err('Product ID is required'),
                    404: err('Product not found'),
                    500: err('Server error'),
                },
            },
        },
        '/api/product/list': {
            get: {
                tags: ['Product'],
                summary: 'List all products',
                responses: {
                    200: ok('All products', { products: { type: 'array', items: { $ref: '#/components/schemas/Product' } } }),
                    500: err('Server error'),
                },
            },
        },

        // ─── CART ─────────────────────────────────────────────────────────
        '/api/cart/get': {
            post: {
                tags: ['Cart'],
                summary: 'Get user cart',
                security: [{ userToken: [] }],
                responses: {
                    200: ok('Cart data', { cartData: { type: 'object', example: { productId: { M: 2 } } } }),
                    401: err('No token provided or invalid token'),
                    404: err('User not found'),
                    500: err('Server error'),
                },
            },
        },
        '/api/cart/add': {
            post: {
                tags: ['Cart'],
                summary: 'Add item to cart',
                security: [{ userToken: [] }],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                required: ['itemId', 'size'],
                                properties: {
                                    itemId: { type: 'string' },
                                    size: { type: 'string', example: 'M' },
                                },
                            },
                        },
                    },
                },
                responses: {
                    200: ok('Item added to cart'),
                    400: err('Item ID and size are required'),
                    401: err('No token provided or invalid token'),
                    404: err('User not found'),
                    500: err('Server error'),
                },
            },
        },
        '/api/cart/update': {
            post: {
                tags: ['Cart'],
                summary: 'Update cart item quantity',
                security: [{ userToken: [] }],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                required: ['itemId', 'size', 'quantity'],
                                properties: {
                                    itemId: { type: 'string' },
                                    size: { type: 'string', example: 'M' },
                                    quantity: { type: 'number', example: 3 },
                                },
                            },
                        },
                    },
                },
                responses: {
                    200: ok('Cart updated'),
                    400: err('Item ID, size, and quantity are required'),
                    401: err('No token provided or invalid token'),
                    404: err('User not found'),
                    500: err('Server error'),
                },
            },
        },

        // ─── ORDER ────────────────────────────────────────────────────────
        '/api/order/place': {
            post: {
                tags: ['Order'],
                summary: 'Place a COD order',
                security: [{ userToken: [] }],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                required: ['items', 'amount', 'address'],
                                properties: {
                                    items: { type: 'array', items: { type: 'object' } },
                                    amount: { type: 'number' },
                                    address: { $ref: '#/components/schemas/Address' },
                                },
                            },
                        },
                    },
                },
                responses: {
                    201: ok('Order placed successfully'),
                    400: err('Items, amount, and address are required'),
                    401: err('No token provided or invalid token'),
                    500: err('Server error'),
                },
            },
        },
        '/api/order/stripe': {
            post: {
                tags: ['Order'],
                summary: 'Place a Stripe order — returns session_url for redirect',
                security: [{ userToken: [] }],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                required: ['items', 'amount', 'address'],
                                properties: {
                                    items: { type: 'array', items: { type: 'object' } },
                                    amount: { type: 'number' },
                                    address: { $ref: '#/components/schemas/Address' },
                                },
                            },
                        },
                    },
                },
                responses: {
                    201: ok('Stripe session created', { session_url: { type: 'string' } }),
                    400: err('Items, amount, and address are required'),
                    401: err('No token provided or invalid token'),
                    500: err('Failed to initiate Stripe payment'),
                },
            },
        },
        '/api/order/verifyStripe': {
            post: {
                tags: ['Order'],
                summary: 'Verify Stripe payment after redirect',
                security: [{ userToken: [] }],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                required: ['orderId', 'success'],
                                properties: {
                                    orderId: { type: 'string' },
                                    success: { type: 'string', enum: ['true', 'false'] },
                                },
                            },
                        },
                    },
                },
                responses: {
                    200: ok('Payment verified (success=true) or order removed (success=false)'),
                    400: err('Order ID and payment status are required'),
                    401: err('No token provided or invalid token'),
                    500: err('Payment verification failed'),
                },
            },
        },
        '/api/order/userorders': {
            post: {
                tags: ['Order'],
                summary: 'Get orders for the logged-in user',
                security: [{ userToken: [] }],
                responses: {
                    200: ok('User orders', { orders: { type: 'array', items: { $ref: '#/components/schemas/Order' } } }),
                    401: err('No token provided or invalid token'),
                    500: err('Server error'),
                },
            },
        },
        '/api/order/list': {
            post: {
                tags: ['Order'],
                summary: 'Get all orders (admin)',
                security: [{ adminToken: [] }],
                responses: {
                    200: ok('All orders', { orders: { type: 'array', items: { $ref: '#/components/schemas/Order' } } }),
                    401: err('No token provided'),
                    403: err('Admin access only'),
                    500: err('Server error'),
                },
            },
        },
        '/api/order/status': {
            post: {
                tags: ['Order'],
                summary: 'Update order status (admin)',
                security: [{ adminToken: [] }],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                required: ['orderId', 'status'],
                                properties: {
                                    orderId: { type: 'string' },
                                    status: { type: 'string', example: 'Shipped' },
                                },
                            },
                        },
                    },
                },
                responses: {
                    200: ok('Order status updated'),
                    400: err('Order ID and status are required'),
                    401: err('No token provided'),
                    403: err('Admin access only'),
                    404: err('Order not found'),
                    500: err('Server error'),
                },
            },
        },
    },
}

export default swaggerDefinition
