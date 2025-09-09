import React from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import type { ExtractedData } from '@/lib/types'

function getDebtData(data?: ExtractedData) {
  const bars: { name: string; value: number }[] = []
  if (!data || !data.accounts) return [{ name: 'No Debt', value: 0 }]
  if (data.accounts.loans) {
    data.accounts.loans.forEach(l =>
      bars.push({ name: l.type, value: l.balance })
    )
  }
  if (data.mortgage) {
    bars.push({ name: 'Mortgage', value: data.mortgage.balance })
  }
  return bars.length ? bars : [{ name: 'No Debt', value: 0 }]
}

const DebtBar: React.FC<{ data?: ExtractedData | undefined }> = ({ data }) => {
  const barData = getDebtData(data)
  return (
    <div className="bg-white rounded-lg shadow-soft p-4">
      <h4 className="font-bold text-deep-blue mb-2">Debt Bar</h4>
      <ResponsiveContainer width="100%" height={180}>
        <BarChart data={barData}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#00C389" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default DebtBar