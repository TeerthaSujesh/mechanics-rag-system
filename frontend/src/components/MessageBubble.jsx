import React from 'react'
import ReactMarkdown from 'react-markdown'

const markdownComponents = {
  p: ({ node, ...props }) => <p className="mb-2 last:mb-0" {...props} />,
  strong: ({ node, ...props }) => <strong className="font-bold text-ink dark:text-inkDark" {...props} />,
  ol: ({ node, ...props }) => <ol className="list-decimal ml-5 space-y-1 mb-2" {...props} />,
  ul: ({ node, ...props }) => <ul className="list-disc ml-5 space-y-1 mb-2" {...props} />,
  li: ({ node, ...props }) => <li {...props} />,
  code: ({ node, ...props }) => (
    <code className="font-mono text-xs bg-yellow-200 dark:bg-blueprintSoft/20 px-1 py-0.5 rounded" {...props} />
  ),
}

export default function MessageBubble({ role, text, thinking = false, thinkingText }) {
  if (role === 'system') {
    return (
      <div className="text-xs font-mono text-graphite dark:text-graphiteDark border-l-[3px] border-pencil dark:border-pencilSoft pl-3 py-1">
        {text}
      </div>
    )
  }

  const isUser = role === 'user'

  return (
    <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
      {!isUser && !thinking && (
        <div className="inline-flex items-center gap-1.5 text-[10px] tracking-wide text-ink dark:text-inkDark font-display font-bold mb-1.5 px-2.5 py-1 bg-yellow-300 border-2 border-ink rounded-full -rotate-1" style={{ backgroundColor: '#FFC93C' }}>
          AI EXPLANATION
        </div>
      )}
      <div
        className={`max-w-[85%] px-4 py-3 text-sm leading-relaxed border-[3px] border-ink dark:border-inkDark ${
          isUser
            ? 'bg-blueprint dark:bg-blueprintSoft text-white dark:text-cardDark whitespace-pre-wrap rounded-[16px_16px_4px_16px] shadow-[3px_3px_0_0_#2B1220] dark:shadow-[3px_3px_0_0_#FFE9D6]'
            : 'bg-card dark:bg-cardDark text-ink dark:text-inkDark rounded-[4px_16px_16px_16px] shadow-[3px_3px_0_0_#2B1220] dark:shadow-[3px_3px_0_0_#FFE9D6]'
        }`}
      >
        {thinking ? (
          <span className="inline-flex items-center gap-1 text-graphite dark:text-graphiteDark">
            <span className="w-1.5 h-1.5 rounded-full bg-blueprint dark:bg-blueprintSoft animate-bounce [animation-delay:-0.2s]" />
            <span className="w-1.5 h-1.5 rounded-full bg-blueprint dark:bg-blueprintSoft animate-bounce [animation-delay:-0.1s]" />
            <span className="w-1.5 h-1.5 rounded-full bg-blueprint dark:bg-blueprintSoft animate-bounce" />
            <span className="ml-1 text-xs font-mono">{thinkingText || 'working…'}</span>
          </span>
        ) : isUser ? (
          text
        ) : (
          <ReactMarkdown components={markdownComponents}>{text}</ReactMarkdown>
        )}
      </div>
    </div>
  )
}
