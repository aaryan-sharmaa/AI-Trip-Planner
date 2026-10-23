# AI Travel Planner

A full-stack travel-planning web application for exploring popular destinations across India and generating personalised, day-by-day itineraries with AI.

<p align="center">
  <img src="docs/screenshots/homepage.png" alt="AI Travel Planner homepage showing destination search, AI planning and popular destinations" width="900" />
</p>

<p align="center">
  <a href="https://trip-planner-ai-fawn-nine.vercel.app/">Live Website</a> ·
  <a href="https://trip-planner-ai-2e2b.onrender.com/">Backend API</a>
</p>

> **Project note:** This repository is an adaptation/learning copy of the AI Travel Planner project originally published by [thisisnishank](https://github.com/thisisnishank/trip-planner-ai). Preserve appropriate attribution and confirm that the original repository's licence/permissions allow redistribution before publishing a copy. Do not represent inherited code as your own original work.

## Overview

AI Travel Planner brings destination information, current weather and AI-assisted itinerary generation into one web application. Users can explore destinations, view attraction information, create an account, and request a trip plan using details such as destination, number of days, group size and budget.

## Features

- **Destination discovery:** browse 15 curated destinations across India.
- **Destination details:** view descriptions, attractions, suggested hotels, travel information, coordinates and the best time to visit.
- **AI itinerary generation:** generate a day-by-day plan using destination data and the trip details supplied by the user.
- **Weather integration:** retrieve current weather from Open-Meteo; the backend keeps an in-memory cache to reduce repeated requests.
- **Account authentication:** signup/login with bcrypt password hashing and JWT-based authentication.
- **Protected API routes:** middleware checks JWTs for authenticated operations such as itinerary generation.
- **Attraction guides:** show attraction information and support dynamically retrieved images.
- **Responsive interface and themes:** travel-focused interface with light/dark theme support.

> Availability of AI, weather and database features depends on valid environment variables, third-party service availability and deployment status.

## Screenshots

### Destination discovery

The homepage presents destination search, an AI planning entry point, theme switching and popular destinations.

### Application architecture

The diagram below is a high-level reference. Use the source code as the authority if a diagram detail differs from the implementation.

<p align="center">
  <img src="docs/architecture.png" alt="High-level AI Travel Planner architecture diagram" width="900" />
</p>

## Technology stack

| Layer | Technologies |
|---|---|
| Frontend | React, Vite, React Router, Tailwind CSS, Axios |
| Backend | Node.js, Express |
| Database | MongoDB with Mongoose |
| Authentication | JSON Web Tokens (JWT), bcryptjs |
| AI itinerary generation | Google Gemini via `@google/genai` |
| Weather | Open-Meteo Forecast API |
| Deployment configuration | Vercel (frontend), Render (backend) |

## How it works

1. The React application presents destination, authentication and itinerary-planning screens.
2. Frontend requests are sent to the Express REST API through a shared Axios client.
3. The backend reads destination information from MongoDB using Mongoose.
4. For itinerary generation, the backend obtains weather information and combines it with destination data, duration, group size and budget.
5. The backend sends the prepared prompt to the configured Gemini model and returns the generated itinerary to the frontend.
6. Protected endpoints validate the user's JWT before processing the request.

## Repository structure

```text
Trip-Planner-Ai-main/
├── backend/
│   ├── config/          # Database connection
│   ├── controllers/     # API request handlers
│   ├── data/            # Detailed attraction information
│   ├── middleware/      # JWT authentication middleware
│   ├── models/          # Mongoose models
│   ├── routes/          # Express API routes
│   ├── utils/           # AI and weather services/helpers
│   ├── seeder.js        # Destination seed data
│   └── server.js        # Express server entry point
├── frontend/
│   ├── public/           # Static images and icons
│   └── src/
│       ├── api/          # Axios API client
│       ├── assets/       # Frontend assets
│       ├── components/   # Shared UI components
│       ├── hooks/        # Custom React hooks
│       ├── pages/        # Page-level components
│       ├── utils/        # Image and destination utilities
│       ├── App.jsx
│       └── main.jsx
└── README.md
```

## Run locally

### Prerequisites

- Node.js and npm
- A MongoDB database (local MongoDB or MongoDB Atlas)
- A Google Gemini API key
- Internet access for the Open-Meteo weather service

### 1. Configure the backend

Open a terminal in the project root, then run:

```bash
cd backend
npm install
```

Create `backend/.env`:

```dotenv
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=replace_with_a_long_random_secret
GEMINI_API_KEY=your_gemini_api_key
```

Start the backend:

```bash
npm run dev
```

The API defaults to `http://localhost:5000`.

### 2. Configure the frontend

Open a second terminal in the project root:

```bash
cd frontend
npm install
```

Create `frontend/.env`:

```dotenv
VITE_API_URL=http://localhost:5000/api
```

Start the frontend development server:

```bash
npm run dev
```

Vite prints the local frontend URL in the terminal (commonly `http://localhost:5173`).

### 3. Seed destination data (optional)

The backend includes `seeder.js` for populating destination records. **Review this script before running it:** it deletes existing destination documents before inserting the seed data. Run it only against a disposable development database or after making a backup.

From the `backend/` directory, after configuring `MONGO_URI`:

```bash
node seeder.js
```

## Environment variables

| Variable | Used by | Purpose |
|---|---|---|
| `PORT` | Backend | Port for the Express server (defaults to `5000`) |
| `MONGO_URI` | Backend | MongoDB connection string |
| `JWT_SECRET` | Backend | Secret used to sign and verify JWTs; use a strong, private value |
| `GEMINI_API_KEY` | Backend | Credential for Gemini API calls |
| `VITE_API_URL` | Frontend | Base URL for the backend API, including `/api` |

Never commit `.env` files, API keys, database connection strings, JWT secrets or other credentials. Keep private values in deployment environment settings.

## API overview

The backend mounts these route groups:

| Base path | Purpose |
|---|---|
| `/api/auth` | Signup, login and authenticated profile endpoint |
| `/api/destinations` | List destinations, fetch destination details and weather |
| `/api/itinerary` | Generate an itinerary (JWT-protected) |
| `/api/attractions` | Retrieve detailed information for an attraction |

Consult the route files under `backend/routes/` for the exact endpoint paths, methods and request payloads.

## Development checks

Frontend scripts currently include:

```bash
cd frontend
npm run lint
npm run build
```

The backend package currently provides a development script; its configured `test` script is a placeholder rather than an automated test suite. Do not interpret a placeholder test command as evidence that backend tests pass.

## Known limitations and future improvements

Potential next steps include:

- Add automated backend tests and request validation.
- Restrict production CORS to approved frontend origins.
- Improve validation and sanitisation of user-supplied inputs.
- Add persisted trip history and editable/saved itineraries if these features are required.
- Add graceful handling and observability for database, weather and AI service failures.
- Expand destinations and verify curated travel, hotel and attraction information.
- Add a documented deployment checklist and CI workflow.

These are possible improvements, not claims that the features are already implemented.

## Attribution and licence

This copy is based on the [original AI Travel Planner repository by thisisnishank](https://github.com/thisisnishank/trip-planner-ai). Check the original repository's licence and obtain any required permission before redistributing or publishing modified source code. No licence for this adapted copy is asserted here.

## Disclaimer

AI-generated itineraries and curated destination information may contain errors or become outdated. Confirm opening hours, local conditions, transportation, accommodation details and travel restrictions with reliable sources before making travel decisions.
