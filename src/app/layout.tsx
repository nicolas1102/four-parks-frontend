import type { Metadata } from 'next'
import { Inter as FontSans } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/hooks/useThemeProvider'
import Navbar from '@/components/Navbar/Navbar'
import { cn } from '@/lib/utils'
import { Toaster } from 'sonner'
import Footer from '@/components/Footer'
import Loader from '@/components/Loader'

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
            <Loader>
              <div className='mx-10 mt-10 mb-20'>{children}</div>
            </Loader>
            <Footer />
          </main>
          <Toaster position='bottom-left' richColors />
        </ThemeProvider>
      </body>
    </html>
  )
}
