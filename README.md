# PSA

A web-based admin application with a dashboard, notifications/inbox, employee, attendance, recruitment, schedule and settings pages.

## Disclaimer

This project is made for PSA. It is still a work in progress, and for now the documentation only covers the frontend.

## Technologies Used

**Frontend**

- React (Vite)
- Tailwind CSS
- React Router
- TanStack Query
- Axios
- Sonner (toasts)

**Tools**

- MSW (mock API for development)
- Node.js 22 or newer

## Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Add environment variables (see below)
4. Run the frontend: `npm run dev` (opens at `http://localhost:5173`)

## Environment Variables

The frontend uses a `.env` file in the project root:

```dotenv
VITE_API_URL="http://localhost:8080"
VITE_USE_MOCKS=true
```

- `VITE_API_URL` - Base URL of the backend API
- `VITE_USE_MOCKS` - `true` uses a fake in-memory API (MSW) so the app runs without a backend. Set it to `false` to use the real backend. (Backend is currently in making)

Restart the dev server after changing the `.env` file. The production environment (`.env.prod`) is still in progress.

## Notes

- Mock data resets every time the page is reloaded.
- Production setup is still in progress and is not available yet.
