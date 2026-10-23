# AI Trip Planner

A full-stack AI-powered trip-planning application developed as part of an internship/training project, focused on building practical skills in full-stack development, REST APIs, database integration, authentication, and generative AI.

## Overview

AI Trip Planner is a travel-planning web application that helps users explore popular destinations across India and generate personalised, day-by-day itineraries based on their travel preferences.

The project brings together a React frontend, a Node.js and Express backend, MongoDB database integration, JWT-based authentication, Google Gemini API integration for AI-assisted itinerary generation, and Open-Meteo for weather information.

Developing this project provided practical exposure to full-stack application architecture, frontend-backend communication, third-party API integration, environment configuration, and deployment workflows.

## Key Features

- **Destination Discovery:** Browse curated destinations across India.
- **Destination Details:** Explore attraction information, travel details, suggested hotels, and the best time to visit.
- **AI-Powered Itinerary Generation:** Generate personalised travel plans based on destination, trip duration, group size, and budget.
- **Weather Integration:** Retrieve weather information using the Open-Meteo API.
- **Authentication:** Implement user signup and login with bcrypt password hashing and JWT-based authentication.
- **Protected API Routes:** Secure selected backend endpoints using authentication middleware.
- **Attraction Guides:** Display attraction information and dynamically retrieved images.
- **Responsive Interface:** Support desktop and mobile layouts.
- **Light and Dark Themes:** Provide theme switching for a personalised interface.

## Learning Outcomes

This project provides practical experience with:

- Building full-stack applications using React, Node.js, and Express.
- Designing REST APIs and connecting frontend components to backend services.
- Integrating MongoDB using Mongoose.
- Implementing authentication using JWT and bcrypt.
- Integrating generative AI through the Google Gemini API.
- Fetching external weather data and implementing in-memory caching.
- Managing environment variables and application configuration.
- Preparing frontend and backend applications for deployment.

## Screenshots

### Destination Discovery

The homepage provides destination search, AI trip planning, theme switching, and curated destinations across India.

<!-- Add a screenshot of the homepage here -->
<!-- Example: ![AI Trip Planner homepage](docs/screenshots/homepage.png) -->

### AI Itinerary Planning

Users can provide their trip preferences to generate a personalised itinerary.

<!-- Add a screenshot of the itinerary planner here -->
<!-- Example: ![AI itinerary planner](docs/screenshots/itinerary-planner.png) -->

## Technology Stack

| Layer | Technologies |
|---|---|
| Frontend | React, Vite, React Router, Tailwind CSS, Axios |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| Authentication | JSON Web Tokens (JWT), bcryptjs |
| AI Integration | Google Gemini API via `@google/genai` |
| Weather Integration | Open-Meteo Forecast API |
| Frontend Deployment | Vercel |
| Backend Deployment | Render |

## Application Architecture

The application follows a client-server architecture.

1. **Frontend:** The React application provides destination discovery, authentication, attraction details, and itinerary-planning interfaces.
2. **API Communication:** A shared Axios client sends requests from the frontend to the Express REST API.
3. **Backend:** Express routes and controllers process requests and coordinate application logic.
4. **Database:** MongoDB stores application data, accessed through Mongoose models.
5. **Weather Service:** The backend retrieves weather information from Open-Meteo and caches responses in memory.
6. **AI Service:** The backend prepares an itinerary prompt using destination information and the user's trip preferences, then sends it to the configured Gemini model.
7. **Authentication:** JWT middleware protects authenticated endpoints and verifies user tokens before processing requests.

## Repository Structure

```text
AI-Trip-Planner/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── attractionController.js
│   │   ├── authController.js
│   │   ├── destinationController.js
│   │   ├── itineraryController.js
│   │   └── weatherController.js
│   ├── data/
│   │   └── attractionInfo.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── models/
│   │   ├── Destination.js
│   │   └── User.js
│   ├── routes/
│   │   ├── attractionRoutes.js
│   │   ├── authRoutes.js
│   │   ├── destinationRoutes.js
│   │   └── itineraryRoutes.js
│   ├── utils/
│   │   ├── aiService.js
│   │   ├── weatherCodes.js
│   │   └── weatherService.js
│   ├── seeder.js
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── public/
│   │   ├── images/
│   │   ├── favicon.svg
│   │   └── icons.svg
│   ├── src/
│   │   ├── api/
│   │   │   └── axios.js
│   │   ├── assets/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
└── README.md
```

## Getting Started

Follow these instructions to set up and run the application locally.

### Prerequisites

