import React, { useState, useRef, useEffect } from 'react'
import Message from './Message'
import InputBar from './InputBar'
import LoadingSpinner from './LoadingSpinner'
import SolutionViewer from './SolutionViewer'
import { askQuestion } from '../services/api'

export default function ChatBox() {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)
  const [solution, setSolution] = useState(null)
  const scrollRef = useRef(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, loading])

  const handleSend = async (text) => {
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    const userMsg = { id: Date.now() + '-u', role: 'user', text, time: now }
    setMessages((s) => [...s, userMsg])

    setLoading(true)
    try {
      const res = await askQuestion(text)

      const aiMsg = { id: Date.now() + '-a', role: 'ai', text: res.answer, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
      setMessages((s) => [...s, aiMsg])
      setSolution({ problem_id: res.problem_id, confidence: res.confidence, image: res.image })
    } catch (err) {
      const errMsg = { id: Date.now() + '-e', role: 'ai', text: 'Sorry, something went wrong. Please try again.' }
      setMessages((s) => [...s, errMsg])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 flex flex-col h-[70vh] bg-transparent">
        <div className="flex-1 overflow-auto p-6 bg-white rounded-2xl shadow-sm border border-slate-100" ref={scrollRef}>
          {messages.length === 0 && (
            <div className="text-center text-slate-500 mt-10">Ask a question about statics to get started.</div>
          )}

          <div className="mt-2">
            {messages.map((m) => (
              <Message key={m.id} role={m.role} text={m.text} time={m.time} />
            ))}
          </div>
        </div>

        <div className="mt-4">
          <div className="max-w-4xl mx-auto">
            <InputBar onSend={handleSend} loading={loading} />
          </div>
        </div>
      </div>

      <div className="lg:col-span-1">
        <div className="sticky top-6">
          <SolutionViewer solution={solution} />
        </div>
      </div>
    </div>
  )
}
