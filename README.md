# WanderGuide — Backend API

REST API for the WanderGuide smart travel guide platform. Built with Node.js, Express and MongoDB Atlas.

## Tech Stack

- **Runtime:** Node.js v25
- **Framework:** Express.js v5
- **Database:** MongoDB Atlas (Mongoose ODM)
- **Authentication:** JWT + bcryptjs
- **Deployment:** Render

## Features

- JWT-based authentication with role-based access control (admin / user)
- Destination CRUD with geospatial indexing (GeoJSON + MongoDB `$near`)
- Full-text search across destination name, description and tags
- Reviews system with one-review-per-user enforcement
- Wishlist management per user
- Admin-protected routes for content management
- CORS configured for frontend integration

## Project Structure

backend/
├── server.js
├── config/
│   └── db.js
├── models/
│   ├── User.js
│   ├── Destination.js
│   ├── Review.js
│   └── Wishlist.js
├── controllers/
│   ├── authController.js
│   ├── destinationController.js
│   └── reviewController.js
├── routes/
│   ├── authRoutes.js
│   ├── destinationRoutes.js
│   ├── reviewRoutes.js
│   └── userRoutes.js
└── middleware/
└── authMiddleware.js

## API Endpoints

### Auth
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/api/auth/register` | Public | Register new user |
| POST | `/api/auth/login` | Public | Login and get token |
| GET | `/api/auth/profile` | Protected | Get logged in user profile |

### Destinations
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/api/destinations` | Public | Get all destinations with optional search, category, season filters |
| GET | `/api/destinations/:id` | Public | Get single destination |
| GET | `/api/destinations/nearby` | Public | Get destinations near coordinates |
| POST | `/api/destinations` | Admin | Create destination |
| PUT | `/api/destinations/:id` | Admin | Update destination |
| DELETE | `/api/destinations/:id` | Admin | Delete destination |

### Reviews
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/api/reviews/:destinationId` | Public | Get reviews for a destination |
| POST | `/api/reviews/:destinationId` | Protected | Add review |
| DELETE | `/api/reviews/:id` | Protected | Delete own review |

### Wishlist
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/api/wishlist` | Protected | Get user wishlist |
| POST | `/api/wishlist` | Protected | Add destination to wishlist |
| DELETE | `/api/wishlist/:destinationId` | Protected | Remove from wishlist |

### Users
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/api/users` | Admin | Get all users |
| DELETE | `/api/users/:id` | Admin | Delete user |

## Getting Started

### Prerequisites
- Node.js v18+
- MongoDB Atlas account

### Installation

```bash
git clone https://github.com/AyushJha33/wanderguide-backend
cd wanderguide-backend
npm install
```

### Environment Variables

Create a `.env` file in the root:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

### Run Locally

```bash
npm run dev
```

Server runs on `http://localhost:5000`

## Live API

https://wanderguide-backend-ovlr.onrender.com

## Author

**Ayush Jha**
