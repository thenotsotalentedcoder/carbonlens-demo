'use client'

import { useState, useRef, useEffect } from 'react'
import { Header } from '@/components/layout/header'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { mockChatHistory, sampleChatResponses } from '@/lib/data/mock-insights'
import {
  PaperPlaneTilt,
  Robot,
  User,
  Sparkle,
  Buildings,
  Lightning,
  GitBranch,
  Factory,
  GlobeSimple,
} from '@phosphor-icons/react'
import { cn } from '@/lib/utils'
import type { ChatMessage } from '@/lib/types'

// PRD Section 5.10 — exact required suggested queries
const suggestedQuestions = [
  { text: 'Which department had the highest emissions this semester?', icon: Buildings, key: 'department emissions' },
  { text: 'How has our electricity consumption changed compared to last year?', icon: Lightning, key: 'electricity comparison' },
  { text: 'What percentage of our footprint is Scope 3?', icon: GitBranch, key: 'scope 3 percentage' },
  { text: 'Which buildings are driving our generator fuel use?', icon: Factory, key: 'generator fuel' },
]

export default function ChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>(mockChatHistory)
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [language, setLanguage] = useState<'en' | 'ur'>('en')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const generateResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase()

    // Match PRD exact suggested queries first
    if (lowerQuery.includes('department') && (lowerQuery.includes('highest') || lowerQuery.includes('emission'))) {
      return sampleChatResponses['department emissions']
    }
    if (lowerQuery.includes('electricity') && (lowerQuery.includes('changed') || lowerQuery.includes('comparison') || lowerQuery.includes('last year'))) {
      return sampleChatResponses['electricity comparison']
    }
    if (lowerQuery.includes('percentage') && lowerQuery.includes('scope 3')) {
      return sampleChatResponses['scope 3 percentage']
    }
    if (lowerQuery.includes('generator') || lowerQuery.includes('fuel use') || lowerQuery.includes('building')) {
      return sampleChatResponses['generator fuel']
    }
    // Fallback matches
    if (lowerQuery.includes('electricity') || lowerQuery.includes('power')) {
      return sampleChatResponses['electricity']
    }
    if (lowerQuery.includes('reduce') || lowerQuery.includes('reduction') || lowerQuery.includes('lower')) {
      return sampleChatResponses['reduce']
    }
    if (lowerQuery.includes('scope 3') || lowerQuery.includes('value chain')) {
      return sampleChatResponses['scope 3']
    }
    if (lowerQuery.includes('methodology') || lowerQuery.includes('calculation')) {
      return sampleChatResponses['methodology']
    }
    if (lowerQuery.includes('uncertainty') || lowerQuery.includes('confidence')) {
      return sampleChatResponses['uncertainty']
    }

    return `Based on your FY2024-25 emissions data for NovaTech University:\n\n**Total Emissions:** 23,100 tCO2e\n- Scope 1: 2,400 tCO2e (10.4%)\n- Scope 2: 8,200 tCO2e (35.5%)\n- Scope 3: 12,500 tCO2e (54.1%)\n\n**Intensity Metrics:**\n- Per student: 1.54 tCO2e\n- Per floor area: 0.051 tCO2e/m²\n\nYour emissions are 14% below the regional university average. Would you like me to explain any specific area in more detail?`
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      role: 'user',
      content: input,
      timestamp: new Date().toISOString(),
      language,
    }

    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    setTimeout(() => {
      const response: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        role: 'assistant',
        content: generateResponse(input),
        timestamp: new Date().toISOString(),
        language,
      }
      setMessages((prev) => [...prev, response])
      setIsLoading(false)
    }, 1500)
  }

  const handleSuggestion = (question: string) => {
    setInput(question)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header
        title="Ask AI"
        description="Query your emissions data in natural language"
      />
      {/* Language toggle bar */}
      <div className="flex items-center justify-between px-6 py-2 bg-muted/40 border-b border-border">
        <p className="text-xs text-muted-foreground">
          <GlobeSimple className="w-3.5 h-3.5 inline mr-1 mb-0.5" />
          Responding in: <span className="font-semibold text-foreground">{language === 'en' ? 'English' : 'اردو'}</span>
        </p>
        <div className="flex items-center gap-1 bg-background border border-border rounded p-0.5">
          <button
            onClick={() => setLanguage('en')}
            className={cn(
              'px-3 py-1 text-xs rounded font-medium transition-colors',
              language === 'en' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
            )}
          >
            EN
          </button>
          <button
            onClick={() => setLanguage('ur')}
            className={cn(
              'px-3 py-1 text-xs rounded font-medium transition-colors',
              language === 'ur' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
            )}
          >
            UR
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col p-6">
        <div className="flex-1 max-w-4xl mx-auto w-full flex flex-col">
          {/* Chat Messages */}
          <Card className="flex-1 border-border mb-4 overflow-hidden">
            <CardContent className="p-0 h-[calc(100vh-320px)] overflow-y-auto scrollbar-thin">
              <div className="p-4 space-y-4">
                {messages.length === 0 ? (
                  <div className="text-center py-12">
                    <Sparkle className="w-12 h-12 text-primary mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-foreground mb-2">
                      Ask about your emissions
                    </h3>
                    <p className="text-sm text-muted-foreground max-w-md mx-auto">
                      I can help you understand your carbon footprint, identify reduction opportunities, 
                      and explain methodology. Try one of the suggestions below!
                    </p>
                  </div>
                ) : (
                  messages.map((message) => (
                    <div
                      key={message.id}
                      className={cn(
                        'flex gap-3',
                        message.role === 'user' && 'flex-row-reverse'
                      )}
                    >
                      <div
                        className={cn(
                          'w-8 h-8 rounded flex items-center justify-center flex-shrink-0',
                          message.role === 'assistant' ? 'bg-primary' : 'bg-muted'
                        )}
                      >
                        {message.role === 'assistant' ? (
                          <Robot className="w-5 h-5 text-primary-foreground" />
                        ) : (
                          <User className="w-5 h-5 text-muted-foreground" />
                        )}
                      </div>
                      <div
                        className={cn(
                          'max-w-[80%] rounded p-3',
                          message.role === 'assistant'
                            ? 'bg-muted'
                            : 'bg-primary text-primary-foreground'
                        )}
                      >
                        <div
                          className={cn(
                            'text-sm whitespace-pre-wrap',
                            message.role === 'assistant' ? 'text-foreground' : 'text-primary-foreground'
                          )}
                        >
                          {message.content.split('\n').map((line, i) => {
                            // Handle markdown-style bold
                            const parts = line.split(/(\*\*[^*]+\*\*)/g)
                            return (
                              <p key={i} className={i > 0 ? 'mt-2' : ''}>
                                {parts.map((part, j) => {
                                  if (part.startsWith('**') && part.endsWith('**')) {
                                    return <strong key={j}>{part.slice(2, -2)}</strong>
                                  }
                                  return part
                                })}
                              </p>
                            )
                          })}
                        </div>
                        {message.role === 'assistant' && (
                          <p className="text-[10px] text-muted-foreground mt-2">
                            Based on FY2024-25 data - Confidence: High
                          </p>
                        )}
                      </div>
                    </div>
                  ))
                )}
                {isLoading && (
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded bg-primary flex items-center justify-center">
                      <Robot className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <div className="bg-muted rounded p-3">
                      <div className="flex items-center gap-2">
                        <Sparkle className="w-4 h-4 text-primary animate-pulse" />
                        <span className="text-sm text-muted-foreground">Analyzing your data...</span>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </CardContent>
          </Card>

          {/* Suggested Questions — always visible */}
          <div className="mb-4">
            <p className="text-xs text-muted-foreground mb-2">Suggested questions:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {suggestedQuestions.map((q) => (
                <button
                  key={q.text}
                  onClick={() => handleSuggestion(q.text)}
                  className="flex items-start gap-2 px-3 py-2.5 text-sm bg-muted hover:bg-muted/80 rounded border border-border transition-colors text-left"
                >
                  <q.icon className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-foreground leading-snug">{q.text}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Input Form */}
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={language === 'en' ? 'Ask about your emissions data...' : 'اپنے اخراج کے بارے میں پوچھیں...'}
              className="flex-1"
              disabled={isLoading}
              dir={language === 'ur' ? 'rtl' : 'ltr'}
            />
            <Button type="submit" disabled={!input.trim() || isLoading}>
              <PaperPlaneTilt className="w-5 h-5" weight="fill" />
            </Button>
          </form>

          <p className="text-[10px] text-muted-foreground text-center mt-2">
            AI responses are based on your uploaded emissions data and may include estimates. 
            Always verify critical figures with source documents.
          </p>
        </div>
      </div>
    </div>
  )
}
