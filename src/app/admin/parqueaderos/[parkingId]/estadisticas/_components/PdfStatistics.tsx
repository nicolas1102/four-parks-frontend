'use client'

import { Document, Page, Text, Image, View } from '@react-pdf/renderer'
import { ReservationsPerMonthBarChart } from './ReservationsPerMonthBarChart'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import { useRef } from 'react'

export function PDFStatistics() {
  
  const pdfRef = useRef<HTMLDivElement>(null)

  const downloadPDF = (parkingName: string) => {
    const input = pdfRef.current
    if (input) {
      html2canvas(input).then((canvas) => {
        const imgData = canvas.toDataURL('image/png')
        const pdf = new jsPDF('l', 'mm', 'a4', true)
        const pdfWidth = pdf.internal.pageSize.getWidth()
        const pdfHeight = pdf.internal.pageSize.getHeight()
        const imgWidth = canvas.width
        const imgHeight = canvas.height
        const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight)
        const imgX = (pdfWidth - imgWidth * ratio) / 2
        const imgY = 30

        // Add a small text at the top
        const fontSize = 12 // Adjust font size as needed
        const text = 'Título del PDF' // Replace with your desired text
        const textX = pdfWidth - pdf.getTextWidth(text) / 2 // Center text horizontally with some padding
        const textY = 15 // Adjust vertical position for the text

        pdf.setFont('Arial', 'bold', fontSize)
        pdf.setTextColor('black')
        pdf.text(text + '', textX, textY) // Add the text

        pdf.addImage(
          imgData,
          'PNG',
          imgX,
          imgY,
          imgWidth * ratio,
          imgHeight * ratio
        )
        pdf.save(`estadísticas_${parkingName}.pdf`)
      })
    }
  }

  return (
    <div>
      
    </div>
  )
}
