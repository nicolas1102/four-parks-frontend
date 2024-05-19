import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

const reservationsPerMonth = [
  {
    mes: 'Enero',
    reservas: 30,
  },
  {
    mes: 'Febrero',
    reservas: 23,
  },
  {
    mes: 'Marzo',
    reservas: 40,
  },
  {
    mes: 'Abril',
    reservas: 20,
  },
  {
    mes: 'Mayo',
    reservas: 10,
  },
  {
    mes: 'Junio',
    reservas: 23,
  },
  {
    mes: 'Julio',
    reservas: 43,
  },
]

export function ReservationsPerMonthBarChart() {
  return (
    <Card className='' x-chunk='dashboard-01-chunk-4'>
      <CardHeader className='flex flex-row items-center'>
        <div className='grid gap-2'>
          <CardTitle>Reservas</CardTitle>
          <CardDescription>
            Cantidad de reservas por mes reciente.
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className='h-[400px]'>
        <ResponsiveContainer width='100%' height='100%'>
          <BarChart
            width={500}
            height={300}
            data={reservationsPerMonth}
            margin={{
              // top: 5,
              // right: 5,
              left: -32,
              // bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='mes' />
            <YAxis />
            <Tooltip
              wrapperStyle={{ backgroundColor: '#ccc', color: 'black' }}
            />
            <Bar
              dataKey='reservas'
              // fill='#82ca9d'
              className='fill-yellowFPC-400'
              activeBar={<Rectangle fill='gold' stroke='blue' />}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
