# Full Functionality E-Commerce

A full-stack e-commerce application built with **Next.js** and **Supabase**, with **Stripe** for payment processing and **Sentry** for error monitoring. The project includes an admin dashboard and the core functionality needed to run an online store.

<p>
  <img alt="Next.js" src="https://img.shields.io/badge/Next.js-000000?logo=next.js&logoColor=white" />
  <img alt="Supabase" src="https://img.shields.io/badge/Supabase-3ECF8E?logo=supabase&logoColor=white" />
  <img alt="Stripe" src="https://img.shields.io/badge/Stripe-635BFF?logo=stripe&logoColor=white" />
  <img alt="Sentry" src="https://img.shields.io/badge/Sentry-362D59?logo=sentry&logoColor=white" />
</p>

## Overview

This project brings together a modern Next.js frontend and Supabase backend services to support an e-commerce experience. Stripe handles payment integration, while Sentry helps track application errors and diagnose issues. An admin dashboard provides a dedicated area for managing the store.

## Features

- **E-commerce experience** — the core workflows expected from an online store.
- **Admin dashboard** — a dedicated interface for store administration.
- **Stripe integration** — payment processing through Stripe.
- **Supabase backend** — backend and data services powered by Supabase.
- **Error monitoring** — Sentry integration for tracking application errors.
- **Next.js application** — a modern web application built with Next.js.

> Available features and setup requirements depend on the implementation in this repository. Refer to the source code for the exact workflows and configuration.

## Tech Stack

| Technology | Purpose |
| --- | --- |
| [Next.js](https://nextjs.org/) | Frontend and web application framework |
| [Supabase](https://supabase.com/) | Backend services and data layer |
| [Stripe](https://stripe.com/) | Payment integration |
| [Sentry](https://sentry.io/) | Error monitoring and diagnostics |

## Getting Started

### Prerequisites

Before running the project, make sure you have:

- [Node.js](https://nodejs.org/) installed (an LTS version is recommended).
- npm, pnpm, or your preferred package manager.
- A Supabase project.
- Stripe credentials for payment features.
- A Sentry project/DSN if you want to enable error monitoring.

### 1. Clone the repository

Replace the URL below with your repository's clone URL:

```bash
git clone https://github.com/<your-username>/<your-repository>.git
cd Full-Functionality-E-Commerce
```

### 2. Install dependencies

Use the package manager that matches the lockfile in the repository. For npm:

```bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file in the project root. The example below uses common variable names; **keep the names aligned with the ones referenced by your application's code and configuration**.

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=

# Sentry (use the variable name configured by your project)
SENTRY_DSN=
```

Add values from the respective service dashboards. Some variables may not be needed, or your project may use different names.

**Security notes**

- Never commit `.env.local` or other files containing secrets.
- Keep `STRIPE_SECRET_KEY` and `STRIPE_WEBHOOK_SECRET` on the server; never expose them through a `NEXT_PUBLIC_` variable.
- If you use a Supabase service-role key, keep it server-side only. Never expose it in browser code.
- Verify Stripe payments on the server and validate webhook events according to your implementation.

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Build for production

```bash
npm run build
npm run start
```

These commands assume the corresponding scripts are defined in `package.json`. Check that file if your project uses different scripts or a different package manager.

## Project Structure

The repository currently includes the following top-level application folders:

```text
.
├── app/       # Next.js application routes and UI
├── public/    # Static assets
├── README.md
└── ...        # Configuration and other project files
```

The internal structure may evolve as the application grows. Check the repository for the latest implementation details.

## Integrations

### Supabase

Configure the Supabase URL and public client key in your environment. Make sure the database schema, access policies, and any authentication setup match the requirements of the application.

### Stripe

Add the required Stripe keys and configure the webhook endpoint expected by the application. For local webhook testing, use the Stripe CLI and forward events to your project's actual webhook route.

### Sentry

Configure the DSN and any additional settings used by the repository's Sentry configuration. Keep build or upload tokens, if used, in server-side or CI environment settings rather than client-side code.

## Deployment

Deploy the Next.js application to a hosting platform that supports your Next.js configuration. Before deploying, add the required environment variables to the hosting environment and verify the Supabase, Stripe webhook, and Sentry configurations for the production environment.

## Contributing

Contributions and suggestions are welcome. For substantial changes, open an issue first to discuss the proposed update. Before submitting a pull request, make sure the application builds and that any relevant tests pass.

## License

No license information has been specified in this README. Add a `LICENSE` file if you intend to define terms for use, modification, or distribution.
