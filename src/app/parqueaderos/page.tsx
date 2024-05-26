'use client'

import { ParkingSquare } from 'lucide-react'
import { useEffect, useState } from 'react'
import { ScrollArea } from '@/components/ui/scroll-area'
import ParkingItem from './_components/ParkingItem'
import { ParkingInterface } from '@/lib/interfaces/parking.interface'
import GoogleMapView from './_components/GoogleMap'
import { Input } from '@/components/ui/input'
import { useParkingsFilters } from './_hooks/useParkingsFilters'
import { useParking } from '@/services/useParking'
import { CitySelect } from './_components/CitySelect'
import { ParkingTypeSelect } from './_components/ParkingTypeSelect'
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { Button } from '@/components/ui/button'
import Loader from '@/components/Loader'

export default function Home() {
  const {
    setFilterName,
    setFilterAddress,
    filterCity,
    setFilterCity,
    filterParkingType,
    setFilterParkingType,
    filteredParkingLots,
  } = useParkingsFilters()
  const { isLoading, getParkings } = useParking()

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
      <div className='py-2 px-2 border-b flex flex-row gap-3'>
        <h1 className='text-2xl tracking-widest sm:tracking-wide flex content-center gap-x-1 items-center'>
          <ParkingSquare size={35} />
          PARQUEADEROS
        </h1>
        <span className='border-l border-primary h-auto hidden sm:block'></span>
        <div className='sm:flex sm:flex-row gap-2 hidden'>
          <div className='w-32'>
            <Input
              onChange={(e) => {
                setFilterName(e.target.value)
              }}
              placeholder='Filtrar por nombre'
            />
          </div>
          <div className='w-32'>
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
        </div>
      </div>

      <div className='sm:grid sm:grid-cols-12 '>
        <div className='sm:col-span-7 px-4 py-5 hidden sm:block'>
          <p className='mb-4 text-center'>
            Encuentra tu parqueadero ideal. En la barra superior podrás filtrar
            los parqueaderos de{' '}
            <span className='font-semibold'>FourParksColombia</span>.
          </p>
          {isLoading ? (
            <Loader />
          ) : (
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
          )}
        </div>

        <div className='sm:col-span-5'>
          <div className='relative sm:hidden h-0'>
            <Drawer>
              <DrawerTrigger>
                <div>
                  <Button
                    className={
                      'tracking-widest dark:font-semibold border border-primary absolute top-[10px] z-10 left-3'
                    }
                    disabled={isLoading}
                  >
                    <p className='font-semibold'>BUSCAR PARQUEADEROS</p>
                  </Button>
                </div>
              </DrawerTrigger>
              <DrawerContent className='px-6'>
                <DrawerHeader>
                  <DrawerTitle>
                    <p className='tracking-widest'>PARQUEADEROS</p>
                  </DrawerTitle>
                  <DrawerDescription>
                    <p className=''>Encuentra tu parqueadero ideal.</p>
                  </DrawerDescription>
                </DrawerHeader>
                <h2 className='tracking-widest'>
                  <p className='tracking-widest text-center'>FILTROS</p>
                </h2>
                <div className='grid gap-2 justify-around grid-cols-2 py-3'>
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
                  <div>
                    <Input
                      onChange={(e) => {
                        setFilterName(e.target.value)
                      }}
                      placeholder='Nombre de parqueadero'
                    />
                  </div>
                  <div>
                    <Input
                      onChange={(e) => {
                        setFilterAddress(e.target.value)
                      }}
                      placeholder='Dirección de parqueadero'
                    />
                  </div>
                </div>
                <div className='py-2'>
                  <ScrollArea className='h-[320px]'>
                    {filteredParkingLots.length !== 0 ? (
                      <div className='grid gap-2 justify-around grid-cols-2 '>
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
                  </ScrollArea>
                </div>
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
