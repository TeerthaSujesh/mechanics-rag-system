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
    <div className="border-t border-blueprint/20 dark:border-blueprintSoft/20 px-4 py-3 flex items-end gap-3">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={onKeyDown}
        rows={1}
        placeholder="Ask your doubt here..."
        className="flex-1 resize-none bg-transparent px-2 py-2 text-sm text-ink dark:text-inkDark placeholder:tExampleext-graphite/70 dark:placeholder:text-graphiteDark/70 focus:outline-none"
      />
      <button
        onClick={submit}
        disabled={disabled || text.trim() === ''}
        className={`shrink-0 px-4 py-2 rounded-sm text-sm font-medium font-mono tracking-wide transition-colors ${
          disabled || text.trim() === ''
            ? 'bg-blueprint/25 text-white/70 cursor-not-allowed'
            : 'bg-blueprint dark:bg-blueprintSoft text-white dark:text-cardDark hover:bg-blueprintDark dark:hover:brightness-110'
        }`}
      >
        {disabled ? '···' : 'Solve Doubt'}
      </button>
    </div>
  )
}
