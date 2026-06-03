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

