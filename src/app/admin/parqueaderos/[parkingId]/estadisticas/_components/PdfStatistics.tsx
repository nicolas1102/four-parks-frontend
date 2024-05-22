import { Document, Page, Text, Image, Canvas } from '@react-pdf/renderer'
import { ReservationsPerMonthBarChart } from './ReservationsPerMonthBarChart'

export function PDFStatistics() {
  return (
    <div>
      <ReservationsPerMonthBarChart />
    </div>
  )
}
