#      StreamSync-Social Chat & Video Calling App 

## 🚀 Overview
A real-time social app built for seamless communication. Chat with friends, hop on 1-on-1 or group video calls (with screensharing & recording!), explore multiple UI themes, and even an inbuilt translator page.

##  Features
* **Real-time Messaging** with typing indicators, emoji reactions & live updates
* **1-on-1 Video Calls** with screen sharing and recording
* **32 Unique UI Themes** — because one style isn't enough
* **JWT Authentication & Protected Routes** for secure sessions
* **Scalable Tech** using React, Express, MongoDB, TailwindCSS & TanStack Query
* **Stream SDK & API** for robust messaging & calling

## 🖥️ Tech Stack
* **Frontend:** React + TailwindCSS + TanStack Query + Zustand (for global management of ui themes)
* **Backend:** Express + MongoDB + JWT
* **Messaging & Calls:** Stream API & SDK
* **Dev Tools:** Vite, ESLint, Prettier

## ⚙️ Environment Setup

### Backend (`/backend`)
Create a `.env` file with the following content:

```env
PORT=5001
MONGO_URI=your_mongo_connection_string
STREAM_API_KEY=your_stream_api_key
STREAM_API_SECRET=your_stream_api_secret
JWT_SECRET_KEY=your_random_jwt_secret
FRONTEND_URL=  your frontend hosted url
```

💡 **Tip:** Generate a secure JWT secret using:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Frontend (`/frontend`)
Create a `.env` file:

```env
VITE_STREAM_API_KEY=your_stream_api_key
VITE_REACT_APP_API_URL= backend hosting link
```

## 🛠️ Run Locally

### Start Backend
```bash
cd backend
npm install
npm run dev
```

### Start Frontend
```bash
cd frontend
npm install
npm run dev
```


Already configured for quick deployment — just add your environment variables in the dashboard.

## 🔍 Additional Pages

### 🗣️ Voice Translator
Also built a **real-time voice translator** for 15 languages using:
* **Web Speech API** for speech recognition & synthesis
* **MyMemory Translation API** for seamless translations

Try it out in the `/voice-translator` route.

## 🤝 Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you'd like to change.


## 💫 Acknowledgements
* Stream for real-time chat & calls
* TailwindCSS for UI styling
* TanStack Query for server state management
* Zustand for local state
* MyMemory API for translations
* MDN Web Docs — the ultimate resource

## 🚀 Happy Coding!