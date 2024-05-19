'use client'

import { useState, useMemo } from 'react'
import { useParking } from '@/services/useParking'

export function useParkingsFilters() {
  // const [parkingLots, setParkingLots] = useState<ParkingInterface[]>([])
  const { parkings, setParkings } = useParking()
  const [filterAddress, setFilterAddress] = useState<string>('')
  const [filterCity, setFilterCity] = useState<string>('')
  const [filterParkingType, setFilterParkingType] = useState<string>('')
  const [filterName, setFilterName] = useState<string>('')
  const [filterCarPlaces, setFilterCarPlaces] = useState<boolean>(false)
  const [filterMotorcyclesPlaces, setFilterMotorcyclesPlaces] =
    useState<boolean>(false)
  const [filterBikesPlaces, setFilterBikesPlaces] = useState<boolean>(false)
  const [filterHeavyPlaces, setFilterHeavyPlaces] = useState<boolean>(false)

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

    // filtro de cupos de carros
    filteredObjs = filterCarPlaces
      ? filteredObjs.filter((parkingLot) => {
          return (
            parkingLot.parkingSlotDetails &&
            parkingLot.parkingSlotDetails.map((parkingSlotDetailItem) => {
              parkingSlotDetailItem.slotType === 'CARRO' &&
                parkingSlotDetailItem.emptySlots > 0
            })
          )
        })
      : filteredObjs

    // // filtro de cupos de motos
    filteredObjs = filterMotorcyclesPlaces
      ? filteredObjs.filter((parkingLot) => {
          return (
            parkingLot.parkingSlotDetails &&
            parkingLot.parkingSlotDetails.map((parkingSlotDetailItem) => {
              parkingSlotDetailItem.slotType === 'MOTO' &&
                parkingSlotDetailItem.emptySlots > 0
            })
          )
        })
      : filteredObjs

    // // filtro de cupos de bicicletas
    filteredObjs = filterBikesPlaces
      ? filteredObjs.filter((parkingLot) => {
          return (
            parkingLot.parkingSlotDetails &&
            parkingLot.parkingSlotDetails.map((parkingSlotDetailItem) => {
              parkingSlotDetailItem.slotType === 'BICICLETA' &&
                parkingSlotDetailItem.emptySlots > 0
            })
          )
        })
      : filteredObjs

    // // filtro de cupos de vehiculos pesados
    filteredObjs = filterHeavyPlaces
      ? filteredObjs.filter((parkingLot) => {
          return (
            parkingLot.parkingSlotDetails &&
            parkingLot.parkingSlotDetails.map((parkingSlotDetailItem) => {
              parkingSlotDetailItem.slotType === 'VEHICULO_PESADO' &&
                parkingSlotDetailItem.emptySlots > 0
            })
          )
        })
      : filteredObjs

    return filteredObjs
  }, [
    filterAddress,
    parkings,
    filterName,
    filterCity,
    filterParkingType,
    filterCarPlaces,
    filterMotorcyclesPlaces,
    filterBikesPlaces,
    filterHeavyPlaces,
  ])

  return {
    filterName: filterName,
    setFilterName: setFilterName,
    filterAddress: filterAddress,
    setFilterAddress: setFilterAddress,
    filterCity: filterCity,
    setFilterCity: setFilterCity,
    filterParkingType: filterParkingType,
    setFilterParkingType: setFilterParkingType,
    filterCarPlaces: filterCarPlaces,
    setFilterCarPlaces: setFilterCarPlaces,
    filterMotorcyclesPlaces: filterMotorcyclesPlaces,
    setFilterMotorcyclesPlaces: setFilterMotorcyclesPlaces,
    filterBikesPlaces: filterBikesPlaces,
    setFilterBikesPlaces: setFilterBikesPlaces,
    filterHeavyPlaces: filterHeavyPlaces,
    setFilterHeavyPlaces: setFilterHeavyPlaces,
    filteredParkingLots: filteredParkingLots,
  }
}
