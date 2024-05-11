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
      center={
        selectedParkingLot
          ? {
              lat: parseInt(selectedParkingLot.location.latitude),
              // lat: selectedParkingLot.location.latitude,
              lng: parseInt(selectedParkingLot.location.longitude),
              // lng: selectedParkingLot.location.longitude,
            }
          : userLocation
      }
      zoom={selectedParkingLot ? 17 : 13}
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
      {parkingLots.map((parkingItem) => (
        <MarkerF
          key={parkingItem.id}
          position={{
            lat: parseInt(parkingItem.location.latitude),
            // lat: parkingItem.location.latitude,
            lng: parseInt(parkingItem.location.longitude),
            // lng: parkingItem.location.longitude,
          }}
          icon={{
            url:
              parkingItem.id === selectedParkingLot?.id
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
          onClick={() => setSelectedParkingLot(parkingItem)}
        >
          {selectedParkingLot?.id === parkingItem.id && (
            <OverlayView
              position={{
                lat: parseInt(parkingItem.location.latitude),
                lng: parseInt(parkingItem.location.longitude),
              }}
              mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
            >
              <div className='z-10 w-56 bg-background -ml-[106px] -mt-6 scale-75 hover:scale-[0.80] duration-300'>
                <ParkingLotItem
                  key={parkingItem.id}
                  parkingData={parkingItem}
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
