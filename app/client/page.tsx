'use client'
import { useStore } from '@/lib/store'
import ExtractedDataCard from '@/components/ExtractedDataCard'
import UploadButton from '@/components/UploadButton'
import ChatBox from '@/components/ChatBox'

export default function ClientDashboard() {
  const activeClientId = useStore((s) => s.activeClientId || 'alex-johnson')
  const client = useStore((s) => s.clients[activeClientId])
  const data = useStore((s) => s.data[activeClientId])

  return (
    <div className="p-6 bg-bg-light min-h-screen">
      <h2 className="text-xl font-bold text-deep-blue mb-4">Client Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ChatBox clientId={activeClientId} />
            <UploadButton clientId={activeClientId} />
            {client && data && <ExtractedDataCard client={client} data={data} />}
      </div>
    </div>
  )
}