- [Node.js](https://nodejs.org/) and npm
- A MongoDB database, either local or through [MongoDB Atlas](https://www.mongodb.com/atlas)
- A Google Gemini API key
- Internet access for the Open-Meteo weather service

### 1. Clone the Repository

```bash
git clone https://github.com/aaryan-sharmaa/AI-Trip-Planner.git
cd AI-Trip-Planner
```

### 2. Configure and Start the Backend

Navigate to the backend directory and install dependencies:

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend/` directory:

```dotenv
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_long_random_secret
GEMINI_API_KEY=your_gemini_api_key
```

Replace the placeholder values with your own credentials.

Start the backend development server:

```bash
npm run dev
```

The backend runs on `http://localhost:5000` by default, provided that the configured services are available.

### 3. Configure and Start the Frontend

Open a second terminal at the project root and navigate to the frontend directory:

```bash
cd frontend
npm install
```

Create a `.env` file inside the `frontend/` directory:

```dotenv
VITE_API_URL=http://localhost:5000/api
```

Start the frontend development server:

```bash
npm run dev
```

Vite will display the local frontend URL in the terminal, commonly `http://localhost:5173`.

### 4. Seed Destination Data (Optional)

The backend includes a `seeder.js` script to populate destination records.

Before running it, review the script: it deletes existing destination documents before inserting the seed data. Use it only with a disposable development database or after backing up any data you need to preserve.

From the `backend/` directory, with `MONGO_URI` configured, run:

```bash
node seeder.js
```

## Environment Variables

| Variable | Location | Description |
|---|---|---|
| `PORT` | `backend/.env` | Port on which the Express server listens; defaults to `5000`. |
| `MONGO_URI` | `backend/.env` | MongoDB connection string. |
| `JWT_SECRET` | `backend/.env` | Secret used to sign and verify JSON Web Tokens. |
| `GEMINI_API_KEY` | `backend/.env` | API key used for Google Gemini requests. |
| `VITE_API_URL` | `frontend/.env` | Base URL of the backend API, including `/api`. |

**Security note:** Never commit `.env` files, API keys, database connection strings, JWT secrets, or other credentials to GitHub. Keep sensitive values in environment variables and deployment settings.

## API Overview

The backend exposes the following route groups:

| Base Path | Purpose |
|---|---|
| `/api/auth` | User signup, login, and profile-related operations. |
| `/api/destinations` | Destination discovery, destination details, and related weather functionality. |
| `/api/itinerary` | AI-assisted itinerary generation. |
| `/api/attractions` | Attraction information and related operations. |

Some endpoints require authentication. Refer to the route files under `backend/routes/` for the exact endpoint paths, HTTP methods, request bodies, and authentication requirements.

## Development Checks

### Frontend Linting

```bash
cd frontend
npm run lint
```

### Frontend Production Build

```bash
npm run build
```

These commands help check frontend code quality and verify that the application can be built for production.

The backend package currently provides a development script. Its test script is a placeholder rather than a complete automated test suite.

## Deployment

The project includes configuration for deploying the frontend to Vercel and the backend to Render.

### Frontend — Vercel

1. Import the GitHub repository into Vercel.
2. Configure the frontend project with `frontend/` as its root directory.
3. Install dependencies using `npm install`.
4. Use `npm run build` as the build command.
5. Set the output directory to `dist`.
6. Configure `VITE_API_URL` to point to the deployed backend API, including the `/api` suffix.

### Backend — Render

1. Create a web service connected to the GitHub repository.
2. Configure `backend/` as the service's root directory.
3. Install dependencies using `npm install`.
4. Configure the appropriate start command based on the backend's `package.json`.
5. Add `MONGO_URI`, `JWT_SECRET`, `GEMINI_API_KEY`, and any required environment variables in the service settings.
6. Ensure that the backend's CORS configuration permits requests from the deployed frontend origin.

Deployment settings may need adjustment depending on the hosting configuration and the current state of the project.

## Known Limitations and Future Improvements

Potential improvements include:

- Add automated backend tests and request validation.
- Improve validation and sanitisation of user-supplied inputs.
- Restrict production CORS access to approved frontend origins.
- Add persistent trip history and the ability to save or edit itineraries.
- Improve error handling and monitoring for database, weather, and AI service failures.
- Expand destination coverage and regularly verify travel, hotel, and attraction information.
- Add a documented deployment checklist and continuous integration workflow.

These are possible future enhancements, not claims that the features are currently implemented.

## Disclaimer

AI-generated itineraries and curated destination information may contain errors or become outdated. Verify opening hours, transportation options, accommodation details, local conditions, and travel restrictions using reliable sources before making travel decisions.
