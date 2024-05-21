'use client'

import { SessionProvider } from 'next-auth/react'
import { ThemeProvider } from '@/hooks/useThemeProvider'
import { UserLocationContext } from '@/context/UserLocationContext'
import { useEffect, useState } from 'react'
import { UserProvider } from '@/services/useUser'
import { ParkingProvider } from '@/services/useParking'
import { CityProvider } from '@/services/useCity'
import { ParkingRateProvider } from '@/services/useParkingRate'
import { ReservationProvider } from '@/services/useReservation'
import { ParkingSlotProvider } from '@/services/useParkingSlot'

interface Props {
  children: React.ReactNode
}

interface userLocationInterface {
  lat: number
  lng: number
}

function Providers({ children }: Props) {
  const [userLocation, setUserLocation] = useState<userLocationInterface>({
    lat: 4.629618184116378,
    lng: -74.06571387389643,
  })
  const getUserLocation = async () => {
    navigator.geolocation.getCurrentPosition(function (pos) {
      setUserLocation({
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
      })
    })
  }
  useEffect(() => {
    getUserLocation()
  }, [])
  return (
    <SessionProvider>
      <ThemeProvider
        attribute='class'
        defaultTheme='system'
        enableSystem
        disableTransitionOnChange
      >
        <UserLocationContext.Provider value={{ userLocation, setUserLocation }}>
          <UserProvider>
            <ParkingRateProvider>
              <ParkingProvider>
                <CityProvider>
                  <ReservationProvider>
                    <ParkingSlotProvider>{children}</ParkingSlotProvider>
                  </ReservationProvider>
                </CityProvider>
              </ParkingProvider>
            </ParkingRateProvider>
          </UserProvider>
        </UserLocationContext.Provider>
      </ThemeProvider>
    </SessionProvider>
  )
}

export default Providers
