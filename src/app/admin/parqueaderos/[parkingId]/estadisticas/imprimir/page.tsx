
import React, { useState, useRef } from 'react'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import { ReservationsPerMonthBarChart } from '../_components/ReservationsPerMonthBarChart'

const page = () => {
  const [isPrinting, setIsPrinting] = useState(false)
  const printRef = useRef(null)

  const handlePrintClick = async () => {
    setIsPrinting(true)

    // Generate PDF using html2canvas and jsPDF
    const chartElement = printRef.current
    const canvas = await html2canvas(chartElement)
    const imgData = canvas.toDataURL('image/png')

    const doc = new jsPDF()
    doc.addImage(imgData, 'PNG', 10, 10) // Adjust image placement as needed
    const pdfData = doc.output('blob') // Get PDF data

    // Trigger download or preview based on user preference (optional)
    if (window.confirm('Do you want to download the PDF?')) {
      const link = document.createElement('a')
      link.href = URL.createObjectURL(pdfData)
      link.download = 'reservations_per_month.pdf'
      link.click()
    } else {
      // Open PDF in a new tab for preview (example)
      const newTab = window.open()
      newTab.location.href = URL.createObjectURL(pdfData)
    }

    setIsPrinting(false)
  }

  const { printTrigger } = usePrintProvider() // Get print trigger from react-to-print

  return (
    <div ref={printRef}>
      <ReservationsPerMonthBarChart /> {/* Render your chart component */}
      <button onClick={handlePrintClick} disabled={isPrinting}>
        {isPrinting ? 'Generating PDF...' : 'Print PDF'}
      </button>
      <Print ref={printRef} trigger={printTrigger}>
        {/* Nothing to render here, just trigger printing when activated */}
      </Print>
    </div>
  )
}

export default ReservationsPerMonthPDF
