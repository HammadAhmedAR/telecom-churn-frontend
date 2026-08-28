# telecom-churn-frontend
React frontend for the Intelligent CRM System with Integrated Predictive Analytics for Telecom Churn Management.

## Authentication

Set `VITE_API_BASE_URL` to the Express API base URL (for example, `http://localhost:5000/api`). The login page sends credentials to `POST /auth/login` through the shared RTK Query API. Successful sessions store only the JWT and safe user fields in `localStorage`, protect internal CRM routes, and attach the token to future RTK Query requests. Logout clears Redux auth state, persisted auth, and the RTK Query cache.

The authenticated Dashboard loads live PostgreSQL-backed metrics from `GET /api/dashboard/summary`; the shared base API attaches the JWT automatically.
