import React from 'react'
import Header from '../components/Header'
import ChatBox from '../components/ChatBox'

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <Header />

        <main className="mt-8">
          <ChatBox />
        </main>
      </div>
    </div>
  )
}
