'use client'
import React, { useState } from 'react'
import { useStore } from '@/lib/store'
import UploadButton from '@/components/UploadButton'
import ExtractedDataCard from '@/components/ExtractedDataCard'
import SearchBox from '@/components/SearchBox'
import ComplianceNotesTable from '@/components/ComplianceNotesTable'
import AddNoteModal from '@/components/AddNoteModal'
import AllocationPie from '@/components/AllocationPie'
import PerformanceSparkline from '@/components/PerformanceSparkline'
import DebtBar from '@/components/DebtBar'
import { generateInsightsFromLLM } from '@/lib/llm'

export default function AdvisorDashboard() {
  const activeClientId = useStore((s) => s.activeClientId || 'alex-johnson')
  const client = useStore((s) => s.clients[activeClientId])
  const data = useStore((s) => s.data[activeClientId])
  const notes = useStore((s) => s.complianceNotes?.[activeClientId] || [])
  const addNote = useStore((s) => s.actions?.addNote)
  const [showModal, setShowModal] = useState(false)
  const [llmLoading, setLlmLoading] = useState(false)
  const [llmInsight, setLlmInsight] = useState<string>('')
  const [llmError, setLlmError] = useState<string | null>(null)

  // Example filter state (expand as needed)
  const [accountType, setAccountType] = useState<string>('all')
  const [riskBand, setRiskBand] = useState<string>('all')

  const handleGenerateInsight = async () => {
    setLlmLoading(true)
    setLlmError(null)
    try {
      const insight = await generateInsightsFromLLM(client, data)
      setLlmInsight(insight)
      setShowModal(true)
    } catch (err: any) {
      setLlmInsight('')
      setLlmError(err.message || 'Failed to generate insight.')
      setShowModal(true)
    } finally {
      setLlmLoading(false)
    }
  }

  return (
    <div className="p-6 bg-bg-light min-h-screen">
      <h2 className="text-xl font-bold text-deep-blue mb-4">Advisor Dashboard</h2>
      {/* File Upload */}
      <UploadButton clientId={activeClientId} />

      {/* Extracted Data */}
      {client && data && (
        <ExtractedDataCard client={client} data={data} />
      )}

      {/* Portfolio Visualizations */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
        <AllocationPie data={data} />
        <PerformanceSparkline timeseries={useStore(s => s.timeseries[activeClientId])} />

              <DebtBar data={data} />
      </div>

      {/* Insights Portal */}
      <div className="bg-white rounded-lg shadow-soft p-4 my-8">
        <h3 className="font-bold text-deep-blue mb-4">Insights Builder</h3>
        <div className="flex gap-4 mb-4">
          <select
            className="border rounded px-2 py-1"
            value={accountType}
            onChange={e => setAccountType(e.target.value)}
          >
            <option value="all">All Accounts</option>
            <option value="401k">401(k)</option>
            <option value="brokerage">Brokerage</option>
            <option value="savings">Savings</option>
            <option value="loans">Loans</option>
          </select>
          <select
            className="border rounded px-2 py-1"
            value={riskBand}
            onChange={e => setRiskBand(e.target.value)}
          >
            <option value="all">All Risk Bands</option>
            <option value="low">Low</option>
            <option value="moderate">Moderate</option>
            <option value="high">High</option>
          </select>
        </div>
        {/* InsightsBox would show rule-engine insights */}
        <div className="bg-bg-light rounded p-4 mb-4">
          <h4 className="font-semibold mb-2">Key Insights</h4>
          <ul className="list-disc ml-6 text-sm text-gray-700">
            <li>Increase 401(k) by 2% to capture full employer match (~$1,560/yr).</li>
            <li>High fee fund detected; consider lower-cost alternative.</li>
            <li>Portfolio concentration risk in AAPL.</li>
            <li>Add $6,800 to savings to reach 6 months runway.</li>
            <li>Refi could save ~$3.5k/yr (mock).</li>
            <li>Plan for vest tax impact; consider pre-tax deferrals & diversify.</li>
          </ul>
        </div>
        <button
          className="bg-success-green text-white px-4 py-2 rounded shadow-soft"
          onClick={handleGenerateInsight}
          disabled={llmLoading}
        >
          {llmLoading ? 'Generating...' : 'Generate Insight & Add Compliance Note'}
        </button>
        {llmError && (
          <div className="text-red-600 mt-2">{llmError}</div>
        )}
      </div>

      {/* Compliance Notes */}
      <div className="flex justify-between items-center mt-8">
        <h3 className="text-lg font-bold text-deep-blue">Compliance Notes</h3>
        <button
          className="bg-accent-purple text-white px-4 py-2 rounded shadow-soft"
          onClick={() => setShowModal(true)}
        >
          Add Note
        </button>
      </div>
      <ComplianceNotesTable notes={notes} />
      {showModal && (
        <AddNoteModal
          initialText={llmInsight}
          onAdd={note => addNote && addNote(activeClientId, note)}
          onClose={() => {
            setShowModal(false)
            setLlmInsight('')
          }}
        />
      )}

      {/* Search/Query */}
      <SearchBox clientId={activeClientId} />
    </div>
  )
}