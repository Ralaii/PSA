# PSA

A web-based admin application with a dashboard, notifications/inbox, employee, attendance, recruitment, schedule and settings pages.

## Disclaimer

This project is made for PSA. It is still a work in progress, so some features and the production setup are not finished yet.

## Technologies Used

**Frontend:** React (Vite), Tailwind CSS, React Router, TanStack Query, Axios, Sonner

**Backend (`server/`):** Java, Spring Boot, Spring Security, Spring Data JPA, PostgreSQL, Redis

**Tools:** MSW (mock API), Node.js v26.13.0 or newer, Java 25 or newer

## Project Structure

```
.
├── src/        # React app (frontend)
├── public/
├── server/     # Spring Boot app (backend)
└── .env        # frontend environment variables (not committed)
```

## How to Run

### 1. Clone the repository

```bash
git clone <repository-url>
cd <project-folder>
```

### 2. Run the frontend

```bash
npm install
npm run dev
```

The app opens at `http://localhost:5173`.

Create a `.env` file in the project root:

```dotenv
VITE_API_URL="http://localhost:8080"
VITE_USE_MOCKS=true
```

- `VITE_API_URL` - Base URL of the backend API
- `VITE_USE_MOCKS` - `true` uses a fake in-memory API (MSW), so the frontend runs without the backend. Set it to `false` to use the real backend.

Restart the dev server after changing `.env`.

### 3. Run the backend (optional if using mocks)

Make sure PostgreSQL and Redis are running.

Create `server/src/main/resources/application-local.properties` with your own values:

```properties
DB_URL=jdbc:postgresql://localhost:5432/psa
DB_USERNAME=your_db_username
DB_PASSWORD=your_db_password

CACHE_TYPE=redis
CACHE_HOST=localhost
CACHE_PORT=6379

JWT_SECRET=your_long_random_secret
ORIGINS=http://localhost:5173

app.cookie.secure=true
```

- `DB_URL`, `DB_USERNAME`, `DB_PASSWORD` - your PostgreSQL connection
- `CACHE_TYPE`, `CACHE_HOST`, `CACHE_PORT` - your Redis connection
- `JWT_SECRET` - secret used to sign JWTs
- `ORIGINS` - allowed CORS origins (the frontend URL)
- `app.cookie.secure` - `true` means cookies are only sent over HTTPS. If login works but later requests fail when testing over plain HTTP, set it to `false` locally.

This file contains secrets, so **do not commit it**. Make sure it's in `.gitignore`.

Then start the server from the `server/` folder:

```bash
cd server
./mvnw spring-boot:run
```

The API runs at `http://localhost:8080`. The `local` profile is active by default, so the file is picked up automatically.

## Developing Without a Backend

Keep `VITE_USE_MOCKS=true` in your `.env`, then add a new file for your mock data in `src/mocks/data`, next to `notifications.js`.
e.g. `userSetting.js` for fake API calls and shaping.

## Notes

- Mock data resets every time the page is reloaded.
- `spring.jpa.hibernate.ddl-auto=create-drop` is for local development only. It drops all tables when the app stops.
- Production setup is still in progress and is not available yet.
