import React from 'react'
import ReactMarkdown from 'react-markdown'

const markdownComponents = {
  p: ({ node, ...props }) => <p className="mb-2 last:mb-0" {...props} />,
  strong: ({ node, ...props }) => <strong className="font-semibold text-ink dark:text-inkDark" {...props} />,
  ol: ({ node, ...props }) => <ol className="list-decimal ml-5 space-y-1 mb-2" {...props} />,
  ul: ({ node, ...props }) => <ul className="list-disc ml-5 space-y-1 mb-2" {...props} />,
  li: ({ node, ...props }) => <li {...props} />,
  code: ({ node, ...props }) => (
    <code className="font-mono text-xs bg-blueprint/10 dark:bg-blueprintSoft/10 px-1 py-0.5 rounded" {...props} />
  ),
}

export default function MessageBubble({ role, text, thinking = false, thinkingText }) {
  if (role === 'system') {
    return (
      <div className="text-xs font-mono text-graphite dark:text-graphiteDark border-l-2 border-blueprint/40 dark:border-blueprintSoft/40 pl-3 py-1">
        {text}
      </div>
    )
  }

  const isUser = role === 'user'

  return (
    <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
      {!isUser && !thinking && (
        <div className="text-[10px] tracking-widest text-graphite dark:text-graphiteDark font-mono mb-1 px-1">
          AI EXPLANATION
        </div>
      )}
      <div
        className={`max-w-[85%] rounded-sm px-4 py-3 text-sm leading-relaxed ${
          isUser
            ? 'bg-blueprint dark:bg-blueprintSoft text-white dark:text-cardDark whitespace-pre-wrap'
            : 'bg-paper dark:bg-paperDark border border-blueprint/20 dark:border-blueprintSoft/20 text-ink dark:text-inkDark'
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
