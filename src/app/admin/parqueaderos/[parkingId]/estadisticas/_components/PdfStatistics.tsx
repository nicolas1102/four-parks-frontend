import { Document, Page, Text, Image, View } from '@react-pdf/renderer'
import { ReservationsPerMonthBarChart } from './ReservationsPerMonthBarChart'

export function PDFStatistics() {
  return (
    <Document>
      <Page>
        <View>
          <ReservationsPerMonthBarChart />
        </View>
      </Page>
    </Document>
  )
}
