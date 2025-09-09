'use client'
import { useStore } from '@/lib/store'
import React, { useState } from 'react'
import ExtractedDataCard from '@/components/ExtractedDataCard'
import UploadButton from '@/components/UploadButton'
import ChatBox from '@/components/ChatBox'
import { generateInsightsFromLLM } from '@/lib/llm'

export default function ClientDashboard() {
  const activeClientId = useStore((s) => s.activeClientId || 'alex-johnson')
  const client = useStore((s) => s.clients[activeClientId])
    const data = useStore((s) => s.data[activeClientId])
    const [showModal, setShowModal] = useState(false)
    const [llmLoading, setLlmLoading] = useState(false)
    const [llmInsight, setLlmInsight] = useState<string>('')
    const [llmError, setLlmError] = useState<string | null>(null)

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
      <h2 className="text-xl font-bold text-deep-blue mb-4">Client Dashboard</h2>
          <ChatBox clientId={activeClientId} />
          <UploadButton clientId={activeClientId} />
          {client && data && <ExtractedDataCard client={client} data={data} />}
          {/* Extracted Data */}
          {client && data && (
              <ExtractedDataCard client={client} data={data} />
          )}
          <button
              className="bg-success-green text-white px-4 py-2 rounded shadow-soft"
              onClick={handleGenerateInsight}
              disabled={llmLoading}
          >
              {llmLoading ? 'Generating...' : 'Generate Insight'}
          </button>
    </div>
  )
}