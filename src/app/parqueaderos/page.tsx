'use client'

import { Loader } from '@googlemaps/js-api-loader'
import { useRef, useEffect } from 'react'

export default function Home() {
  const mapRef = useRef(null)

  useEffect(() => {
    const loader = new Loader({
      apiKey: process.env.GOOGLE_MAPS_KEY!, // Reemplaza 'TU_API_KEY' con tu clave de API real
      version: 'weekly',
    })

    loader.load().then(() => {
      const map = new google.maps.Map(mapRef.current!, {
        center: { lat: -0.397, lng: 150.644 }, // Establece las coordenadas iniciales de tu mapa
        zoom: 8,
      })

      // Aquí puedes agregar tus marcadores
      const locations = [
        { lat: -0.397, lng: 150.644 },
        // ... más ubicaciones
      ]

      locations.forEach((location) => {
        const marker = new google.maps.Marker({
          position: location,
          map: map,
        })

        // Aquí puedes agregar un listener para cuando se selecciona un marcador
        marker.addListener('click', () => {
          // Lógica para manejar la selección del marcador
        })
      })
    })
  }, [])

  return (
    <div className='max-h-full m-auto flex flex-col gap-y-10'>
      <h1 className='text-xl tracking-widest text-center font-medium'>
        PÁGINA DE PARQUEADEROS
      </h1>
      <div id='map' style={{ height: '500px', width: '100%' }} ref={mapRef} />
    </div>
  )
}
