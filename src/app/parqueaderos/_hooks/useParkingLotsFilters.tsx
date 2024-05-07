'use client'

import { useEffect, useState, useMemo } from 'react'
import { ParkingInterface } from '@/lib/interfaces/parking.interface'
import { useParking } from '@/services/useParking'

const newParkingData = [
  {
    id: '1',
    location: {
      id: '1',
      address: 'cra 131 asdasd',
      latitude: 1.002,
      longitude: 1.01,
      city: {
        id: '1',
        name: 'Bogotá',
      },
    },
    name: 'Parqueamelo 2',
    availableBikeSlots: 0,
    availableMotorcicleSlots: 0,
    availableCarSlots: 0,
    totalSlots: 3,
    loyalty: true,
  },
]

const parkingLotsData = [
  {
    id: 'parqueadero-1',
    nombre: 'Carrera 10',
    direccion: 'Carrera 10 # 15 - 25',
    ciudad: 'Bogotá',
    cuposVehiculos: 0,
    cuposBicicletas: 0,
    cuposMotos: 0,
    imagen: '/landing/principal.jpg',
    lat: 4.628139619286705,
    lng: -74.06545221960101,
  },
  {
    id: 'parqueadero-2',
    nombre: 'Calle 50',
    direccion: 'Calle 50 # 40 - 50',
    ciudad: 'Medellín',
    cuposVehiculos: 30,
    cuposBicicletas: 15,
    cuposMotos: 8,
    imagen: '/landing/principal.jpg',
    lat: 4.628099517336474,
    lng: -74.06612813621187,
  },
  {
    id: 'parqueadero-3',
    nombre: 'Avenida Cali',
    direccion: 'Avenida Cali # 20 - 30',
    ciudad: 'Cali',
    cuposVehiculos: 40,
    cuposBicicletas: 20,
    cuposMotos: 10,
    imagen: '/landing/principal.jpg',
    lat: 4.627931089122047,
    lng: -74.06506061709275,
  },
  {
    id: 'parqueadero-4',
    nombre: 'Transversal 7',
    direccion: 'Transversal 7 # 60 - 70',
    ciudad: 'Barranquilla',
    cuposVehiculos: 15,
    cuposBicicletas: 5,
    cuposMotos: 3,
    imagen: '/landing/principal.jpg',
    lat: 4.627995252256931,
    lng: -74.06593233495613,
  },
  {
    id: 'parqueadero-5',
    nombre: 'Calle 34',
    direccion: 'Calle 34 # 20 - 30',
    ciudad: 'Cartagena',
    cuposVehiculos: 25,
    cuposBicicletas: 12,
    cuposMotos: 6,
    imagen: '/landing/principal.jpg',
    lat: 4.627792068972773,
    lng: -74.06676918416223,
  },
]

export function useParkingLotsFilters() {
  // const [parkingLots, setParkingLots] = useState<ParkingInterface[]>([])
  const { parkings, setParkings } = useParking()
  const [filterAddress, setFilterAddress] = useState<string | null>(null)
  const [filterCity, setFilterCity] = useState<string | null>(null)
  const [filterCarPlaces, setFilterCarPlaces] = useState<boolean>(false)
  const [filterMotorcyclesPlaces, setFilterMotorcyclesPlaces] =
    useState<boolean>(false)
  const [filterBikesPlaces, setFilterBikesPlaces] = useState<boolean>(false)

  // uso de useMemo para que si la busqueda da el mismo resultado, no realice la operación
  const filteredParkingLots = useMemo(() => {
    // filtro de dirección
    let filteredObjs =
      filterAddress !== null && filterAddress.length > 0
        ? parkings.filter((parkingLot) => {
            return parkingLot.location.address
              .toLowerCase()
              .includes(filterAddress.toLowerCase())
          })
        : parkings

    // filtro de ciudad
    filteredObjs =
      filterCity !== null && filterCity.length > 0
        ? filteredObjs.filter((parkingLot) => {
            return parkingLot.location.city.name
              .toLowerCase()
              .includes(filterCity.toLowerCase())
          })
        : filteredObjs

    // filtro de cupos de carros
    filteredObjs = filterCarPlaces
      ? filteredObjs.filter((parkingLot) => {
          return parkingLot.availableCarSlots > 0
        })
      : filteredObjs

    // filtro de cupos de motos
    filteredObjs = filterMotorcyclesPlaces
      ? filteredObjs.filter((parkingLot) => {
          return parkingLot.availableMotorcicleSlots > 0
        })
      : filteredObjs

    // filtro de cupos de bicicletas
    filteredObjs = filterBikesPlaces
      ? filteredObjs.filter((parkingLot) => {
          return parkingLot.availableBikeSlots > 0
        })
      : filteredObjs

    return filteredObjs
  }, [
    filterAddress,
    parkings,
    filterCity,
    filterCarPlaces,
    filterMotorcyclesPlaces,
    filterBikesPlaces,
  ])

  return {
    filterAddress: filterAddress,
    setFilterAddress: setFilterAddress,
    filterCity: filterCity,
    setFilterCity: setFilterCity,
    filterCarPlaces: filterCarPlaces,
    setFilterCarPlaces: setFilterCarPlaces,
    filterMotorcyclesPlaces: filterMotorcyclesPlaces,
    setFilterMotorcyclesPlaces: setFilterMotorcyclesPlaces,
    filterBikesPlaces: filterBikesPlaces,
    setFilterBikesPlaces: setFilterBikesPlaces,
    filteredParkingLots: filteredParkingLots,
  }
}
