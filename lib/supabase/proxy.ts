import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },

        setAll(cookiesToSet, headers) {
          // کوکی‌های درخواست جاری را به‌روز کن
          cookiesToSet.forEach(({ name, value }) => {
            request.cookies.set(name, value)
          })

          // پاسخ جدید را با درخواست به‌روزشده بساز
          supabaseResponse = NextResponse.next({
            request,
          })

          // کوکی‌های تازه را به مرورگر برگردان
          cookiesToSet.forEach(({ name, value, options }) => {
            supabaseResponse.cookies.set(name, value, options)
          })

          // Headerهای اضافی، در صورت وجود
          if (headers) {
            Object.entries(headers).forEach(([key, value]) => {
              supabaseResponse.headers.set(key, value)
            })
          }
        },
      },
    }
  )

  // برای بررسی و تازه‌سازی امن نشست
  await supabase.auth.getClaims()

  // پاسخ نهایی باید حاوی کوکی‌های به‌روزشده باشد
  return supabaseResponse
}