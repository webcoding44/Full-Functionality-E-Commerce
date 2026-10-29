import Loginform from '@/components/auth/Login';
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Login',
  description: 'Sign in to your account.',
};


export default function LoginPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center -mt-22 p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-4xl">
        <Loginform />
      </div>
    </div>
  )
}
