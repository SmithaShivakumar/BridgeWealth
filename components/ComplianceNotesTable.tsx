import React from 'react'
import type { Note } from '@/lib/types'

const ComplianceNotesTable: React.FC<{ notes: Note[] }> = ({ notes }) => {
  if (!notes || notes.length === 0) return <div className="text-gray-500">No notes yet.</div>
  return (
    <table className="w-full bg-white rounded-lg shadow-soft my-4">
      {/* ...table content as previously implemented... */}
    </table>
  )
}

export default ComplianceNotesTable