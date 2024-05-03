'use client'

import { Bike, Car, ParkingSquare } from 'lucide-react'
import { useEffect, useState, useMemo } from 'react'
import { ScrollArea } from '@/components/ui/scroll-area'
import ParkingLotItem from './_components/ParkingLotItem'
import { ParkingInterface } from '@/lib/interfaces/parking.interface'
import GoogleMapView from './_components/GoogleMap'
import { Input } from '@/components/ui/input'
import { PiMotorcycleFill } from 'react-icons/pi'
import { Toggle } from '@/components/ui/toggle'
import { useParkingLotsFilters } from './_hooks/useParkingLotsFilters'

export default function Home() {
  const {
    setFilterAddress,
    setFilterCity,
    filterCarPlaces,
    setFilterCarPlaces,
    filterMotorcyclesPlaces,
    setFilterMotorcyclesPlaces,
    filterBikesPlaces,
    setFilterBikesPlaces,
    filteredParkingLots,
  } = useParkingLotsFilters()
  
  const [selectedParkingLot, setSelectedParkingLot] =
    useState<ParkingInterface | null>(null)

  return (
    <div>
      <div className='py-2 px-6 border-b flex flex-row gap-3'>
        <h1 className='text-3xl tracking-widest flex content-center gap-x-2'>
          <ParkingSquare size={40} />
          PARQUEADEROS
        </h1>
        <span className='border-l border-primary h-auto'></span>
        <div className='flex flex-row gap-4'>
          <div>
            <Input
              onChange={(e) => {
                setFilterAddress(e.target.value)
              }}
              placeholder='Filtrar por dirección'
            />
          </div>
          <div>
            <Input
              onChange={(e) => {
                setFilterCity(e.target.value)
              }}
              placeholder='Filtrar por ciudad'
            />
          </div>
          <span className='border-l border-primary h-auto'></span>
          <div className='flex items-center gap-2'>
            <p>Cupos para: </p>
            <div className='flex items-center space-x-2'>
              <Toggle
                aria-label='Toggle-car-places'
                onPressedChange={() => {
                  setFilterCarPlaces(!filterCarPlaces)
                }}
                defaultPressed={filterCarPlaces}
                className='border'
              >
                <Car />
              </Toggle>
            </div>
            <div className='flex items-center space-x-2'>
              <Toggle
                aria-label='Toggle-motorcycle-places'
                onPressedChange={() => {
                  setFilterMotorcyclesPlaces(!filterMotorcyclesPlaces)
                }}
                defaultPressed={filterMotorcyclesPlaces}
                className='border '
              >
                <PiMotorcycleFill size={22} />
              </Toggle>
            </div>
            <div className='flex items-center space-x-2'>
              <Toggle
                aria-label='Toggle-bike-places'
                onPressedChange={() => {
                  setFilterBikesPlaces(!filterBikesPlaces)
                }}
                defaultPressed={filterBikesPlaces}
                className='border '
              >
                <Bike size={21} />
              </Toggle>
            </div>
          </div>
        </div>
      </div>

      <div className='grid grid-cols-12'>
        <div className='col-span-7 px-4 py-5'>
          <p className='mb-4 px-3'>
            Selecciona el parqueadero que te mejor se a lo que necesitas.
          </p>
          <ScrollArea className='h-[620px]'>
            {filteredParkingLots.length !== 0 ? (
              <div className='grid grid-cols-3 gap-2 pr-3'>
                {filteredParkingLots.map((item) => (
                  <ParkingLotItem
                    key={item.id}
                    {...item}
                    setSelectedParkingLot={setSelectedParkingLot}
                    isSelected={item.id === selectedParkingLot?.id}
                  />
                ))}
              </div>
            ) : (
              <div className='flex flex-col items-center w-full h-full py-14'>
                <p className='text-xl tracking-widest'>
                  NO HAY RESULTADOS DE PARQUEADEROS.
                </p>
              </div>
            )}
          </ScrollArea>
        </div>

        <div className='col-span-5'>
          <GoogleMapView
            parkingLots={filteredParkingLots}
            selectedParkingLot={selectedParkingLot}
            setSelectedParkingLot={setSelectedParkingLot}
          />
        </div>
      </div>
    </div>
  )
}
