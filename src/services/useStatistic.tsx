'use client'

import { createContext, ReactNode, useContext, useState } from 'react'
import { DateRangeInterface } from '@/lib/interfaces/statistic.interface'
import {
  getIncomesOnDateByParkingIdRequest,
  getNumberOfReservationsOnDateByParkingIdRequest,
  getNumberOfUsersOnDateByParkingRequest,
  getNumberOfUsersOnDateRequest,
  getVehicleTypeStatisticsByParkingIdRequest,
} from '@/app/api/routers/statistics.router'

interface StatisticContextType {
  isLoading: boolean
  setIsLoading: (isLoading: boolean) => void
  getVehicleTypeStatisticsOnDateByParkingId: (
    parkingId: number,
    dateRange: DateRangeInterface,
    vehicleType: number
  ) => Promise<number | undefined>
  getNumberOfReservationsOnDateByParkingId: (
    parkingId: number,
    dateRange: DateRangeInterface
  ) => Promise<number | undefined>
  getNumberOfUsersOnDate: (
    dateRange: DateRangeInterface
  ) => Promise<number | undefined>
  getNumberOfUsersOnDateByParkingId: (
    parkingId: number,
    dateRange: DateRangeInterface
  ) => Promise<number | undefined>
  getIncomesOnDateByParkingId: (
    parkingId: number,
    dateRange: DateRangeInterface
  ) => Promise<number | undefined>
}

const StatisticContext = createContext<StatisticContextType | null>(null)

export const useStatistic = () => {
  const context = useContext(StatisticContext)
  if (!context) {
    throw new Error('useStatistic must be used within a StatisticProvider')
  }
  return context
}

export function StatisticProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(false)

  const getVehicleTypeStatisticsOnDateByParkingId = async (
    parkingId: number,
    dateRange: DateRangeInterface,
    vehicleType: number
  ) => {
    setIsLoading(true)
    try {
      const res = await getVehicleTypeStatisticsByParkingIdRequest(
        parkingId,
        dateRange,
        vehicleType
      )
      return res.data as number
    } catch (error: any) {
      console.error('Error fetching VehicleTypeStatistics:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const getNumberOfReservationsOnDateByParkingId = async (
    parkingId: number,
    dateRange: DateRangeInterface
  ) => {
    setIsLoading(true)
    try {
      const res = await getNumberOfReservationsOnDateByParkingIdRequest(
        parkingId,
        dateRange
      )
      return res.data as number
    } catch (error: any) {
      console.error('Error fetching NumberOfReservationsOnDate:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const getNumberOfUsersOnDate = async (dateRange: DateRangeInterface) => {
    setIsLoading(true)
    try {
      const res = await getNumberOfUsersOnDateRequest(dateRange)
      console.log(res.data)

      return res.data.length as number
    } catch (error: any) {
      console.error('Error fetching NumberOfUsersOnDateByParkingId:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const getNumberOfUsersOnDateByParkingId = async (
    parkingId: number,
    dateRange: DateRangeInterface
  ) => {
    setIsLoading(true)
    try {
      const res = await getNumberOfUsersOnDateByParkingRequest(
        parkingId,
        dateRange
      )
      return res.data.length as number
    } catch (error: any) {
      console.error('Error fetching NumberOfUsersOnDateByParkingId:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const getIncomesOnDateByParkingId = async (
    parkingId: number,
    dateRange: DateRangeInterface
  ) => {
    setIsLoading(true)
    try {
      const res = await getIncomesOnDateByParkingIdRequest(parkingId, dateRange)
      return res.data.toFixed(2) as number
    } catch (error: any) {
      console.error('Error fetching IncomesOnDateByParkingId:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <StatisticContext.Provider
      value={{
        isLoading,
        setIsLoading,
        getVehicleTypeStatisticsOnDateByParkingId,
        getNumberOfReservationsOnDateByParkingId,
        getNumberOfUsersOnDate,
        getNumberOfUsersOnDateByParkingId,
        getIncomesOnDateByParkingId,
      }}
    >
      {children}
    </StatisticContext.Provider>
  )
}
