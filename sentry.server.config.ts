import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  
  // نرخ نمونه‌برداری (0.1 = 10% از ترافیک)
  tracesSampleRate: 1.0,
  
  // پروفایلینگ
  profilesSampleRate: 1.0,
});