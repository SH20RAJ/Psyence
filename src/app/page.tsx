'use client'

import { useChat } from 'ai/react'
import { Conversation } from '@/components/conversation'
import { PromptInput } from '@/components/prompt-input'
import { Brain, Sparkles, Search } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat()

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <Brain className="w-8 h-8 text-purple-600" />
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Psyence
                </h1>
              </div>
              <div className="flex items-center gap-1 px-3 py-1 bg-purple-100 rounded-full text-sm text-purple-700">
                <Sparkles className="w-4 h-4" />
                Psychology-Powered AI
              </div>
            </div>
            <Link href="/search">
              <Button variant="outline" size="sm">
                <Search className="w-4 h-4 mr-2" />
                Search Docs
              </Button>
            </Link>
          </div>
          <p className="text-gray-600 mt-2">
            Your copilot for charisma, communication, and human interaction
          </p>
        </div>
      </header>

      {/* Chat Area */}
      <div className="flex-1 overflow-hidden">
        <div className="max-w-4xl mx-auto h-full flex flex-col">
          {messages.length === 0 ? (
            <div className="flex-1 flex items-center justify-center p-8">
              <div className="text-center max-w-2xl">
                <Brain className="w-16 h-16 text-purple-400 mx-auto mb-6" />
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  Welcome to Psyence
                </h2>
                <p className="text-gray-600 mb-8">
                  Ask me anything about psychology, communication, relationships, leadership, or personal growth. 
                  I'm powered by research-backed insights and practical playbooks.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                  <div className="p-4 bg-white rounded-lg border border-purple-100">
                    <h3 className="font-medium text-purple-700 mb-2">💬 Communication</h3>
                    <p className="text-sm text-gray-600">Leadership, persuasion, difficult conversations</p>
                  </div>
                  <div className="p-4 bg-white rounded-lg border border-blue-100">
                    <h3 className="font-medium text-blue-700 mb-2">❤️ Relationships</h3>
                    <p className="text-sm text-gray-600">Dating, flirting, handling rejection</p>
                  </div>
                  <div className="p-4 bg-white rounded-lg border border-green-100">
                    <h3 className="font-medium text-green-700 mb-2">🚀 Self-Improvement</h3>
                    <p className="text-sm text-gray-600">Habits, confidence, productivity</p>
                  </div>
                  <div className="p-4 bg-white rounded-lg border border-orange-100">
                    <h3 className="font-medium text-orange-700 mb-2">😄 Social Skills</h3>
                    <p className="text-sm text-gray-600">Humor, wit, charisma, banter</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-1 overflow-auto p-4">
              <Conversation messages={messages} isLoading={isLoading} />
            </div>
          )}

          {/* Input Area */}
          <div className="border-t bg-white/80 backdrop-blur-sm p-4">
            <PromptInput
              input={input}
              handleInputChange={handleInputChange}
              handleSubmit={handleSubmit}
              isLoading={isLoading}
              placeholder="Ask about psychology, relationships, communication..."
            />
          </div>
        </div>
      </div>
    </div>
  )
}
