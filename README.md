# RepairSync

RepairSync is a full-stack web application consisting of a Next.js frontend and an Express.js/Prisma backend.

## 📂 Project Structure

The repository is organized into frontend (Next.js) and backend (Node.js) codebases:

### Frontend (Root Directory)
Built with **Next.js**, **React**, **Tailwind CSS**, and **TypeScript**.
- `app/` - Next.js App Router containing all the pages and routing logic.
- `components/` - Reusable UI components (like `LoginModal.tsx`, buttons, layouts, etc).
- `providers/` - React Context providers (e.g., `AuthProvider` for managing authentication state globally).
- `hooks/` - Custom React hooks.
- `lib/` - Shared utility functions and API clients (e.g., Axios setup).
- `public/` - Static files like images and icons.
- `supabase/` - Configuration related to Supabase (if used for database/auth).

### Backend (`/backend`)
Built with **Node.js**, **Express**, **Prisma ORM**, and **TypeScript**.
- `backend/services/auth-service/` - The authentication microservice.
  - `src/` - Contains the Express server setup, routes, controllers, and services (like `auth.service.ts`).
  - `prisma/` - Contains `schema.prisma` which defines the database models for user accounts, refresh tokens, etc.
- `backend/docker-compose.yml` - Docker setup for running dependencies like a local PostgreSQL database.

---

## 🚀 How to Run the Application Locally

To run the full application, you need to start **both** the backend and the frontend simultaneously in two separate terminal windows.

### 1. Run the Backend Server
Open your first terminal and run the following commands:

```bash
# Navigate to the authentication service directory
cd backend/services/auth-service

# Install dependencies (only needed the first time)
npm install

# Generate the Prisma client (only needed the first time or when the schema changes)
npx prisma generate

# Start the backend in development mode
npm run dev
```
*The backend server will typically start on port 4000 (or whichever port is defined in your backend `.env` file).*

### 2. Run the Frontend Server
Open a **second, new terminal window** (keep the backend terminal running) and run the following commands:

```bash
# Ensure you are in the root directory of the project
cd .

# Install dependencies (only needed the first time)
npm install

# Start the Next.js frontend in development mode
npm run dev
```
*The frontend server will start and be accessible at [http://localhost:3000](http://localhost:3000).*

---

## ⚙️ Environment Variables
Be sure to set up your environment variables before running the application. 
- You can copy the `.env.example` file to `.env` in both the root directory and the `backend/services/auth-service/` directory and fill in the required keys (like Database URL, JWT secrets, etc.).
