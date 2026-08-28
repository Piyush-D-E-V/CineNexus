# 🎬 CineNexus

> A modern movie discovery and watchlist platform built with React, powered by the TMDB API, with authentication and persistent user data.

[Live Demo](https://thecinenexus.vercel.app/) · [GitHub Repository](#)

---

## 📌 Overview

**CineNexus** is a full-stack movie discovery platform designed to provide a modern OTT-style browsing experience.

Users can explore movies, search for titles, view detailed movie information, manage a personal watchlist, and quickly find where a movie is available to watch or book.

The project focuses on building a responsive, production-style frontend while integrating external APIs, authentication, and persistent user data.

---

## ✨ Features

* 🔎 **Movie Search** — Search movies using the TMDB API
* 🎞️ **Movie Discovery** — Browse popular and trending movies
* 📄 **Movie Details** — View ratings, genres, release dates, overview, and additional information
* ❤️ **Personal Watchlist** — Save movies for later
* 🔐 **User Authentication** — Secure authentication for personalized features
* ☁️ **Persistent Data** — User watchlists are stored in a database
* 🎬 **OTT Integration** — Quickly find streaming options
* 🎟️ **Booking Integration** — Direct access to movie booking platforms
* 📱 **Responsive UI** — Optimized for desktop, tablet, and mobile devices
* ⚡ **Fast User Experience** — Client-side interactions with optimized API usage

---

## 🛠️ Tech Stack

### Frontend

* React.js
* JavaScript / TypeScript
* CSS / Tailwind CSS

### Backend & Services

* Supabase
* Supabase Authentication
* Supabase Database

### APIs

* TMDB API

### Deployment

* Vercel

---

## 🏗️ Architecture

```text
User
 │
 ▼
React Application
 │
 ├── TMDB API
 │     ├── Movies
 │     ├── Search
 │     └── Movie Details
 │
 └── Supabase
       ├── Authentication
       └── Watchlist Database
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have installed:

* Node.js
* npm / pnpm / yarn
* A TMDB API key
* A Supabase project

### Installation

Clone the repository:

```bash
git clone https://github.com/your-username/cinenexus.git

cd cinenexus
```

Install dependencies:

```bash
npm install
```

or:

```bash
pnpm install
```

### Environment Variables

Create a `.env.local` file:

```env
VITE_TMDB_API_KEY=your_tmdb_api_key

VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Add your actual credentials to the environment variables.

### Run Locally

```bash
npm run dev
```

The application will be available at:

```text
http://localhost:5173
```

---

## 📸 Screenshots

Add screenshots of the application here.

```text
screenshots/
├── home.png
├── movie-details.png
├── search.png
└── watchlist.png
```

---

## 🧠 What I Learned

Through CineNexus, I worked with:

* Third-party REST APIs
* Authentication flows
* Database integration
* Asynchronous JavaScript
* React component architecture
* State management
* API error handling
* Responsive UI development
* Environment variable management
* Production deployment

---

## 🔮 Future Improvements

* [ ] Personalized movie recommendations
* [ ] Advanced filtering and sorting
* [ ] Movie trailers
* [ ] User ratings and reviews
* [ ] Infinite scrolling
* [ ] Improved caching
* [ ] PWA support

---

## 📸 Screenshots

### Home

![Home](https://github.com/Piyush-D-E-V/CineNexus/blob/3a5e1d96d26f0df9dd55e35e772dc28324e4d2a5/screenshots/CineNexus.png)

### Watchlist

![Watchlist](https://github.com/Piyush-D-E-V/CineNexus/blob/3a5e1d96d26f0df9dd55e35e772dc28324e4d2a5/screenshots/CineNexus%20-%20Brave%2002-08-2026%2017_29_19.png)

### Movie details

![Movie details](https://github.com/Piyush-D-E-V/CineNexus/blob/3a5e1d96d26f0df9dd55e35e772dc28324e4d2a5/screenshots/CineNexus%20-%20Brave%2002-08-2026%2017_29_56.png)
![Movie details](https://github.com/Piyush-D-E-V/CineNexus/blob/3a5e1d96d26f0df9dd55e35e772dc28324e4d2a5/screenshots/CineNexus%20-%20Brave%2002-08-2026%2017_30_10.png)

## 👨‍💻 Author

**Piyush**

Frontend Engineer focused on building modern, scalable web applications.

* GitHub: [@Piyush-D-E-V](https://github.com/Piyush-D-E-V)
* LinkedIn: [Piyush Mina](https://www.linkedin.com/in/piyush-mina/)
* Portfolio: [Under Development](#)

---

## 📄 License

This project is available for educational and portfolio purposes.
