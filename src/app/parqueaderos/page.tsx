'use client'

import { Loader as LoaderMaps } from '@googlemaps/js-api-loader'
import { ParkingSquare } from 'lucide-react'
import { useRef, useEffect, Suspense } from 'react'
import { ScrollArea } from '@/components/ui/scroll-area'
import ParkingLotItem from './_components/ParkingLotItem'
import FloatingButton from '@/components/CustomButtons/FloatingButton'
import Loader from '@/components/Loader'
import PrimaryButton from '@/components/CustomButtons/PrimaryButton'
import BookingSheet from './_components/BookingSheet'

const parkingLots = [
  {
    id: 'parqueadero-1',
    nombre: 'Carrera 10',
    direccion: 'Carrera 10 # 15 - 25',
    ciudad: 'Bogotá',
    cuposVehiculos: 20,
    cuposBicicletas: 10,
    cuposMotos: 5,
    imagen: '/landing/principal.jpg',
    lat: 4.60974,
    lng: -74.06422,
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
    lat: 6.24013,
    lng: -75.57722,
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
    lat: 3.34249,
    lng: -76.53255,
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
    lat: 10.98081,
    lng: -74.79756,
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
    lat: 10.4431,
    lng: -76.48152,
  },
  {
    id: 'parqueadero-1',
    nombre: 'Carrera 10',
    direccion: 'Carrera 10 # 15 - 25',
    ciudad: 'Bogotá',
    cuposVehiculos: 20,
    cuposBicicletas: 10,
    cuposMotos: 5,
    imagen: '/landing/principal.jpg',
    lat: 4.60974,
    lng: -74.06422,
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
    lat: 6.24013,
    lng: -75.57722,
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
    lat: 3.34249,
    lng: -76.53255,
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
    lat: 10.98081,
    lng: -74.79756,
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
    lat: 10.4431,
    lng: -76.48152,
  },
]

export default function Home() {
  const mapRef = useRef(null)

  useEffect(() => {
    const loader = new LoaderMaps({
      apiKey: process.env.GOOGLE_MAPS_KEY!,
      version: 'weekly',
    })

    loader.load().then(() => {
      const map = new google.maps.Map(mapRef.current!, {
        center: { lat: -0.397, lng: 150.644 }, // coordenadas iniciales
        zoom: 8,
        mapId: 'NEXT_MAPS_TUTS',
      })

      const locations = [{ lat: -0.397, lng: 150.644 }] // marcadores

      parkingLots.forEach((parkingLot) => {
        const marker = new google.maps.Marker({
          position: { lat: parkingLot.lat, lng: parkingLot.lat },
          map: map,
        })

        marker.addListener('click', () => {
          // Lógica para manejar la selección del marcador
        })
      })
    })
  }, [])

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
                  <ParkingLotItem key={item.id} {...item} />
                ))}
              </div>
            </ScrollArea>
          </div>
          <div className='col-span-5'>
            <div id='map' ref={mapRef} className='w-auto h-[715px]' />
          </div>
        </div>
      </>
    </Suspense>
  )
}
