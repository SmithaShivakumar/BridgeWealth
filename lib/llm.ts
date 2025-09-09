export async function generateInsightsFromLLM(client: any, data: any): Promise<string> {
  try {
    const response = await fetch('/api/llm-insight', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ client, data }),
    })
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || 'LLM request failed')
    }
    const result = await response.json()
    return result.insight as string
  } catch (err: any) {
    // Log error for debugging
    console.error('LLM fetch error:', err)
    throw err
  }
}