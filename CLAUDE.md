# ForeverBuy E-Commerce

Fashion e-commerce frontend built with React 19, Vite, Tailwind CSS v4, and React Router v7.

## Dev Server

```bash
cd frontend
npm run dev
```

## Project Structure

```
frontend/src/
  assets/assets.js       # Product data (52 products) + all image/icon imports
  context/ShopContext.jsx # Global state: products, cart, search, currency
  pages/
    Home.jsx             # Landing page (Hero + LatestCollections + Bestseller + OurPolicy + NewsletterBox)
    Collection.jsx       # Filterable/sortable product grid
    Product.jsx          # Single product detail with size selector, add-to-cart, related products
    Cart.jsx             # Cart items + totals + checkout button
    PlaceOrder.jsx       # Checkout form
    Orders.jsx           # Order history
    Login.jsx            # Auth page
    About.jsx
    Contact.jsx
  components/
    Navbar.jsx           # Top nav with cart badge (live count from context)
    Footer.jsx
    SearchBar.jsx        # Shown only on /collection when showSearch is true
    ProductItem.jsx      # Reusable product card — always pass image[0], not the full array
    Title.jsx            # Section heading: <Title text1="BOLD" text2="light" />
    Hero.jsx
    LatestCollections.jsx
    Bestseller.jsx
    OurPolicy.jsx
    NewsletterBox.jsx
```

## State Management (ShopContext)

| Value | Type | Purpose |
|---|---|---|
| `products` | Product[] | All 52 products (static import) |
| `currency` | string | "$" |
| `delivery_fee` | number | 10 |
| `cartItems` | `{ [id]: { [size]: qty } }` | Cart contents |
| `addToCart(id, size)` | fn | Increment qty by 1 |
| `updateQuantity(id, size, qty)` | fn | Set qty; 0 removes item |
| `getCartCount()` | fn | Total items for navbar badge |
| `search` / `setSearch` | string | Search input value |
| `showSearch` / `setShowSearch` | bool | Toggle search bar visibility |

## Key Patterns

- **Derived data** — Use `useMemo`, not `useEffect` + `setState`. Collection, LatestCollections, and Bestseller all compute their lists this way.
- **Product images** — Always pass `item.image[0]` to `<ProductItem>`, never the full array.
- **Navigation** — All links use React Router `<Link>` / `<NavLink>`. No `<a href>` tags.
- **Cart** — Cart state lives in `ShopContext`. Product page requires a size selection before the ADD TO CART button activates.

## Tech Stack

| Tool | Version | Notes |
|---|---|---|
| React | 19 | No StrictMode wrapper |
| React Router | v7 (library mode) | `BrowserRouter` + `Routes` |
| Vite | 8 | Dev server + HMR |
| Tailwind CSS | v4 | Via `@tailwindcss/vite` plugin |
