'use client'
import { useRouter } from 'next/navigation'
import { useStore } from '@/lib/store'
import clsx from 'clsx'

export default function RoleSelectPage() {
  const router = useRouter()
  const setRole = useStore((s) => s.setRole)

  const handleSelect = (role: 'advisor' | 'client') => {
    setRole(role)
    router.push(`/${role}`)
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-bg-light">
      <h1 className="text-2xl font-bold mb-6 text-deep-blue">MyChart for Financial Advisors</h1>
      <div className="flex gap-8">
        <button
          className={clsx(
            'px-6 py-4 rounded-lg shadow-soft bg-deep-blue text-white font-semibold hover:bg-blue-900 transition'
          )}
          onClick={() => handleSelect('advisor')}
        >
          Advisor Portal
        </button>
        <button
          className={clsx(
            'px-6 py-4 rounded-lg shadow-soft bg-success-green text-white font-semibold hover:bg-green-700 transition'
          )}
          onClick={() => handleSelect('client')}
        >
          Client Portal
        </button>
      </div>
    </main>
  )
}