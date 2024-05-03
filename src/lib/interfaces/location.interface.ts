import { CityInterface } from './city.interface'

export type GeolocationType = {
  lat: number
  lng: number
}

export interface LocationInterface {
  id?: string
  city: CityInterface
  address: string
  geolocation: GeolocationType
}

