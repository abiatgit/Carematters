// components/ChatBox.tsx
'use client'

import { useEffect, useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { io } from "socket.io-client"
const socket = io({
  path: "/api/socket",
})

type Message = {
  id: number
  text: string
  from: 'user' | 'bot'
}

export default function ChatBox() {
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<Message[]>([])
  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected", socket.id)
    })
      socket.on("new-message", (msg) => {
        setMessages((prev) => [...prev, msg])
      })
    return () => {
      socket.disconnect()
    }
  }, [])
  const sendMessage = () => {
    if (!input.trim()) return

    const newMessage: Message = {
      id: Date.now(),
      text: input,
      from: 'user',
    }

    setMessages((prev) => [...prev, newMessage])
    socket.emit("send-message", newMessage)
    setInput("")

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          text: "This is a bot reply.",
          from: 'bot',
        },
      ])
    }, 1000)
  }
    return (
      <div className="max-w-md p-4 border rounded-xl shadow-md flex flex-col gap-4 h-[500px] bg-white">
        {/* Chat Header */}
        <div className="flex items-center gap-3 border-b pb-2">
          <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-sm font-semibold text-white">
            JD
          </div>
          <div className="flex flex-col">
            <span className="font-medium text-sm">John Doe</span>
            <span className="text-xs text-muted-foreground">Online</span>
          </div>
        </div>
    
        {/* Messages */}
        <ScrollArea className="flex-1 pr-2">
          <div className="flex flex-col gap-2">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`p-2 rounded-lg max-w-[80%] ${
                  msg.from === 'user' ? 'bg-blue-100 self-end' : 'bg-gray-100 self-start'
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>
        </ScrollArea>
    
        {/* Input */}
        <div className="flex gap-2">
          <Input
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          />
          <Button onClick={sendMessage}>Send</Button>
        </div>
      </div>
    )
    
  
}
