// import { Metadata } from 'next'
// import Image from 'next/image'
// import Link from 'next/link'

// // import { cn } from '@/lib/utils'
// // import { buttonVariants } from '@/registry/button-variants'
// import { UserAuthForm } from '@/components/user-auth-form'

// export const metadata: Metadata = {
//   title: 'Authentication',
//   description: 'Authentication forms built using the components.',
// }

// export default function AuthenticationPage() {
//   return (
//     <>
//       <div className="md:hidden min-h-screen">
//         <Image src="/examples/authentication-light.png" width={1280} height={843} alt="Authentication" className="block dark:hidden" />
//         <Image src="/examples/authentication-dark.png" width={1280} height={843} alt="Authentication" className="hidden dark:block" />
//       </div>
//       <div className="container relative hidden h-[800px] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
//         <div className="relative hidden h-full flex-col bg-muted min-h-screen p-10 text-white dark:border-r lg:flex">
//           <div className="absolute inset-0 bg-zinc-900" />
//           <div className="relative z-20 flex items-center text-lg font-medium">
//             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-6 w-6">
//               <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
//             </svg>
//             Hospital Food Management
//           </div>
//           <div className="relative z-20 mt-auto">
//             <blockquote className="space-y-2">
//               <p className="text-lg">
//                 &ldquo;Effortless Hospital Food Management: Streamline meal planning, dietary tracking, and delivery with our intuitive system, ensuring patients receive the right nutrition, every
//                 time.&ldquo;
//               </p>
//               <footer className="text-sm">Nikhil Pulluri</footer>
//             </blockquote>
//           </div>
//         </div>
//         <div className="lg:p-8">
//           <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
//             <div className="flex flex-col space-y-2 text-center">
//               <h1 className="text-2xl font-semibold tracking-tight">Sign In</h1>
//               <p className="text-sm text-muted-foreground">Enter your email below to sign in to your account</p>
//             </div>
//             <UserAuthForm />
//             <p className="px-8 text-center text-sm text-muted-foreground">
//               By clicking continue, you agree to our{' '}
//               <Link href="/terms" className="underline underline-offset-4 hover:text-primary">
//                 Terms of Service
//               </Link>{' '}
//               and{' '}
//               <Link href="/privacy" className="underline underline-offset-4 hover:text-primary">
//                 Privacy Policy
//               </Link>
//               .
//             </p>
//           </div>
//         </div>
//       </div>
//     </>
//   )
// }

'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { UserAuthForm } from '@/components/user-auth-form'

// export const metadata: Metadata = {
//   title: 'Authentication',
//   description: 'Authentication forms built using the components.',
// }

export default function AuthenticationPage() {
  const [authType, setAuthType] = useState<'management' | 'pantry' | 'delivery'>('management')

  const handleAuthTypeChange = (type: 'management' | 'pantry' | 'delivery') => {
    setAuthType(type)
  }

  return (
    <>
      <div className="md:hidden min-h-screen">
        <Image src="/examples/authentication-light.png" width={1280} height={843} alt="Authentication" className="block dark:hidden" />
        <Image src="/examples/authentication-dark.png" width={1280} height={843} alt="Authentication" className="hidden dark:block" />
      </div>
      <div className="container relative hidden h-[800px] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="relative hidden h-full flex-col bg-muted min-h-screen p-10 text-white dark:border-r lg:flex">
          <div className="absolute inset-0 bg-zinc-900" />
          <div className="relative z-20 flex items-center text-lg font-medium">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-6 w-6">
              <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
            </svg>
            Hospital Food Management
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;Effortless Hospital Food Management: Streamline meal planning, dietary tracking, and delivery with our intuitive system, ensuring patients receive the right nutrition, every
                time.&ldquo;
              </p>
              <footer className="text-sm">Nikhil Pulluri</footer>
            </blockquote>
          </div>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">Sign In</h1>
              <p className="text-sm text-muted-foreground">Choose your role and sign in to your account</p>
            </div>

            {/* Role Selection */}
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => handleAuthTypeChange('management')}
                className={`px-4 py-2 text-sm font-medium rounded-md ${
                  authType === 'management'
                    ? 'bg-gray-800 text-white dark:bg-primary dark:text-black' // Active state
                    : 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-300' // Default state for light and dark mode
                }`}
              >
                Management
              </button>
              <button
                onClick={() => handleAuthTypeChange('pantry')}
                className={`px-4 py-2 text-sm font-medium rounded-md ${
                  authType === 'pantry'
                    ? 'bg-gray-800 text-white dark:bg-primary dark:text-black' // Active state
                    : 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-300' // Default state for light and dark mode
                }`}
              >
                Pantry
              </button>
              <button
                onClick={() => handleAuthTypeChange('delivery')}
                className={`px-4 py-2 text-sm font-medium rounded-md ${
                  authType === 'delivery'
                    ? 'bg-gray-800 text-white dark:bg-primary dark:text-black' // Active state
                    : 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-300' // Default state for light and dark mode
                }`}
              >
                Delivery
              </button>
            </div>

            {/* Auth Form */}
            <div className="text-center">
              {authType === 'management' && <p className="text-sm">Management Login</p>}
              {authType === 'pantry' && <p className="text-sm">Pantry Staff Login</p>}
              {authType === 'delivery' && <p className="text-sm">Delivery Team Login</p>}
            </div>
            <UserAuthForm />

            <p className="px-8 text-center text-sm text-muted-foreground">
              By clicking continue, you agree to our{' '}
              <Link href="/terms" className="underline underline-offset-4 hover:text-primary">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link href="/privacy" className="underline underline-offset-4 hover:text-primary">
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
