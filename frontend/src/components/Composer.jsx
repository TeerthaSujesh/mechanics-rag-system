import React, { useState } from 'react'

export default function Composer({ onSend, disabled }) {
  const [text, setText] = useState('')

  function submit() {
    const trimmed = text.trim()
    if (!trimmed || disabled) return
    onSend(trimmed)
    setText('')
  }

  function onKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      submit()
    }
  }

  return (
    <div className="border-t-[3px] border-ink dark:border-inkDark px-4 py-3 flex items-end gap-3 bg-card dark:bg-cardDark rounded-b-2xl">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={onKeyDown}
        rows={1}
        placeholder="Ask your doubt here..."
        className="flex-1 resize-none bg-paper dark:bg-paperDark border-2 border-ink dark:border-inkDark rounded-xl px-3 py-2 text-sm text-ink dark:text-inkDark placeholder:text-graphite/70 dark:placeholder:text-graphiteDark/70 focus:outline-none focus:shadow-[3px_3px_0_0_#FF6B35]"
      />
      <button
        onClick={submit}
        disabled={disabled || text.trim() === ''}
        className={`shrink-0 px-4 py-2 rounded-xl text-sm font-bold font-display tracking-wide border-2 border-ink dark:border-inkDark transition-all active:translate-x-[2px] active:translate-y-[2px] active:shadow-none ${
          disabled || text.trim() === ''
            ? 'bg-blueprint/30 text-white/70 cursor-not-allowed shadow-none'
            : 'bg-blueprint dark:bg-blueprintSoft text-white dark:text-cardDark shadow-[3px_3px_0_0_#2B1220] dark:shadow-[3px_3px_0_0_#FFE9D6] hover:brightness-105'
        }`}
      >
        {disabled ? '···' : 'Solve Doubt'}
      </button>
    </div>
  )
}
