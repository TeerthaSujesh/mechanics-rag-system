import React from 'react'
import TitleBlock from './components/TitleBlock'
import Workbench from './components/Workbench'

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <TitleBlock />
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 pb-16">
        <Workbench />
      </main>
      <footer className="text-center text-xs text-graphite dark:text-graphiteDark font-mono py-6 space-y-1">
        <div>Grounded in retrieved worked solutions — chapter 6, friction only.</div>
        <div className="tracking-wide">
          Powered by React • FastAPI • ChromaDB • Ollama • Llama 3.1
        </div>
      </footer>
    </div>
  )
}
