import React, { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, Send } from 'lucide-react'

const WELCOME_MESSAGE = {
  role: 'assistant',
  content: "👋 Bonjour ! Je suis l'assistant IA de Sufyane. Posez-moi vos questions sur ses services, son parcours ou ses projets.",
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([WELCOME_MESSAGE])
  const [input, setInput] = useState('')
  const [isStreaming, setIsStreaming] = useState(false)
  const messagesEndRef = useRef(null)

  // Auto-scroll dès qu'un message arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isStreaming])

  async function handleSend() {
    const trimmed = input.trim()
    if (!trimmed || isStreaming) return
  
    // 1. Ajouter le message user à l'historique
    const userMessage = { role: 'user', content: trimmed }
    const updatedMessages = [...messages, userMessage]
    setMessages(updatedMessages)
    setInput('')
    setIsStreaming(true)
  
    // 2. Ajouter immédiatement une bulle assistant vide qu'on remplira au fil du stream
    setMessages((prev) => [...prev, { role: 'assistant', content: '' }])
  
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: updatedMessages }),
      })
  
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`)
      }
  
      // 3. Lire le stream SSE token par token
      const reader = response.body.getReader()
      const decoder = new TextDecoder()
      let buffer = ''
  
      while (true) {
        const { done, value } = await reader.read()
        if (done) break
  
        buffer += decoder.decode(value, { stream: true })
        const lines = buffer.split('\n\n')
        buffer = lines.pop() // garder la ligne incomplète
  
        for (const line of lines) {
          if (!line.startsWith('data: ')) continue
          const data = line.slice(6).trim()
          if (data === '[DONE]') continue
  
          try {
            const parsed = JSON.parse(data)
            if (parsed.token) {
              // 4. Append le token au dernier message assistant
              setMessages((prev) => {
                const next = [...prev]
                const lastIdx = next.length - 1
                next[lastIdx] = {
                  ...next[lastIdx],
                  content: next[lastIdx].content + parsed.token,
                }
                return next
              })
            }
            if (parsed.error) {
              throw new Error(parsed.error)
            }
          } catch (e) {
            console.error('[chat] Parse error:', e)
          }
        }
      }
    } catch (err) {
      console.error('[chat] Send error:', err)
      setMessages((prev) => {
        const next = [...prev]
        next[next.length - 1] = {
          role: 'assistant',
          content: `⚠️ Désolé, une erreur est survenue : ${err.message}. Vous pouvez contacter Sufyane directement sur WhatsApp ou par email.`,
        }
        return next
      })
    } finally {
      setIsStreaming(false)
    }
  }
  

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <>
      {/* === LA FENÊTRE === */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 left-6 sm:left-auto sm:w-96 h-[600px] max-h-[calc(100vh-7rem)] z-40 flex flex-col bg-white dark:bg-[var(--color-dark-surface)] rounded-2xl shadow-2xl border border-gray-200 dark:border-[var(--color-dark-border)] overflow-hidden">

          {/* Header */}
          <div className="flex items-center gap-3 px-4 py-3 bg-[var(--color-warm)] text-white shrink-0">
            <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <div className="font-bold text-sm">Assistant Sufyane</div>
              <div className="text-xs opacity-90">Posez-moi vos questions</div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 bg-[var(--color-light-surface)] dark:bg-[var(--color-dark)] space-y-3">
            {messages.map((msg, i) => (
              <MessageBubble key={i} message={msg} />
            ))}
            {isStreaming && <TypingIndicator />}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 border-t border-gray-200 dark:border-[var(--color-dark-border)] bg-white dark:bg-[var(--color-dark-surface)] shrink-0">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isStreaming}
                placeholder="Posez votre question..."
                className="flex-1 px-3 py-2 rounded-xl bg-gray-100 dark:bg-[var(--color-dark)] text-sm text-[var(--color-text-dark)] dark:text-[var(--color-text-light)] focus:outline-none focus:ring-2 focus:ring-[var(--color-warm)] border-0 disabled:opacity-50"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isStreaming}
                aria-label="Envoyer"
                className="w-10 h-10 p-0 border-0 rounded-xl bg-[var(--color-warm)] hover:bg-[#EA9309] disabled:opacity-50 disabled:cursor-not-allowed text-white flex items-center justify-center transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      )}

      {/* === BOUTON FLOTTANT === */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? 'Fermer le chat' : 'Ouvrir le chat'}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 p-0 border-0 rounded-full bg-[var(--color-warm)] hover:bg-[#EA9309] text-white shadow-xl flex items-center justify-center transition-transform hover:scale-110"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>
    </>
  )
}

/* ============================================
   SOUS-COMPOSANTS
   ============================================ */

function MessageBubble({ message }) {
  const isUser = message.role === 'user'

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[85%] px-3 py-2 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
          isUser
            ? 'bg-[var(--color-warm)] text-white rounded-br-sm'
            : 'bg-white dark:bg-[var(--color-dark-surface)] text-[var(--color-text-dark)] dark:text-[var(--color-text-light)] border border-gray-200 dark:border-[var(--color-dark-border)] rounded-bl-sm'
        }`}
      >
        {message.content}
      </div>
    </div>
  )
}

function TypingIndicator() {
  return (
    <div className="flex justify-start">
      <div className="bg-white dark:bg-[var(--color-dark-surface)] border border-gray-200 dark:border-[var(--color-dark-border)] rounded-2xl rounded-bl-sm px-4 py-2.5">
        <div className="flex gap-1">
          <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce [animation-delay:-0.3s]" />
          <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce [animation-delay:-0.15s]" />
          <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" />
        </div>
      </div>
    </div>
  )
}
