import {
  PieChart,
  Pie,
  Legend,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts'
import { PureComponent } from 'react'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

const data01 = [
  { tipo: 'Carro', valor: 156 },
  { tipo: 'Moto', valor: 232 },
  { tipo: 'Bicicleta', valor: 140 },
  { tipo: 'V. Pesado', valor: 54 },
]

const COLORS = ['#fde047', '#1865a2', '#c03131', '#6DB04E']

export function VehicleTypePieChart() {
  return (
    <Card className='' x-chunk='dashboard-01-chunk-4'>
      <CardHeader className='flex flex-row items-center'>
        <div className='grid gap-2'>
          <CardTitle>Tipo de Vehículo</CardTitle>
          <CardDescription>
            Cantidad de reservas por tipo de vehículo.
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className='h-[400px]'>
        <ResponsiveContainer width='100%' height='100%'>
          <PieChart width={400} height={400}>
            <Legend />
            <Pie
              dataKey='valor'
              isAnimationActive={true}
              data={data01}
              cx='50%'
              cy='50%'
              outerRadius={130}
              fill='#8884d8'
              label
            >
              {data01.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                  name={entry.tipo}
                />
              ))}
            </Pie>
            {/* <Pie
              dataKey='value'
              data={data02}
              cx={500}
              cy={200}
              innerRadius={40}
              outerRadius={80}
              fill='#82ca9d'
            /> */}
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
