import React, { useRef, useState, useEffect } from 'react'
import MessageBubble from './MessageBubble'
import Composer from './Composer'
import ReferenceCard from './ReferenceCard'
import { askQuestion, ApiError } from '../api'

const STARTER = {
  id: 'starter',
  role: 'system',
  text: "Describe the friction problem you're stuck on — geometry, what's given, and what you need to find.",
}

const LOADING_STAGES = {
  retrieve: 'Retrieving handwritten solution…',
  generate: 'Generating AI explanation…',
}

export default function Workbench() {
  const [messages, setMessages] = useState([STARTER])
  const [reference, setReference] = useState(null)
  const [status, setStatus] = useState('idle')
  const [loadingStage, setLoadingStage] = useState('retrieve')
  const scrollRef = useRef(null)
  const stageTimeoutRef = useRef(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, status])

  useEffect(() => () => clearTimeout(stageTimeoutRef.current), [])

  async function handleSend(question) {
    const userMsg = { id: `${Date.now()}-u`, role: 'user', text: question }
    setMessages((m) => [...m, userMsg])
    setStatus('thinking')
    setLoadingStage('retrieve')
    stageTimeoutRef.current = setTimeout(() => setLoadingStage('generate'), 1100)

    try {
      const res = await askQuestion(question)

      if (!res.success) {
        setMessages((m) => [
          ...m,
          {
            id: `${Date.now()}-a`,
            role: 'system',
            text: res.message || 'No matching problem found in the dataset yet.',
          },
        ])
        setReference(null)
      } else {
        setMessages((m) => [
          ...m,
          { id: `${Date.now()}-a`, role: 'tutor', text: res.answer },
        ])
        setReference(res)
      }
      clearTimeout(stageTimeoutRef.current)
      setStatus('idle')
    } catch (err) {
      clearTimeout(stageTimeoutRef.current)
      setMessages((m) => [
        ...m,
        {
          id: `${Date.now()}-e`,
          role: 'system',
          text: err instanceof ApiError ? err.message : 'Something went wrong reaching the tutor.',
        },
      ])
      setStatus('error')
    }
  }

  return (
    <div className="mt-8 grid grid-cols-1 lg:grid-cols-5 gap-6 items-start">
      <div className="lg:col-span-3 bg-card dark:bg-cardDark border-[3px] border-ink dark:border-inkDark rounded-2xl shadow-[5px_5px_0_0_#2B1220] dark:shadow-[5px_5px_0_0_#FFE9D6] flex flex-col h-[68vh] rotate-[0.4deg]">
        <div ref={scrollRef} className="chat-scroll flex-1 overflow-y-auto px-5 py-5 space-y-4">
          {messages.map((m) => (
            <MessageBubble key={m.id} role={m.role} text={m.text} />
          ))}
          {status === 'thinking' && (
            <MessageBubble role="tutor" thinking thinkingText={LOADING_STAGES[loadingStage]} />
          )}
        </div>
        <Composer onSend={handleSend} disabled={status === 'thinking'} />
      </div>

      <div className="lg:col-span-2 lg:sticky lg:top-6">
        <ReferenceCard key={reference?.matched_problem ?? 'empty'} reference={reference} />
      </div>
    </div>
  )
}
