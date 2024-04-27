'use client'

import { ParkingSquare } from 'lucide-react'
import { useRef, useEffect, Suspense, useState } from 'react'
import { ScrollArea } from '@/components/ui/scroll-area'
import ParkingLotItem from './_components/ParkingLotItem'
import Loader from '@/components/Loader'
import { ParkingLotInterface } from '@/lib/interfaces/parkingLot.interface'
import GoogleMapView from './_components/GoogleMap'

const parkingLotsData = [
  {
    id: 'parqueadero-1',
    nombre: 'Carrera 10',
    direccion: 'Carrera 10 # 15 - 25',
    ciudad: 'Bogotá',
    cuposVehiculos: 20,
    cuposBicicletas: 10,
    cuposMotos: 5,
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

export default function Home() {
  const mapRef = useRef(null)
  const [selectedParkingLot, setSelectedParkingLot] =
    useState<ParkingLotInterface | null>(null)
  const [parkingLots, setParkingLots] = useState<ParkingLotInterface[]>([])

  useEffect(() => {
    // fetch parking lots
    setParkingLots(parkingLotsData)

    // const loader = new LoaderMaps({
    //   apiKey: process.env.GOOGLE_MAPS_KEY!,
    //   version: 'weekly',
    // })

    // loader.load().then(() => {
    //   const map = new google.maps.Map(mapRef.current!, {
    //     center: { lat: -0.397, lng: 150.644 }, // coordenadas iniciales
    //     zoom: 8,
    //     mapId: 'NEXT_MAPS_TUTS',
    //   })

    //   const locations = [{ lat: -0.397, lng: 150.644 }] // marcadores

    //   parkingLots.forEach((parkingLot) => {
    //     const marker = new google.maps.Marker({
    //       position: { lat: parkingLot.lat, lng: parkingLot.lat },
    //       map: map,
    //     })

    //     marker.addListener('click', () => {
    //       // Lógica para manejar la selección del marcador
    //     })
    //   })
    // })
  }, [parkingLots])

  return (
    <Suspense fallback={<Loader />}>
      <>
        <div className='py-2 px-6 border-b flex flex-row gap-3'>
          <h1 className='text-2xl tracking-widest flex content-center gap-x-2'>
            <ParkingSquare size={34} />
            PARQUEADEROS
          </h1>
          <span className='border-l border-primary h-auto'></span>
          <div></div>
        </div>

        <div className='grid grid-cols-12'>
          <div className='col-span-7 px-4 py-5'>
            <p className='mb-4 px-3'>
              Selecciona el parqueadero que te mejor se a lo que necesitas.
            </p>
            <ScrollArea className='h-[620px]'>
              <div className='grid grid-cols-3 gap-2 pr-3'>
                {parkingLots.map((item) => (
                  <ParkingLotItem
                    key={item.id}
                    {...item}
                    setSelectedParkingLot={setSelectedParkingLot}
                    isSelected={item.id === selectedParkingLot?.id}
                  />
                ))}
              </div>
            </ScrollArea>
          </div>
          <div className='col-span-5'>
            <GoogleMapView
              parkingLots={parkingLots}
              selectedParkingLot={selectedParkingLot}
              setSelectedParkingLot={setSelectedParkingLot}
            />
            {/* <div id='map' ref={mapRef} className='w-auto h-[715px]' /> */}
          </div>
        </div>
      </>
    </Suspense>
  )
}
