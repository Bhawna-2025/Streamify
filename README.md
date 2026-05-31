# Streamify 🌐🗣️

Streamify is a modern, full-stack **Language Exchange and Social Networking platform** designed to connect language learners worldwide. Users can sign up, complete an interactive onboarding process to define their native and target languages, receive tailored recommendations for potential language partners, manage friend requests, and communicate in real-time.

---

## 🚀 Key Features

- **User Authentication**: Secure Sign-Up, Log-In, and Log-Out flows powered by **JSON Web Tokens (JWT)** stored in secure, HttpOnly cookies, and **bcryptjs** password hashing.
- **Interactive Onboarding**: Personalized onboarding flow where users can:
  - Add a Bio and Location.
  - Set their **Native Language** and **Target/Learning Language**.
  - Generate a random avatar dynamically using the **DiceBear API** or view a default camera preview.
- **Smart Recommendations**: An algorithmic recommendation feed that displays compatible language partners (matching users who speak what you want to learn, and vice versa) while excluding yourself and existing friends.
- **Social System (Friend Requests)**:
  - Send friend requests to recommended users.
  - Manage incoming friend requests (Accept/Reject).
  - Track outgoing/pending friend requests.
  - Populate and view your friends list.
- **Real-Time Communication**: Integrated with **GetStream.io Chat SDK** for secure, low-latency messaging, video, and audio calling.
- **Modern Responsive UI**: Built with **Tailwind CSS** and **DaisyUI**, featuring rich aesthetics, smooth micro-animations, and themed layouts (such as the themed Coffee/Forest configurations).

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **State Management & Querying**: [TanStack React Query v5](https://tanstack.com/query/latest) (for performant, cached server state management)
- **Routing**: [React Router v7](https://reactrouter.com/)
- **Styling**: [Tailwind CSS v3](https://tailwindcss.com/) & [DaisyUI v4](https://daisyui.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Notifications**: [React Hot Toast](https://react-hot-toast.com/)
- **HTTP Client**: [Axios](https://axios-http.com/)

### Backend
- **Runtime Environment**: [Node.js](https://nodejs.org/)
- **Web Framework**: [Express.js](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) via [Mongoose ODM](https://mongoosejs.com/)
- **Real-time Chat Service**: [GetStream.io Chat Node SDK](https://getstream.io/chat/docs/node/)
- **Authentication**: JWT (`jsonwebtoken`) & Cookies (`cookie-parser`)
- **Development Tooling**: Nodemon

---

## 📂 Project Directory Structure

```text
Streamify/
├── backend/
│   ├── src/
│   │   ├── contollers/       # Request handlers (auth, user, chat)
│   │   ├── lib/              # DB connection and Stream SDK client initialization
│   │   ├── middleware/       # Route protection & auth middleware
│   │   ├── models/           # Mongoose schemas (User, FriendRequest)
│   │   ├── routes/           # API endpoints (Auth, User, Chat)
│   │   └── server.js         # Express app entry point
│   ├── .env                  # Environment configurations (ignored in git)
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/       # Reusable UI components (page loader, etc.)
│   │   ├── constants/        # Theme definitions, languages, flag mappings
│   │   ├── hooks/            # Custom hooks (e.g. useAuthUser)
│   │   ├── lib/              # Axios instance configuration and API request declarations
│   │   ├── pages/            # View pages (Home, Chat, Call, Login, SignUp, Onboarding)
│   │   ├── App.jsx           # App router configuration
│   │   ├── main.jsx          # React app entry point
│   │   └── index.css         # Main stylesheet with Tailwind directives
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── package.json
└── README.md                 # This file
```

---

## ⚙️ Installation & Local Setup

### Prerequisites
- [Node.js](https://nodejs.org/) installed (v18+ recommended)
- [MongoDB](https://www.mongodb.com/) instance (local or Atlas cluster)
- [GetStream.io](https://getstream.io/) developer account (for Chat API Key and Secret)

### Step 1: Clone the Repository
```bash
git clone https://github.com/<your-username>/Streamify.git
cd Streamify
```

### Step 2: Configure Backend Environment Variables
Create a `.env` file inside the `backend/` directory:
```env
PORT=4000
MONGO_URI=your_mongodb_connection_string
STEAM_API_KEY=your_getstream_api_key
STEAM_API_SECRET=your_getstream_api_secret
JWT_SECRET_KEY=your_jwt_secret_key
```

### Step 3: Install Dependencies & Run Backend
```bash
cd backend
npm install
npm run dev
```
The server will start running on `http://localhost:4000`.

### Step 4: Install Dependencies & Run Frontend
Open a new terminal window or tab:
```bash
cd frontend
npm install
npm run dev
```
The Vite development server will start running on `http://localhost:5173`.

---

## 📡 API Endpoints Summary

### Authentication Routes (`/api/auth`)
* `POST /signUp` - Create a new user account.
* `POST /login` - Log in to an existing account.
* `POST /logout` - Clear JWT authentication cookie.
* `POST /onboarding` - Save onboarding details (profile pic, bio, languages, location).
* `GET /me` - Get current authenticated user details.

### User & Relationship Routes (`/api/user`)
* `GET /` - Retrieve recommended users based on language compatibility.
* `GET /getFriend` - Get all current friends.
* `POST /friend-request/:id` - Send a friend request to a user.
* `PUT /friend-request-accept/:id/accept` - Accept a pending friend request.
* `GET /friend-request` - Get all incoming pending friend requests.
* `GET /outGoing-friend-request` - Get sent friend requests.

### Chat Routes (`/api/chat`)
* `GET /chat` - Generate a secure token for client-side GetStream Chat connection.

---

## 📄 License
This project is licensed under the [ISC License](LICENSE). Feel free to customize and expand it!
