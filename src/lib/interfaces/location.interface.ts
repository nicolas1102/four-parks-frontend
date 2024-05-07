import { CityInterface } from './city.interface'

export type GeolocationType = {
  latitude: number
  longitude: number
}

export interface LocationInterface {
  id?: string
  city: CityInterface
  address: string
  // geolocation: GeolocationType
  latitude: number
  longitude: number
}

