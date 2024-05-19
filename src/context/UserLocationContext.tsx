import { createContext, Dispatch, SetStateAction } from 'react'

interface userLocationInterface {
  lat: number
  lng: number
}

interface UserLocationContextInteface {
  userLocation: userLocationInterface
  setUserLocation: Dispatch<SetStateAction<userLocationInterface>>
}

export const UserLocationContext = createContext<UserLocationContextInteface>({
  userLocation: { lat: 4.629618184116378, lng: -74.06571387389643 },
  setUserLocation: () => {},
})
