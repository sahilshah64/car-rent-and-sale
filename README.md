# 🚗 ZoomCar — Full MERN Stack App

A complete car marketplace with **Admin Panel**, **Checkout**, **Blog**, **Orders** and full **Auth**.

---

## 📁 Full Project Structure

```
zoomcar/
│
├── frontend/
│   └── src/
│       ├── components/
│       │   ├── Navbar/
│       │   │   ├── Navbar.jsx          ← Top nav, user menu, cart badge
│       │   │   └── CartDropdown.jsx    ← Slide-out cart
│       │   ├── Hero/
│       │   │   └── Hero.jsx            ← Full-screen hero + search
│       │   ├── Brands/
│       │   │   └── BrandsSection.jsx
│       │   ├── CarCard/
│       │   │   └── CarCard.jsx         ← Car listing card + wishlist
│       │   ├── Vehicles/
│       │   │   └── VehicleSection.jsx  ← Filtered grid + pagination (live API)
│       │   ├── Shop/
│       │   │   └── ShopSection.jsx     ← Categories + Model Y banner
│       │   └── Footer/
│       │       └── Footer.jsx
│       │
│       ├── context/
│       │   ├── AuthContext.jsx         ← Login/register/logout state
│       │   └── CartContext.jsx         ← Cart + wishlist state
│       │
│       ├── pages/
│       │   ├── HomePage.jsx
│       │   ├── InventoryPage.jsx
│       │   ├── CarDetailPage.jsx       ← Single car view + Book Now
│       │   ├── CheckoutPage.jsx        ← 2-step checkout (details → payment)
│       │   ├── OrdersPage.jsx          ← User's order history
│       │   ├── BlogPage.jsx            ← Blog list + blog detail
│       │   ├── ContactPage.jsx         ← Contact form
│       │   ├── AuthPages.jsx           ← Login + Register
│       │   └── admin/
│       │       ├── AdminLayout.jsx     ← Sidebar layout for admin
│       │       ├── AdminDashboard.jsx  ← Stats + recent orders
│       │       ├── AdminCars.jsx       ← Add / Edit / Delete cars
│       │       ├── AdminOrders.jsx     ← View + update order status
│       │       ├── AdminBlogs.jsx      ← Write / edit / delete blog posts
│       │       └── AdminUsers.jsx      ← View users, change roles, delete
│       │
│       ├── utils/
│       │   └── api.js                  ← Axios instance (auto adds JWT token)
│       │
│       └── App.jsx                     ← All routes defined here
│
└── backend/
    ├── config/
    │   └── db.js                       ← MongoDB connect
    ├── models/
    │   ├── Car.js
    │   ├── User.js
    │   ├── Order.js
    │   └── Blog.js
    ├── controllers/
    │   ├── authController.js
    │   ├── carController.js
    │   ├── orderController.js
    │   ├── blogController.js
    │   └── userController.js
    ├── routes/
    │   ├── authRoutes.js
    │   ├── carRoutes.js
    │   ├── orderRoutes.js
    │   ├── blogRoutes.js
    │   └── userRoutes.js
    ├── middleware/
    │   └── auth.js                     ← JWT protect + adminOnly
    ├── createAdmin.js                  ← Run once to create admin account
    └── server.js                       ← Entry point
```

---

## 🚀 Setup — Step by Step

### 1. Install MongoDB
Download and start: https://www.mongodb.com/try/download/community

### 2. Setup Backend

```bash
cd backend
npm install

# Create your .env file
cp .env.example .env
```

Edit `.env`:
```
MONGO_URI=mongodb://localhost:27017/zoomcar
PORT=5000
JWT_SECRET=make_this_a_long_random_string_123456
CLIENT_URL=http://localhost:3000
```

```bash
# Create your admin account (run ONCE)
node createAdmin.js

# Start the backend
npm run dev
# → http://localhost:5000
```

### 3. Setup Frontend

```bash
cd frontend
npm install
npm run dev
# → http://localhost:3000
```

### 4. Login as Admin

Go to **http://localhost:3000/login** and use:
- Email: `admin@zoomcar.com`
- Password: `admin123`

You'll be redirected to `/admin` automatically.

---

## 🔌 All API Endpoints

### Auth
| Method | URL | Auth | Description |
|--------|-----|------|-------------|
| POST | /api/auth/register | No | Register |
| POST | /api/auth/login | No | Login → returns JWT token |
| GET | /api/auth/me | Yes | Get logged-in user |

### Cars
| Method | URL | Auth | Description |
|--------|-----|------|-------------|
| GET | /api/cars | No | List all (supports ?condition=New&brand=BMW&page=1) |
| GET | /api/cars/:id | No | Get one car |
| POST | /api/cars | Admin | Create car |
| PUT | /api/cars/:id | Admin | Update car |
| DELETE | /api/cars/:id | Admin | Delete car |

### Orders
| Method | URL | Auth | Description |
|--------|-----|------|-------------|
| POST | /api/orders | User | Place order |
| GET | /api/orders/myorders | User | My orders |
| GET | /api/orders | Admin | All orders (supports ?status=pending) |
| PUT | /api/orders/:id/status | Admin | Update order status |
| DELETE | /api/orders/:id | Admin | Delete order |

### Blogs
| Method | URL | Auth | Description |
|--------|-----|------|-------------|
| GET | /api/blogs | No | All posts |
| GET | /api/blogs/:id | No | Single post |
| POST | /api/blogs | Admin | Create post |
| PUT | /api/blogs/:id | Admin | Update post |
| DELETE | /api/blogs/:id | Admin | Delete post |

### Users
| Method | URL | Auth | Description |
|--------|-----|------|-------------|
| GET | /api/users | Admin | All users |
| PUT | /api/users/:id/role | Admin | Change role |
| DELETE | /api/users/:id | Admin | Delete user |

---

## ✨ Features

### Public Site
- 🏠 **Home** — Hero search, brand carousel, car grid, shop section
- 🚗 **Inventory** — Filter by condition/brand/price, sort, paginate
- 🔍 **Car Detail** — Full specs + Book Now / Add to Cart
- 🛒 **Cart** — Dropdown with remove + total
- 💳 **Checkout** — 2-step: personal details → payment (card or cash)
- 📦 **My Orders** — Order history with status badges
- 📝 **Blog** — List + full post view
- 📞 **Contact** — Contact form
- 🔐 **Auth** — Login + Register with JWT

### Admin Panel (`/admin`)
- 📊 **Dashboard** — Stats: total cars, orders, users, blogs + recent orders table
- 🚗 **Cars** — Add/Edit/Delete with full form modal + search + pagination
- 📦 **Orders** — View all orders, expand details, update status via dropdown
- ✍️ **Blog** — Write/Edit/Delete posts with rich text content
- 👥 **Users** — View all users, promote to admin / demote, delete

---

## 💡 Tips

- **Make someone admin:** Run `node createAdmin.js` or use Admin Panel → Users → click 🛡️
- **Add cars:** Go to `/admin/cars` → click "+ Add Car"
- **Write a blog post:** Go to `/admin/blogs` → click "+ New Post"
- **Car images:** Paste any image URL (Unsplash, Cloudinary, etc.) in the Image URL field
