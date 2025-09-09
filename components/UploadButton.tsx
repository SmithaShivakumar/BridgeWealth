'use client'
import React, { useRef } from 'react'
import { useStore } from '@/lib/store'
import { z } from 'zod'
import clsx from 'clsx'

const fileSchema = z.object({
  name: z.string(),
  type: z.string(),
  size: z.number(),
})

export default function UploadButton({ clientId }: { clientId: string }) {
  const inputRef = useRef<HTMLInputElement>(null)
  const uploads = useStore((s) => s.uploads[clientId] || [])
    const addUpload = useStore((s) => s.actions.uploadAndParse)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return
    for (let i = 0; i < files.length; i++) {
      const file = files.item(i); // This is always File or null
      if (!file || !fileSchema.safeParse(file).success) continue;
      const reader = new FileReader();
      reader.onload = (ev) => {
        const text = ev.target?.result as string;
        addUpload(clientId, {
          name: file.name,
          type: file.type,
          size: file.size,
          status: 'parsed',
          content: text,
          uploadTime: Date.now(),
        });
      };
      reader.readAsText(file); // file is guaranteed to be File here
    }
    if (inputRef.current) inputRef.current.value = ''
  }

  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor="file-upload"
        className={clsx(
          'bg-accent-purple text-white px-4 py-2 rounded-lg shadow-soft cursor-pointer font-medium text-center'
        )}
      >
        Upload Document
      </label>
      <input    
        id="file-upload"
        ref={inputRef}
        type="file"
        accept=".pdf,.csv,.xlsx"
        multiple
        className="hidden"
        onChange={handleFileChange}
      />
      <div className="mt-2">
        {uploads.length > 0 && (
          <ul className="text-sm">
            {uploads.map((f, idx) => (
              <li key={idx} className="flex items-center gap-2">
                <span>{f.name}</span>
                <span className="text-xs text-success-green ml-2">Parsed</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}