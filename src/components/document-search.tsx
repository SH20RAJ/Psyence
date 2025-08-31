'use client'

import { useState } from 'react'
import { Search, BookOpen, FileText } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'

interface SearchResult {
  content: string
  metadata?: {
    source?: string
    title?: string
  }
}

export function DocumentSearch() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const handleSearch = async () => {
    if (!query.trim()) return
    
    setIsLoading(true)
    try {
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      })
      
      const data = await response.json()
      setResults(data.results || [])
    } catch (error) {
      console.error('Search failed:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search psychology documents..."
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        />
        <Button onClick={handleSearch} disabled={isLoading}>
          <Search className="w-4 h-4" />
        </Button>
      </div>

      {results.length > 0 && (
        <div className="space-y-4">
          <h3 className="font-semibold flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            Search Results ({results.length})
          </h3>
          
          {results.map((result, index) => (
            <div key={index} className="p-4 bg-white rounded-lg border">
              <div className="flex items-start justify-between mb-2">
                <Badge variant="secondary" className="flex items-center gap-1">
                  <FileText className="w-3 h-3" />
                  {result.metadata?.title || 'Document'}
                </Badge>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed">
                {result.content}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
