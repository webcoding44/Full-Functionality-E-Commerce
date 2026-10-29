import Signupform from '@/components/auth/Signup';
import type { Metadata } from 'next'


export const metadata: Metadata = {
  title: 'Sign Up',
  description: 'Create a new account.',
  
};

export default function SignupPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center -mt-28 p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-4xl">
        <Signupform />
      </div>
    </div>
  )
}
