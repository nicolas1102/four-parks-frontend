import type { Metadata } from 'next'
import { Inter as FontSans } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/hooks/useThemeProvider'
import { cn } from '@/lib/utils'
import Loader from '@/components/Loader'
import { Suspense } from 'react'
import { Toaster } from '@/components/ui/sonner'
import { DEFAULT_SITE_DESCRIPTION, DEFAULT_SITE_TITLE } from './const'
import Navbar from '@/components/Layout/Navbar/Navbar'
import Footer from '@/components/Layout/Footer'
import Providers from '../hooks/useProviders'

export const metadata: Metadata = {
  title: DEFAULT_SITE_TITLE,
  description: DEFAULT_SITE_DESCRIPTION,
}

export const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable
        )}
      >
        <Providers>
          <main className='relative flex flex-col min-h-screen'>
            <Navbar />
            <Suspense fallback={<Loader />}>
              <div className='mx-10 mt-10 mb-20'>{children}</div>
            </Suspense>
            <Footer />
          </main>
          <Toaster />
        </Providers>
      </body>
    </html>
  )
}
