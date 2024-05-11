'use client'

import { useEffect, useState, useMemo } from 'react'
import { ParkingInterface } from '@/lib/interfaces/parking.interface'
import { useParking } from '@/services/useParking'

// const newParkingData = [
//   {
//     id: '1',
//     location: {
//       id: '1',
//       address: 'cra 131 asdasd',
//       latitude: 4.628139619286705,
//       longitude: -74.06545221960101,
//       city: {
//         id: '1',
//         name: 'Bogotá',
//       },
//     },
//     name: 'Parqueamelo 2',
//     availableBikeSlots: 0,
//     availableMotorcicleSlots: 0,
//     availableCarSlots: 0,
//     totalSlots: 3,
//     loyalty: true,
//   },
//   {
//     id: '2',
//     location: {
//       id: '2',
//       address: 'Calle 85 # 12-34',
//       latitude: 4.628099517336474,
//       longitude: -74.06612813621187,
//       city: {
//         id: '2',
//         name: 'Bogotá',
//       },
//     },
//     name: 'Parking Central',
//     availableBikeSlots: 5,
//     availableMotorcicleSlots: 2,
//     availableCarSlots: 10,
//     totalSlots: 17,
//     loyalty: false,
//   },
//   {
//     id: '3',
//     location: {
//       id: '3',
//       address: 'Avenida Caracas con calle 26',
//       latitude: 4.627931089122047,
//       longitude: -74.06506061709275,
//       city: {
//         id: '3',
//         name: 'Bogotá',
//       },
//     },
//     name: 'Zona Rosa Parking',
//     availableBikeSlots: 0,
//     availableMotorcicleSlots: 3,
//     availableCarSlots: 8,
//     totalSlots: 11,
//     loyalty: true,
//   },
//   {
//     id: '4',
//     location: {
//       id: '4',
//       address: 'Diagonal 70 con carrera 9a',
//       latitude: 4.627995252256931,
//       longitude: -74.06593233495613,
//       city: {
//         id: '4',
//         name: 'Bogotá',
//       },
//     },
//     name: 'Parking Norte',
//     availableBikeSlots: 2,
//     availableMotorcicleSlots: 1,
//     availableCarSlots: 15,
//     totalSlots: 18,
//     loyalty: false,
//   },
//   {
//     id: '5',
//     location: {
//       id: '5',
//       address: 'Calle 26 con carrera 53',
//       latitude: 4.627792068972773,
//       longitude: -74.06676918416223,
//       city: {
//         id: '5',
//         name: 'Bogotá',
//       },
//     },
//     name: 'Estacionamiento Chapinero',
//     availableBikeSlots: 10,
//     availableMotorcicleSlots: 0,
//     availableCarSlots: 5,
//     totalSlots: 15,
//     loyalty: true,
//   },
//   {
//     id: '6',
//     location: {
//       id: '6',
//       address: 'Avenida Boyacá con calle 116',
//       latitude: 4.6271799621213745,
//       longitude: -74.06444254260322,
//       city: {
//         id: '7',
//         name: 'Bogotá',
//       },
//     },
//     name: 'Parking Portal 80',
//     availableBikeSlots: 3,
//     availableMotorcicleSlots: 4,
//     availableCarSlots: 20,
//     totalSlots: 27,
//     loyalty: false,
//   },
//   {
//     id: '7',
//     location: {
//       id: '7',
//       address: 'Calle 63 con carrera 7ma',
//       latitude: 4.62519089991004,
//       longitude: -74.06483950958017,
//       city: {
//         id: '7',
//         name: 'Bogotá',
//       },
//     },
//     name: 'Gran Parking',
//     availableBikeSlots: 0,
//     availableMotorcicleSlots: 0,
//     availableCarSlots: 7,
//     totalSlots: 7,
//     loyalty: false,
//   },
//   {
//     id: '8',
//     location: {
//       id: '8',
//       address: 'Zona T, carrera 14 con calle 82',
//       latitude: 4.6249877158259585,
//       longitude: -74.06978550266348,
//       city: {
//         id: '8',
//         name: 'Bogotá',
//       },
//     },
//     name: 'Zona T Parking',
//     availableBikeSlots: 1,
//     availableMotorcicleSlots: 2,
//     availableCarSlots: 12,
//     totalSlots: 15,
//     loyalty: true,
//   },
//   {
//     id: '9',
//     location: {
//       id: '9',
//       address: 'Calle 100 con carrera 15',
//       latitude: 4.6203679356039045,
//       longitude: -74.06685653066198,
//       city: {
//         id: '9',
//         name: 'Bogotá',
//       },
//     },
//     name: 'Parking El Retiro',
//     availableBikeSlots: 4,
//     availableMotorcicleSlots: 0,
//     availableCarSlots: 25,
//     totalSlots: 29,
//     loyalty: false,
//   },
//   {
//     id: '10',
//     location: {
//       id: '10',
//       address: 'Avenida Jiménez con carrera 3ra',
//       latitude: 4.630443720758486,
//       longitude: -74.06635110751127,
//       city: {
//         id: '10',
//         name: 'Bogotá',
//       },
//     },
//     name: 'Centro Parking',
//     availableBikeSlots: 6,
//     availableMotorcicleSlots: 1,
//     availableCarSlots: 18,
//     totalSlots: 25,
//     loyalty: true,
//   },
//   {
//     id: '11',
//     location: {
//       id: '11',
//       address: 'Carrera 70 con calle 44, El Poblado',
//       latitude: 6.24053678894374,
//       longitude: -75.5479766332736,
//       city: {
//         id: '11',
//         name: 'Medellín',
//       },
//     },
//     name: 'Parqueadero El Poblado',
//     availableBikeSlots: 5,
//     availableMotorcicleSlots: 3,
//     availableCarSlots: 12,
//     totalSlots: 20,
//     loyalty: true,
//   },
// ]

export function useParkingLotsFilters() {
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

    // // filtro de cupos de carros
    // filteredObjs = filterCarPlaces
    //   ? filteredObjs.filter((parkingLot) => {
    //       return parkingLot.availableCarSlots > 0
    //     })
    //   : filteredObjs

    // // filtro de cupos de motos
    // filteredObjs = filterMotorcyclesPlaces
    //   ? filteredObjs.filter((parkingLot) => {
    //       return parkingLot.availableMotorcicleSlots > 0
    //     })
    //   : filteredObjs

    // // filtro de cupos de bicicletas
    // filteredObjs = filterBikesPlaces
    //   ? filteredObjs.filter((parkingLot) => {
    //       return parkingLot.availableBikeSlots > 0
    //     })
    //   : filteredObjs

    // // filtro de cupos de vehiculos pesados
    // filteredObjs = filterHeavyPlaces
    //   ? filteredObjs.filter((parkingLot) => {
    //       return parkingLot.availableHeavySlots > 0
    //     })
    //   : filteredObjs

    return filteredObjs
  }, [
    filterAddress,
    filterName,
    filterParkingType,
    // parkings,
    filterCity,
    parkings,
    // filterCarPlaces,
    // filterMotorcyclesPlaces,
    // filterBikesPlaces,
    // filterHeavyPlaces,
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
