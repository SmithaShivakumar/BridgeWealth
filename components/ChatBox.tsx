'use client'
import React, { useState } from 'react'

interface Message {
  sender: 'client' | 'assistant'
  text: string
}

const ChatBox: React.FC<{ clientId: string }> = ({ clientId }) => {
  const [messages, setMessages] = useState<Message[]>([
    { sender: 'assistant', text: 'Welcome! How can I help you with your finances today?' }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSend = async () => {
    if (!input.trim()) return
    setMessages([...messages, { sender: 'client', text: input }])
    setLoading(true)
    setError(null)
    setInput('')

    try {
      const response = await fetch('/api/llm-insight', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ client: { clientId }, data: { message: input } }),
      })
      const result = await response.json()
      setMessages(msgs => [
        ...msgs,
        { sender: 'assistant', text: result.insight || 'No response.' }
      ])
    } catch (err: any) {
      setError('Failed to get response from assistant.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-soft p-4 flex flex-col h-[350px]">
      <div className="flex-1 overflow-y-auto mb-2">
        {messages.map((msg, idx) => (
          <div key={idx} className={msg.sender === 'client' ? 'text-right' : 'text-left'}>
            <span className={`inline-block px-3 py-2 rounded ${msg.sender === 'client' ? 'bg-accent-purple text-white' : 'bg-bg-light text-deep-blue'}`}>
              {msg.text}
            </span>
          </div>
        ))}
        {loading && <div className="text-gray-500">Assistant is typing...</div>}
        {error && <div className="text-red-600">{error}</div>}
      </div>
      <div className="flex gap-2">
        <input
          className="flex-1 border rounded px-2 py-1"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Type your message..."
          onKeyDown={e => e.key === 'Enter' && handleSend()}
          disabled={loading}
        />
        <button
          className="bg-accent-purple text-white px-4 py-2 rounded"
          onClick={handleSend}
          disabled={loading}
        >
          Send
        </button>
      </div>
    </div>
  )
}

export default ChatBox