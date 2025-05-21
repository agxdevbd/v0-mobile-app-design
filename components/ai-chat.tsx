"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Bot, Send, X, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"

interface AIChatProps {
  onClose: () => void
}

export function AIChat({ onClose }: AIChatProps) {
  const [messages, setMessages] = useState<{ role: "user" | "assistant"; content: string }[]>([
    { role: "assistant", content: "আমি CXT AI V1। আপনি কিভাবে সাহায্য করতে পারি?" },
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSend = () => {
    if (!input.trim()) return

    // Add user message
    setMessages([...messages, { role: "user", content: input }])
    setInput("")
    setIsTyping(true)

    // Simulate AI response
    setTimeout(
      () => {
        const response = getAIResponse(input)
        setMessages((prev) => [...prev, { role: "assistant", content: response }])
        setIsTyping(false)
      },
      1000 + Math.random() * 2000,
    ) // Random delay between 1-3 seconds
  }

  const getAIResponse = (userInput: string) => {
    const userInputLower = userInput.toLowerCase()

    // Predefined responses about the application
    if (userInputLower.includes("কে") || userInputLower.includes("who") || userInputLower.includes("what are you")) {
      return "আমি CXT AI V1, একটি উন্নত AI সিস্টেম যা এই প্ল্যাটফর্ম পরিচালনা করে।"
    }

    if (userInputLower.includes("মালিক") || userInputLower.includes("owner")) {
      return "এই প্ল্যাটফর্মটি সম্পূর্ণ AI দ্বারা পরিচালিত। এখানে কোন নির্দিষ্ট মালিক নেই, এটি একটি স্বয়ংক্রিয় সিস্টেম।"
    }

    if (userInputLower.includes("কিভাবে") || userInputLower.includes("how")) {
      return "আপনি ড্যাশবোর্ডে সমস্ত সদস্যদের তথ্য দেখতে পারেন এবং বিভিন্ন সেকশন ব্যবহার করতে পারেন। আপনার কোন নির্দিষ্ট প্রশ্ন আছে?"
    }

    if (userInputLower.includes("টাকা") || userInputLower.includes("money") || userInputLower.includes("payment")) {
      return "এই প্ল্যাটফর্মে সমস্ত লেনদেন সুরক্ষিত এবং AI দ্বারা পর্যবেক্ষণ করা হয়। আপনার অর্থ সম্পূর্ণ নিরাপদ।"
    }

    if (userInputLower.includes("সিকিউরিটি") || userInputLower.includes("security")) {
      return "এই প্ল্যাটফর্মে উন্নত সিকিউরিটি সিস্টেম রয়েছে। স্ক্রিনশট, স্ক্রিন রেকর্ডিং এবং টেক্সট কপি করা সম্ভব নয়।"
    }

    // Default responses
    const defaultResponses = [
      "আমি আপনাকে সাহায্য করতে এখানে আছি। এই প্ল্যাটফর্মটি সম্পূর্ণ AI দ্বারা পরিচালিত।",
      "আপনার প্রশ্নটি বুঝতে পারছি। আমি CXT AI V1, এই সিস্টেমের AI পরিচালক।",
      "আমি আপনাকে সাহায্য করতে চাই। এই প্ল্যাটফর্মটি উন্নত AI প্রযুক্তি ব্যবহার করে।",
      "আপনার প্রশ্নের জন্য ধন্যবাদ। আমি এই প্ল্যাটফর্মের AI সিস্টেম, আপনাকে সাহায্য করতে সর্বদা প্রস্তুত।",
    ]

    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)]
  }

  return (
    <Card className="fixed bottom-4 right-4 w-80 h-96 shadow-xl z-40 overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-800 dark:to-indigo-800 p-3">
        <div className="flex justify-between items-center">
          <CardTitle className="text-white text-sm flex items-center">
            <Bot className="h-4 w-4 mr-2" />
            CXT AI Assistant
          </CardTitle>
          <Button variant="ghost" size="icon" className="h-6 w-6 text-white" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="p-3 h-[calc(100%-96px)] overflow-y-auto">
        <div className="space-y-3">
          {messages.map((message, index) => (
            <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[80%] rounded-lg p-2 ${
                  message.role === "user"
                    ? "bg-purple-600 text-white"
                    : "bg-gray-100 dark:bg-gray-800 text-slate-800 dark:text-slate-200"
                }`}
              >
                {message.role === "assistant" && (
                  <div className="flex items-center mb-1">
                    <Sparkles className="h-3 w-3 mr-1 text-purple-500 dark:text-purple-400" />
                    <span className="text-xs font-medium text-purple-500 dark:text-purple-400">CXT AI</span>
                  </div>
                )}
                <p className="text-sm">{message.content}</p>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-2 max-w-[80%]">
                <div className="flex items-center mb-1">
                  <Sparkles className="h-3 w-3 mr-1 text-purple-500 dark:text-purple-400" />
                  <span className="text-xs font-medium text-purple-500 dark:text-purple-400">CXT AI</span>
                </div>
                <div className="flex space-x-1">
                  <motion.div
                    className="w-2 h-2 bg-purple-500 rounded-full"
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 0.5, repeat: Number.POSITIVE_INFINITY }}
                  />
                  <motion.div
                    className="w-2 h-2 bg-purple-500 rounded-full"
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 0.5, delay: 0.1, repeat: Number.POSITIVE_INFINITY }}
                  />
                  <motion.div
                    className="w-2 h-2 bg-purple-500 rounded-full"
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 0.5, delay: 0.2, repeat: Number.POSITIVE_INFINITY }}
                  />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </CardContent>

      <CardFooter className="p-3 border-t">
        <div className="flex w-full space-x-2">
          <Input
            placeholder="আপনার প্রশ্ন লিখুন..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            className="flex-1"
          />
          <Button size="icon" onClick={handleSend} className="bg-purple-600 hover:bg-purple-700">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
