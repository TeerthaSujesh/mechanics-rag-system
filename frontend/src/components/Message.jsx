import React from 'react'

export default function Message({ role = 'ai', text, time }) {
  const isUser = role === 'user'

  return (
    <div className={`w-full flex ${isUser ? 'justify-end' : 'justify-start'} mb-3`}> 
      <div
        className={`max-w-[80%] px-4 py-3 rounded-2xl shadow-sm text-sm leading-relaxed whitespace-pre-wrap ${
          isUser
            ? 'bg-blue-600 text-white rounded-br-none'
            : 'bg-white text-slate-800 rounded-bl-none border border-slate-100'
        }`}
      >
        <div>{text}</div>
        {time && <div className="text-[10px] opacity-60 mt-2 text-right">{time}</div>}
      </div>
    </div>
  )
}
