import { NextResponse } from 'next/server'
import { OpenAI } from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(req: Request) {
  try {
    const { client, data } = await req.json()
    const prompt = `Generate actionable financial insights for the following client and their portfolio data:\nClient: ${JSON.stringify(client)}\nData: ${JSON.stringify(data)}`
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a financial advisor assistant.' },
        { role: 'user', content: prompt }
      ],
      max_tokens: 300,
      temperature: 0.7,
    })
    const insight = completion.choices[0]?.message?.content ?? 'No insight generated.'
    return NextResponse.json({ insight })
  } catch (error: any) {
    console.error('OpenAI API error:', error)
    return NextResponse.json({ insight: '', error: error.message || 'LLM error' }, { status: 500 })
  }
}   