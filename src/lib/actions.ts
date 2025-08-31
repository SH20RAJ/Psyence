'use server'

import { streamText } from 'ai'
import { openai } from '@ai-sdk/openai'

const CLOUDFLARE_ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID!
const CLOUDFLARE_API_TOKEN = process.env.CLOUDFLARE_AUTORAG_API_TOKEN!

interface SearchResult {
  content: string
  metadata?: {
    source?: string
    title?: string
  }
}

async function searchRAG(query: string): Promise<SearchResult[]> {
  const response = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${CLOUDFLARE_ACCOUNT_ID}/autorag/rags/psyence/search`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${CLOUDFLARE_API_TOKEN}`,
      },
      body: JSON.stringify({ query }),
    }
  )

  if (!response.ok) {
    throw new Error(`RAG search failed: ${response.statusText}`)
  }

  const data = await response.json()
  return data.result?.documents || []
}

export async function chat(messages: any[]) {
  const lastMessage = messages[messages.length - 1]
  
  // Search RAG for relevant context
  const searchResults = await searchRAG(lastMessage.content)
  
  // Build context from search results
  const context = searchResults
    .map(result => `Source: ${result.metadata?.title || 'Unknown'}\n${result.content}`)
    .join('\n\n---\n\n')

  const systemPrompt = `You are Psyence, a psychology-powered copilot for human interaction. You help with:
- Flirting & dating (respectful approaches, handling rejection)
- Leadership & communication (speak like a CEO, motivate teams)  
- Self-improvement (habits, mindset, productivity, stoicism)
- Humor & wit (light teasing, comebacks, banter)
- Negotiation & persuasion (influence ethically, set boundaries)
- Everyday psychology (confidence, charisma, relationships)

Use the following context from psychology research and playbooks to answer:

${context}

Be practical, actionable, and cite your sources when relevant.`

  return streamText({
    model: openai('gpt-4'),
    messages: [
      { role: 'system', content: systemPrompt },
      ...messages,
    ],
  })
}
