import React from 'react'
import type { Client, ExtractedData } from '@/lib/types'
import clsx from 'clsx'

interface Props {
  client: Client
  data: ExtractedData
}

const ExtractedDataCard: React.FC<Props> = ({ client, data }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
    {/* ...card content as previously implemented... */}
    {/* Identity & Income */}
    <div className={clsx("bg-white rounded-lg shadow-soft p-4")}>
      <h3 className="font-bold text-deep-blue mb-2">Identity & Income</h3>
      <div><span className="font-semibold">Name:</span> {client.name}</div>
      <div><span className="font-semibold">Age:</span> {client.age}</div>
      <div><span className="font-semibold">Employer:</span> {client.employer}</div>
      <div><span className="font-semibold">Annual Income:</span> ${client.incomeAnnual.toLocaleString()}</div>
      <div><span className="font-semibold">Risk Tolerance:</span> {client.riskTolerance}</div>
    </div>
    {/* ...other cards... */}
  </div>
)

export default ExtractedDataCard