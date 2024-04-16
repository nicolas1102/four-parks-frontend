'use client'

import { SessionProvider } from 'next-auth/react'
import { ThemeProvider } from '@/hooks/useThemeProvider'

interface Props {
  children: React.ReactNode
}

function Providers({ children }: Props) {
  return (
    <SessionProvider>
      <ThemeProvider
        attribute='class'
        defaultTheme='system'
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </SessionProvider>
  )
}

export default Providers
