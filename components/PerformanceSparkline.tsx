import React from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

const demoSeries = [
  { date: '2024-07-01', portfolio: 100, benchmark: 100 },
  { date: '2024-10-01', portfolio: 103, benchmark: 102 },
  { date: '2025-01-01', portfolio: 101, benchmark: 100 },
  { date: '2025-04-01', portfolio: 106, benchmark: 104 },
]

const PerformanceSparkline: React.FC<{ timeseries?: any }> = ({ timeseries }) => {
  // Use demoSeries if no timeseries provided
  const data =
    timeseries?.portfolioIndex?.map((v: [string, number], i: number) => ({
      date: v[0],
      portfolio: v[1],
      benchmark: timeseries.benchmark?.[i]?.[1] ?? v[1],
    })) ?? demoSeries

  return (
    <div className="bg-white rounded-lg shadow-soft p-4">
      <h4 className="font-bold text-deep-blue mb-2">Performance Sparkline</h4>
      <ResponsiveContainer width="100%" height={180}>
        <LineChart data={data}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="portfolio" stroke="#0B3A6E" dot={false} />
          <Line type="monotone" dataKey="benchmark" stroke="#6B4EFF" dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default PerformanceSparkline