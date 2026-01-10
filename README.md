# Foodz

![license](https://img.shields.io/badge/license-ISC-blue)
![node](https://img.shields.io/badge/node-%3E%3D16-brightgreen)

![version](https://img.shields.io/badge/version-1.0.0-blue)

Lightweight food-ordering backend (backend MVP) built with Express and Prisma. Provides restaurant, dish, cart, order and payment flows (Razorpay) plus authentication and background order-status updates.

## Table of Contents

- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Quick Start](#quick-start)
- [Project Layout](#project-layout)
- [Frontend Status](#frontend-status)
- [Usage Examples](#usage-examples)
- [Razorpay & Auth Configuration](#razorpay--auth-configuration)
- [Where to get help](#where-to-get-help)
- [Contributing](#contributing)
- [Maintainers](#maintainers)
- [License](#license)

## Key features

- REST API for restaurants, dishes, carts, orders and users
- Authentication with JWT and refresh tokens
- Payments via Razorpay integration
- Postgres-compatible database using Prisma ORM
- Seed and CSV import helpers for restaurant data

## Tech stack:

Node.js (ESM), Express, Prisma, PostgreSQL (pg), Razorpay, nodemon (dev)

## Quick Start

Prerequisites

- Node.js 16+ and npm
- A Postgres-compatible database and a `DATABASE_URL` connection string

**Install**

```bash
npm install
```

**Environment**

This project uses Prisma ORM. Environment variables are read from the root `.env` file.

- ⚠️ Note for Prisma users:
- Environment variables declared in `.env` are **not automatically loaded by Prisma** in all setups.
- Make sure your application loads them using:

```js
import "dotenv/config";
```

- or run Prisma commands using the Prisma CLI which reads from `.env`:

- https://pris.ly/prisma-config-env-vars

- Prisma supports native connection strings for PostgreSQL, MySQL, SQLite, SQL Server, MongoDB, and CockroachDB:
- https://pris.ly/d/connection-strings

To get started, copy the example file and fill in your own values:

```bash
cp .env.example .env
```

**Database & Prisma**

- The Prisma schema is at `prisma/schema.prisma` and generated client is in `generated/prisma/`.
- To generate the client (if you edit the schema):

```bash
npx prisma generate
```

- If you need to apply migrations locally:

```bash
npx prisma migrate dev
```

- Seed sample data:

```bash
node prisma/seed.js
```

**Run**

```bash
# development (auto-reload)
npm run dev

# or production
npm start
```

The server will connect to the database and listen on `process.env.PORT` or `8000`.

## Project Layout

- `src/` — application source
  - `src/app.js` — express app and middleware
  - `src/index.js` — bootstraps server and cron jobs
  - `src/config/` — configuration (Razorpay, env reading)
  - `src/controllers/`, `src/services/`, `src/routes/` — MVC structure
  - `src/db/index.js` — Prisma client import
- `prisma/` — Prisma schema, migrations and seed script
- `generated/prisma/` — generated Prisma client
- `public/` — static assets and client scripts

Inspect these files for API endpoints and route names (see `src/routes/`).

## Frontend status

This is a full-stack project, but the frontend has not been started yet. The repository currently contains a backend MVP (minimal viable product) providing REST APIs, authentication, payment integration and cron-based order status updates. The frontend client (web or mobile) will be added later and will consume the APIs under `/api/*`.

## Usage Examples

Fetch restaurants (example):

```bash
curl http://localhost:8000/api/restaurants
```

Authenticate and obtain tokens using the user endpoints, then use `Authorization: Bearer <accessToken>` for protected endpoints.

## Razorpay & Auth Configuration

See `src/config/razorpay.config.js` for Razorpay setup and `src/services/token.service.js` for JWT expectations. Keep secrets out of source control.

## Where to get help

- Open an issue in this repository for bugs or feature requests
- For Prisma/Express questions, consult their docs:
  - https://www.prisma.io/docs/
  - https://expressjs.com/

## Contributing

Contributions are welcome. Please open an issue first to discuss changes, and submit pull requests against the `main` branch with clear commit messages and proper testing.

## Maintainers

- Author: kailash kumawat

## License

This project is licensed under the ISC License — see `LICENSE`.
