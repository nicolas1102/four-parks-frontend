'use client'

import { ParkingSquare } from 'lucide-react'
import { useEffect, useState, useMemo } from 'react'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import ParkingItem from './_components/ParkingItem'
import { ParkingInterface } from '@/lib/interfaces/parking.interface'
import GoogleMapView from './_components/GoogleMap'
import { Input } from '@/components/ui/input'
import { useParkingsFilters } from './_hooks/useParkingsFilters'
import { useParking } from '@/services/useParking'
import { CitySelect } from './_components/CitySelect'
import { ParkingTypeSelect } from './_components/ParkingTypeSelect'
import FloatingButton from '@/components/CustomButtons/FloatingButton'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { Button } from '@/components/ui/button'

export default function Home() {
  const {
    setFilterName,
    setFilterAddress,
    filterCity,
    setFilterCity,
    filterParkingType,
    setFilterParkingType,
    filterCarPlaces,
    setFilterCarPlaces,
    filterMotorcyclesPlaces,
    setFilterMotorcyclesPlaces,
    filterBikesPlaces,
    setFilterBikesPlaces,
    filterHeavyPlaces,
    setFilterHeavyPlaces,
    filteredParkingLots,
  } = useParkingsFilters()
  const { parkings, isLoading, getParkings } = useParking()

  const [selectedParkingLot, setSelectedParkingLot] =
    useState<ParkingInterface | null>(null)

  useEffect(() => {
    const fetchParkings = async () => {
      await getParkings()
    }
    fetchParkings()
  }, [])
  return (
    <div>
      <div className='py-2 px-4 border-b flex flex-row gap-3'>
        <h1 className='text-3xl tracking-widest flex content-center gap-x-2'>
          <ParkingSquare size={40} />
          PARQUEADEROS
        </h1>
        <span className='border-l border-primary h-auto hidden sm:block'></span>
        <div className='sm:flex sm:flex-row gap-2 hidden'>
          <div>
            <Input
              onChange={(e) => {
                setFilterName(e.target.value)
              }}
              placeholder='Filtrar por nombre'
            />
          </div>
          <div>
            <Input
              onChange={(e) => {
                setFilterAddress(e.target.value)
              }}
              placeholder='Filtrar por dirección'
            />
          </div>
          <div>
            <CitySelect
              selectValue={filterCity}
              setSelectValue={setFilterCity}
            />
          </div>
          <div>
            <ParkingTypeSelect
              selectValue={filterParkingType}
              setSelectValue={setFilterParkingType}
            />
          </div>
          <span className='border-l border-primary h-auto'></span>
          {/* <div className='flex items-center gap-2'>
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
                <CustomTooltip text='Carros'>
                  <Car />
                </CustomTooltip>
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
                <CustomTooltip text='Motos'>
                  <PiMotorcycleFill size={22} />
                </CustomTooltip>
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
                <CustomTooltip text='Bicicletas'>
                  <Bike size={21} />
                </CustomTooltip>
              </Toggle>
            </div>
            <div className='flex items-center space-x-2'>
              <Toggle
                aria-label='Toggle-heavy-places'
                onPressedChange={() => {
                  setFilterHeavyPlaces(!filterHeavyPlaces)
                }}
                defaultPressed={filterHeavyPlaces}
                className='border '
              >
                <CustomTooltip text='Carga Pesada'>
                  <Tractor size={21} />
                </CustomTooltip>
              </Toggle>
            </div>
          </div> */}
        </div>
      </div>

      <div className='sm:grid sm:grid-cols-12 '>
        <div className='sm:col-span-7 px-4 py-5 hidden sm:block'>
          <p className='mb-4 px-3'>
            Selecciona el parqueadero que te mejor se a lo que necesitas.
          </p>
          <ScrollArea className='h-[620px]'>
            {filteredParkingLots.length !== 0 ? (
              <div className='grid grid-cols-3 gap-2 pr-3'>
                {filteredParkingLots.map((parkingItem) => (
                  <ParkingItem
                    key={parkingItem.id}
                    parkingData={parkingItem}
                    setSelectedParkingLot={setSelectedParkingLot}
                    isSelected={parkingItem.id === selectedParkingLot?.id}
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

        <div className='sm:col-span-5'>
          <div className='relative'>
            <Drawer>
              <DrawerTrigger>
                opem
                {/* <FloatingButton text='VER PARQUEADEROS' direction='left' /> */}
              </DrawerTrigger>
              <DrawerContent className='px-6'>
                <DrawerHeader>
                  <DrawerTitle>
                    <p className='tracking-widest'>PARQUEADEROS</p>
                  </DrawerTitle>
                  <DrawerDescription>
                    <p className=''>
                      Selecciona el parqueadero que te mejor se a lo que
                      necesitas.
                    </p>
                  </DrawerDescription>
                </DrawerHeader>
                <div>
                  <ScrollArea>
                    {filteredParkingLots.length !== 0 ? (
                      <div className='flex flex-row gap-2 pr-3'>
                        {filteredParkingLots.map((parkingItem) => (
                          <ParkingItem
                            key={parkingItem.id}
                            parkingData={parkingItem}
                            setSelectedParkingLot={setSelectedParkingLot}
                            isSelected={
                              parkingItem.id === selectedParkingLot?.id
                            }
                          />
                        ))}
                        {filteredParkingLots.map((parkingItem) => (
                          <ParkingItem
                            key={parkingItem.id}
                            parkingData={parkingItem}
                            setSelectedParkingLot={setSelectedParkingLot}
                            isSelected={
                              parkingItem.id === selectedParkingLot?.id
                            }
                          />
                        ))}
                        {filteredParkingLots.map((parkingItem) => (
                          <ParkingItem
                            key={parkingItem.id}
                            parkingData={parkingItem}
                            setSelectedParkingLot={setSelectedParkingLot}
                            isSelected={
                              parkingItem.id === selectedParkingLot?.id
                            }
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
                    <ScrollBar orientation='horizontal' />
                  </ScrollArea>
                </div>
                <DrawerFooter>
                  <Button>Submit</Button>
                  <DrawerClose>
                    <Button variant='outline'>Cancel</Button>
                  </DrawerClose>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          </div>
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
