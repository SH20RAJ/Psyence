import { chat } from '@/lib/actions'

export async function POST(req: Request) {
  const { messages } = await req.json()
  const result = await chat(messages)
  return result.toDataStreamResponse()
}
