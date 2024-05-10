import { CityInterface } from './city.interface'

export type GeolocationType = {
  latitude: number
  longitude: number
}

export interface LocationInterface {
  id?: number
  address: string
  latitude: string
  // latitude: number
  longitude: string
  // longitude: number
  city: CityInterface
  // geolocation: GeolocationType
}

