import React, { useState, useEffect } from 'react'

const AddNoteModal: React.FC<{
  onAdd: (note: { text: string, includeDisclosure: boolean }) => void,
  onClose: () => void,
  initialText?: string
}> = ({ onAdd, onClose, initialText }) => {
  const [text, setText] = useState(initialText || '')
  const [includeDisclosure, setIncludeDisclosure] = useState(false)

  useEffect(() => {
    if (initialText) setText(initialText)
  }, [initialText])

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      {/* ...modal content as previously implemented... */}
    </div>
  )
}

export default AddNoteModal