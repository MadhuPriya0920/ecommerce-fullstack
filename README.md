# ShopNow — Full Stack E-Commerce Application

A production-ready, full stack E-Commerce web application built with React, Node.js, Express, and MongoDB. Designed for real-world use with JWT authentication, role-based access control, product management, and a clean modern UI.

---

## Live Demo

- https://ecommerce-fullstack-mauve.vercel.app

---

## Features

- User Registration and Login with JWT Authentication
- Role-based Access Control — Admin and Customer roles
- Protected Routes — only logged-in users can add to cart and place orders
- Browse 100+ products across 8 categories
- Search products by name, description, or category
- Filter products by category
- Add to Cart with quantity controls
- Place Orders with shipping details
- View personal Order History
- Admin Dashboard — Add, Edit, Delete products
- Admin Order Management — Update order status
- Per-user Cart — each user has their own separate cart
- Toast notifications for all actions
- Fully Responsive Design — works on mobile and desktop

---

## Tech Stack

### Frontend
- React (Vite)
- React Router DOM
- Axios
- React Hot Toast

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JSON Web Token (JWT)
- bcryptjs
- CORS
- Cookie Parser

### Database
- MongoDB Atlas (Cloud)

### Deployment
- Frontend — Vercel
- Backend — Render
- Database — MongoDB Atlas

### Version Control
- Git and GitHub

---

## Project Structure

ecommerce-fullstack/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js
│   │   ├── controllers/
│   │   │   ├── authController.js
│   │   │   ├── productController.js
│   │   │   └── orderController.js
│   │   ├── middleware/
│   │   │   └── authMiddleware.js
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   ├── Product.js
│   │   │   └── Order.js
│   │   ├── routes/
│   │   │   ├── authRoutes.js
│   │   │   ├── productRoutes.js
│   │   │   └── orderRoutes.js
│   │   ├── seed.js
│   │   └── server.js
│   └── package.json
└── frontend/
    └── src/
        ├── components/
        │   └── Navbar.jsx
        ├── context/
        │   └── AuthContext.jsx
        ├── pages/
        │   ├── HomePage.jsx
        │   ├── LoginPage.jsx
        │   ├── RegisterPage.jsx
        │   ├── CartPage.jsx
        │   ├── OrdersPage.jsx
        │   └── AdminPage.jsx
        ├── utils/
        │   └── api.js
        ├── App.jsx
        └── main.jsx

---

## API Endpoints

### Auth Routes
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/register | Register a new user |
| POST | /api/auth/login | Login and get token |

### Product Routes
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/products | Get all products |
| GET | /api/products/:id | Get single product |
| POST | /api/products | Create product (Admin only) |
| PUT | /api/products/:id | Update product (Admin only) |
| DELETE | /api/products/:id | Delete product (Admin only) |

### Order Routes
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/orders | Create order (Auth required) |
| GET | /api/orders/myorders | Get my orders (Auth required) |
| GET | /api/orders/:id | Get order by ID (Auth required) |
| GET | /api/orders | Get all orders (Admin only) |
| PUT | /api/orders/:id | Update order status (Admin only) |

---

## Getting Started Locally

### Prerequisites
- Node.js
- MongoDB Atlas account
- Git

### Clone the Repository

git clone https://github.com/MadhuPriya0920/ecommerce-fullstack.git
cd ecommerce-fullstack

### Backend Setup

cd backend
npm install

Create a .env file inside the backend folder:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
NODE_ENV=development

Start the backend:

npm run dev

### Frontend Setup

cd frontend
npm install
npm run dev

Open http://localhost:5173 in your browser.

---

## Environment Variables

| Variable | Description |
|----------|-------------|
| PORT | Server port (default 5000) |
| MONGO_URI | MongoDB connection string |
| JWT_SECRET | Secret key for JWT tokens |
| NODE_ENV | development or production |

---

## Deployment

| Service | Platform | URL |
|---------|----------|-----|
| Frontend | Vercel | https://ecommerce-fullstack-mauve.vercel.app |
| Backend | Render | https://ecommerce-fullstack-hrqy.onrender.com |
| Database | MongoDB Atlas | Cloud hosted |

---

## Test Accounts

- Admin: naani@gmail.com / 123456
- User: Register a new account on the site

---

## Author

Madhu Priya K B
- GitHub: https://github.com/MadhuPriya0920

---

## License

This project is open source and available under the MIT License.
