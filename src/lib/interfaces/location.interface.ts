import { CityInterface } from './city.interface'

export interface LocationInterface {
  id?: number
  address: string
  latitude: number
  longitude: number
  city: CityInterface
}

