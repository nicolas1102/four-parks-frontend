import type { Metadata } from 'next'
import { Inter as FontSans } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/hooks/useThemeProvider'
import Navbar from '@/components/Navbar/Navbar'
import { cn } from '@/lib/utils'
import Footer from '@/components/Footer'
import Loader from '@/components/Loader'
import { Suspense } from 'react'
import { Toaster } from '@/components/ui/sonner'

export const metadata: Metadata = {
  title: 'Four Parks',
  description: 'Tu parqueadero favorito.',
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
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          <main className='relative flex flex-col min-h-screen'>
            <Navbar />
            <Suspense fallback={<Loader />}>
              <div className='mx-10 mt-10 mb-20'>{children}</div>
            </Suspense>
            <Footer />
          </main>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
