import React from 'react'
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import type { ExtractedData } from '@/lib/types'

const COLORS = ['#0B3A6E', '#00C389', '#6B4EFF', '#8884d8', '#82ca9d']

function getPieData(data?: ExtractedData) {
  const pie: { name: string; value: number }[] = []
  if (!data || !data.accounts) return [{ name: 'No Data', value: 1 }]
  if (data.accounts['401k']) {
    data.accounts['401k'].funds.forEach(f =>
      pie.push({ name: f.ticker, value: Math.round(f.weight * 100) })
    )
  }
  if (data.accounts.brokerage) {
    data.accounts.brokerage.holdings.forEach(h =>
      pie.push({ name: h.ticker, value: Math.round(h.weight * 100) })
    )
  }
  return pie.length ? pie : [{ name: 'No Data', value: 1 }]
}

const AllocationPie: React.FC<{ data: ExtractedData | undefined }> = ({ data }) => {
  const pieData = getPieData(data)
  return (
    <div className="bg-white rounded-lg shadow-soft p-4">
      <h4 className="font-bold text-deep-blue mb-2">Allocation Pie</h4>
      <ResponsiveContainer width="100%" height={180}>
        <PieChart>
          <Pie
            data={pieData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={60}
            label
          >
            {pieData.map((_, idx) => (
              <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

export default AllocationPie