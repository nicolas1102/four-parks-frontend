'use client'

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from 'react'
import { useToast } from '@/components/ui/use-toast'
import { getCitiesRequest } from '@/app/api/routers/cities.router'
import { CityInterface } from '@/lib/interfaces/city.interface'

interface CityContextType {
  cities: CityInterface[]
  setCities: Dispatch<SetStateAction<CityInterface[]>>
  isLoading: boolean
  setIsLoading: (isLoading: boolean) => void
  getCities: () => Promise<void>
}

const CityContext = createContext<CityContextType | null>(null)

export const useCity = () => {
  const context = useContext(CityContext)
  if (!context) {
    throw new Error('useCity must be used within a CityProvider')
  }
  return context
}

export function CityProvider({ children }: { children: ReactNode }) {
  const [cities, setCities] = useState<CityInterface[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const getCities = async () => {
    setIsLoading(true)
    try {
      const res = await getCitiesRequest()
      setCities(res.data)
    } catch (error: any) {
      if (error?.response?.data) {
        toast({
          variant: 'destructive',
          title:
            'Ha ocurrido un error al intentar obtener las ciudades! Por favor intentalo más tarde.',
          description: error?.response.data,
        })
      } else {
        toast({
          variant: 'destructive',
          title: 'No se ha podido conectar con el servidor.',
          description: 'Intentalo más tarde.',
        })
      }
      console.error('Error fetching cities:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <CityContext.Provider
      value={{
        cities,
        setCities,
        isLoading,
        setIsLoading,
        getCities,
      }}
    >
      {children}
    </CityContext.Provider>
  )
}
