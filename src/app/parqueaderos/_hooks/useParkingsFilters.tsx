'use client'

import { useState, useMemo } from 'react'
import { useParking } from '@/services/useParking'

export function useParkingsFilters() {
  const { parkings } = useParking()
  const [filterAddress, setFilterAddress] = useState<string>('')
  const [filterCity, setFilterCity] = useState<string>('')
  const [filterParkingType, setFilterParkingType] = useState<string>('')
  const [filterName, setFilterName] = useState<string>('')

  // uso de useMemo para que si la busqueda da el mismo resultado, no realice la operación
  const filteredParkingLots = useMemo(() => {
    // filtro de dirección
    let filteredObjs =
      filterAddress.length > 0
        ? parkings.filter((parkingLot) => {
            return parkingLot.location.address
              .toLowerCase()
              .includes(filterAddress.toLowerCase())
          })
        : parkings

    // filtro de nombre
    filteredObjs =
      filterName.length > 0
        ? filteredObjs.filter((parkingLot) => {
            return parkingLot.name
              .toLowerCase()
              .includes(filterName.toLowerCase())
          })
        : filteredObjs

    // filtro de ciudad
    filteredObjs =
      filterCity.length > 0
        ? filteredObjs.filter((parkingLot) => {
            return (
              parkingLot.location.city.city.toLowerCase() ===
              filterCity.toLowerCase()
            )
          })
        : filteredObjs

    // filtro de tipo de parqueadero
    filteredObjs =
      filterParkingType.length > 0
        ? filteredObjs.filter((parkingLot) => {
            return (
              parkingLot.parkingType.type.toLowerCase() ===
              filterParkingType.toLowerCase()
            )
          })
        : filteredObjs

    return filteredObjs
  }, [filterAddress, parkings, filterName, filterCity, filterParkingType])

  return {
    filterName: filterName,
    setFilterName: setFilterName,
    filterAddress: filterAddress,
    setFilterAddress: setFilterAddress,
    filterCity: filterCity,
    setFilterCity: setFilterCity,
    filterParkingType: filterParkingType,
    setFilterParkingType: setFilterParkingType,
    filteredParkingLots: filteredParkingLots,
  }
}
