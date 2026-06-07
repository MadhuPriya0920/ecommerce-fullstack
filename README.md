ShopNow - Full Stack E-Commerce Application

A complete full-stack e-commerce web application built with the MERN stack (MongoDB, Express, React, Node.js).

Live Demo
Frontend: https://ecommerce-fullstack-mauve.vercel.app
Backend API: https://ecommerce-fullstack-hrqy.onrender.com

Features

Customer
- Browse 100+ products across 8 categories
- Search products by name, description, or category
- Filter products by category
- Add to cart (login required)
- Place orders
- View order history

Admin
- Add, edit, delete products
- View all orders
- Update order status (pending, processing, shipped, delivered, cancelled)

Tech Stack

Frontend
- React.js (Vite)
- React Router DOM
- Axios
- React Hot Toast

Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication
- bcryptjs

Deployment
- Frontend: Vercel
- Backend: Render
- Database: MongoDB Atlas

API Endpoints

Auth
- POST /api/auth/register - Register new user
- POST /api/auth/login - Login user

Products
- GET /api/products - Get all products
- GET /api/products/:id - Get single product
- POST /api/products - Create product (Admin only)
- PUT /api/products/:id - Update product (Admin only)
- DELETE /api/products/:id - Delete product (Admin only)

Orders
- POST /api/orders - Create order (Auth required)
- GET /api/orders/myorders - Get my orders (Auth required)
- GET /api/orders/:id - Get order by ID (Auth required)
- GET /api/orders - Get all orders (Admin only)
- PUT /api/orders/:id - Update order status (Admin only)

Run Locally

Backend
cd backend
npm install
npm run dev

Frontend
cd frontend
npm install
npm run dev

Environment Variables (backend/.env)
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
NODE_ENV=development

Test Accounts
Admin: naani@gmail.com / 123456
User: Register a new account on the site

License
MIT
