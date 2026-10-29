import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { logout } from '@/app/login/actions'

export default async function AccountPage() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getClaims()
  const claims = data?.claims

  if (error || !claims) {
    redirect('/login')
  }

  return (
    <main>
      <h1>حساب کاربری</h1>

      <p>
        ایمیل: {String(claims.email ?? 'نامشخص')}
      </p>

      <form action={logout}>
        <button type="submit">خروج از حساب</button>
      </form>
    </main>
  )
}