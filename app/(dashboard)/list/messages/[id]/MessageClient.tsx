'use client'

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

type Message = {
  id: number
  text: string
  from: 'user' | 'other'
}

interface MessageClientProps {
  userId: string
}

export default function MessageClient({ userId }: MessageClientProps) {
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<Message[]>([])

  const sendMessage = () => {
    if (!input.trim()) return

    const newMessage: Message = {
      id: Date.now(),
      text: input.trim(),
      from: 'user'
    }

    setMessages(prev => [...prev, newMessage])
    setInput("")

    // Simulate reply
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          text: "This is an automated reply.",
          from: 'other'
        }
      ])
    }, 1000)
  }

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md h-[600px] flex flex-col border">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-white font-bold">
            {userId}
          </div>
          <div>
            <h4 className="text-sm font-medium">User {userId}</h4>
            <p className="text-xs text-muted-foreground">Online</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4 space-y-2 overflow-y-auto">
        {messages.map(msg => (
          <div
            key={msg.id}
            className={`max-w-[70%] p-2 rounded-lg text-sm ${
              msg.from === 'user'
                ? 'bg-blue-100 self-end ml-auto'
                : 'bg-gray-100 self-start'
            }`}
          >
            {msg.text}
          </div>
        ))}
      </ScrollArea>

      {/* Input */}
      <div className="p-4 border-t flex gap-2">
        <Input
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        />
        <Button onClick={sendMessage}>Send</Button>
      </div>
    </div>
  )
}