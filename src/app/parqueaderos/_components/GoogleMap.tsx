'use client'

import { UserLocationContext } from '@/context/UserLocationContext'
import { ParkingLotInterface } from '@/lib/interfaces/parkingLot.interface'
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
  useState,
} from 'react'
import ParkingLotItem from './ParkingLotItem'

const GoogleMapView = ({
  parkingLots,
  selectedParkingLot,
  setSelectedParkingLot,
}: {
  parkingLots: ParkingLotInterface[]
  selectedParkingLot: ParkingLotInterface | null
  setSelectedParkingLot: Dispatch<SetStateAction<ParkingLotInterface | null>>
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
      zoom={17}
    >
      <MarkerF
        position={userLocation}
        icon={{
          url: '/map/circle-user-round.svg',
          // TODO: Arreglar esta monda
          scaledSize: {
            width: 50,
            height: 50,
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
            // TODO: Arreglar esta monda
            scaledSize: {
              width: 50,
              height: 50,
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
              {/* <div className='absolute -left-14 -z-10 bg-background overflow-hidden text-ellipsis truncate p-1 border border-primary w-28 hover:scale-110'>
                <h2 className='uppercase tracking-widest text-center'>
                  {parkingLot.nombre}
                </h2>
              </div> */}
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
