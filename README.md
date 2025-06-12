# MERN Auth Demo

🔐 A full-stack authentication demo using the MERN stack (MongoDB, Express.js, React.js, Node.js) with JWT, bcrypt, protected routes, and a user dashboard.

---

## Features
- User registration and login
- Password hashing with bcrypt
- JWT-based authentication
- Protected dashboard route
- React context for auth state
- Modern, responsive UI

## Tech Stack
- **Frontend:** React.js (with Context API, React Router)
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose ODM)
- **Authentication:** JWT, bcrypt

## Project Structure
```
Mern-Auth-Demo/
├── client/      # React frontend
│   └── src/
│       ├── components/
│       ├── context/
│       ├── pages/
│       └── ...
├── server/      # Express backend
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   └── routes/
└── README.md
```

## Getting Started

### Prerequisites
- Node.js (v14+)
- npm or yarn
- MongoDB (local or Atlas)

### 1. Clone the repository
```bash
git clone https://github.com/JadenPerpignan/Mern-Auth-Demo.git
cd Mern-Auth-Demo
```

### 2. Install dependencies
```bash
# Backend
cd server
npm install
# Frontend
cd ../client
npm install
```

### 3. Environment Variables
Create a `.env` file in the `server/` directory:
```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

### 4. Run the app
```bash
# Start backend (from /server)
npm run dev
# Start frontend (from /client)
npm start
```

The React app runs on [http://localhost:3000](http://localhost:3000) and the API on [http://localhost:5000](http://localhost:5000).

## API Endpoints
- `POST /api/auth/register` — Register a new user
- `POST /api/auth/login` — Login and receive JWT
- `GET /api/auth/me` — Get current user (protected)

## Screenshots
_Add screenshots here if you want to show off the UI!_

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
[MIT](LICENSE)
