'use client'

import { UserLocationContext } from '@/context/UserLocationContext'
import { ParkingInterface } from '@/lib/interfaces/parking.interface'
import {
  GoogleMap,
  Marker,
  MarkerClustererF,
  MarkerF,
  OverlayView,
  useJsApiLoader,
} from '@react-google-maps/api'
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import ParkingLotItem from './ParkingLotItem'
import { useTheme } from 'next-themes'

const GoogleMapView = ({
  parkingLots,
  selectedParkingLot,
  setSelectedParkingLot,
}: {
  parkingLots: ParkingInterface[]
  selectedParkingLot: ParkingInterface | null
  setSelectedParkingLot: Dispatch<SetStateAction<ParkingInterface | null>>
}) => {
  const { userLocation, setUserLocation } = useContext(UserLocationContext)
  const containerStyle = {
    width: 'auto',
    height: '715px',
  }

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyAwkHB_VUjLdIlMH7ua8MCgimHf5bIJFF8',
  })

  const [map, setMap] = useState(null)

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={userLocation}
      zoom={13}
    >
      <MarkerF
        position={userLocation}
        icon={{
          url: '/map/circle-user-round.svg',
          scaledSize: {
            width: 40,
            height: 40,
            equals(other) {
              return true
            },
          },
        }}
      />
      {parkingLots.map((parkingLot) => (
        <MarkerF
          key={parkingLot.id}
          position={{ lat: parkingLot.lat, lng: parkingLot.lng }}
          icon={{
            url:
              parkingLot.id === selectedParkingLot?.id
                ? '/map/selected-parking-map-pin.svg'
                : '/map/parking-map-pin.svg',
            scaledSize: {
              width: 40,
              height: 40,
              equals(other) {
                return true
              },
            },
          }}
          onClick={() => setSelectedParkingLot(parkingLot)}
        >
          {selectedParkingLot?.id === parkingLot.id && (
            <OverlayView
              position={{ lat: parkingLot.lat, lng: parkingLot.lng }}
              mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
            >
              <div className='z-10 w-56 bg-background -ml-28 -mt-10 scale-75 hover:scale-[0.80] duration-300'>
                <ParkingLotItem
                  key={parkingLot.id}
                  {...parkingLot}
                  setSelectedParkingLot={setSelectedParkingLot}
                />
              </div>
            </OverlayView>
          )}
        </MarkerF>
      ))}
    </GoogleMap>
  ) : (
    <></>
  )
}

export default GoogleMapView
