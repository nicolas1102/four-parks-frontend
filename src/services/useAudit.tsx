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
import {
  getAuditsByUserIdRequest,
  getAuditsRequest,
} from '@/app/api/routers/audits.router'
import {
  AuditInterface,
  DateRangeInterface,
} from '@/lib/interfaces/audit.interface'

interface AuditContextType {
  audits: AuditInterface[]
  setAudits: Dispatch<SetStateAction<AuditInterface[]>>
  isLoading: boolean
  setIsLoading: (isLoading: boolean) => void
  getAudits: (dateRange: DateRangeInterface) => Promise<void>
  getAuditsByUserId: (
    userId: number,
    dateRange: DateRangeInterface
  ) => Promise<void>
}

const AuditContext = createContext<AuditContextType | null>(null)

export const useAudit = () => {
  const context = useContext(AuditContext)
  if (!context) {
    throw new Error('useAudit must be used within a AuditProvider')
  }
  return context
}

export function AuditProvider({ children }: { children: ReactNode }) {
  const [audits, setAudits] = useState<AuditInterface[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const getAudits = async (dateRange: DateRangeInterface) => {
    setIsLoading(true)
    try {
      const res = await getAuditsRequest(dateRange)
      setAudits(res.data)
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
      console.error('Error fetching audits:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const getAuditsByUserId = async (
    userId: number,
    dateRange: DateRangeInterface
  ) => {
    try {
      setIsLoading(true)
      const res = await getAuditsByUserIdRequest(userId, dateRange)    
      setAudits(res.data)
    } catch (error: any) {
      if (error?.response?.data) {
        toast({
          variant: 'destructive',
          title:
            'Ha ocurrido un error al intentar obtener los datos de la reserva! Por favor intentalo más tarde.',
          description: error?.response.data,
        })
      } else {
        toast({
          variant: 'destructive',
          title: 'No se ha podido conectar con el servidor.',
          description: 'Intentalo más tarde.',
        })
      }
      console.error('Error fetching user:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuditContext.Provider
      value={{
        audits,
        setAudits,
        isLoading,
        setIsLoading,
        getAudits,
        getAuditsByUserId,
      }}
    >
      {children}
    </AuditContext.Provider>
  )
}
