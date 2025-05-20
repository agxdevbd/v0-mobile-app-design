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
    { role: "assistant", content: "আমি CXT AI V1। আপনি কিভাবে সাহায্য করতে পারি? আপনি সফলতা সম্পর্কে জিজ্ঞাসা করতে পারেন।" },
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [buttonSound] = useState(typeof Audio !== "undefined" ? new Audio("/click.mp3") : null)

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const playButtonSound = () => {
    if (buttonSound) {
      buttonSound.currentTime = 0
      buttonSound.play().catch((e) => console.log("Audio play failed:", e))
    }
  }

  const handleSend = () => {
    if (!input.trim()) return

    playButtonSound()

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
    const isBengali = /[\u0980-\u09FF]/.test(userInput)

    // Success-related responses
    if (
      userInputLower.includes("success") ||
      userInputLower.includes("successful") ||
      userInputLower.includes("সফল") ||
      userInputLower.includes("সাফল্য")
    ) {
      return isBengali
        ? "সফলতা একটি যাত্রা, একটি গন্তব্য নয়। প্রতিদিন ছোট ছোট পদক্ষেপ নিন, ধৈর্য ধরুন, এবং আপনি আপনার লক্ষ্যে পৌঁছাবেন। আমাদের সিস্টেম আপনাকে এই পথে সাহায্য করবে।"
        : "Success is a journey, not a destination. Take small steps every day, be patient, and you will reach your goals. Our system will help you on this path."
    }

    if (
      userInputLower.includes("fail") ||
      userInputLower.includes("failure") ||
      userInputLower.includes("ব্যর্থ") ||
      userInputLower.includes("ব্যর্থতা")
    ) {
      return isBengali
        ? "ব্যর্থতা সফলতার সিঁড়ি। প্রত্যেকটি ব্যর্থতা থেকে শিখুন এবং আরও শক্তিশালী হয়ে উঠুন। আমাদের সিস্টেম আপনাকে প্রতিটি পদক্ষেপে সাহায্য করবে।"
        : "Failure is the stepping stone to success. Learn from each failure and come back stronger. Our system will help you at every step."
    }

    if (
      userInputLower.includes("money") ||
      userInputLower.includes("profit") ||
      userInputLower.includes("টাকা") ||
      userInputLower.includes("লাভ")
    ) {
      return isBengali
        ? "অর্থ উপার্জন একটি দীর্ঘমেয়াদী প্রক্রিয়া। ধৈর্য ধরুন, সঠিক সিদ্ধান্ত নিন, এবং আমাদের সিস্টেম ব্যবহার করুন। আমরা আপনাকে সফল হতে সাহায্য করব।"
        : "Earning money is a long-term process. Be patient, make the right decisions, and use our system. We will help you succeed."
    }

    if (
      userInputLower.includes("invest") ||
      userInputLower.includes("investment") ||
      userInputLower.includes("বিনিয়োগ") ||
      userInputLower.includes("ইনভেস্ট")
    ) {
      return isBengali
        ? "বিনিয়োগ একটি বুদ্ধিমান সিদ্ধান্ত। আমাদের সিস্টেম আপনাকে সঠিক পথে পরিচালিত করবে। নিয়মিত বিনিয়োগ করুন এবং ধৈর্য ধরুন।"
        : "Investment is a wise decision. Our system will guide you on the right path. Invest regularly and be patient."
    }

    if (
      userInputLower.includes("system") ||
      userInputLower.includes("platform") ||
      userInputLower.includes("সিস্টেম") ||
      userInputLower.includes("প্ল্যাটফর্ম")
    ) {
      return isBengali
        ? "আমাদের সিস্টেম AI দ্বারা পরিচালিত এবং আপনার সাফল্যের জন্য ডিজাইন করা হয়েছে। এটি আপনাকে সঠিক সিদ্ধান্ত নিতে সাহায্য করবে।"
        : "Our system is AI-driven and designed for your success. It will help you make the right decisions."
    }

    // Default responses
    const defaultResponsesBengali = [
      "আমি আপনাকে সাহায্য করতে এখানে আছি। আপনি সফলতা, বিনিয়োগ, বা আমাদের সিস্টেম সম্পর্কে জিজ্ঞাসা করতে পারেন।",
      "আপনার প্রশ্নটি বুঝতে পারছি। আমি CXT AI V1, এই সিস্টেমের AI পরিচালক। আমি আপনাকে সফল হতে সাহায্য করব।",
      "আমি আপনাকে সাহায্য করতে চাই। আমাদের সিস্টেম আপনাকে সফলতার পথে নিয়ে যাবে।",
      "আপনার প্রশ্নের জন্য ধন্যবাদ। আমি এই প্ল্যাটফর্মের AI সিস্টেম, আপনাকে সফল হতে সাহায্য করতে সর্বদা প্রস্তুত।",
    ]

    const defaultResponsesEnglish = [
      "I'm here to help you. You can ask about success, investment, or our system.",
      "I understand your question. I am CXT AI V1, the AI manager of this system. I will help you succeed.",
      "I want to help you. Our system will lead you to success.",
      "Thank you for your question. I am the AI system of this platform, always ready to help you succeed.",
    ]

    return isBengali
      ? defaultResponsesBengali[Math.floor(Math.random() * defaultResponsesBengali.length)]
      : defaultResponsesEnglish[Math.floor(Math.random() * defaultResponsesEnglish.length)]
  }

  return (
    <Card className="fixed bottom-4 right-4 w-80 h-96 shadow-xl z-40 overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-800 dark:to-indigo-800 p-3">
        <div className="flex justify-between items-center">
          <CardTitle className="text-white text-sm flex items-center">
            <Bot className="h-4 w-4 mr-2" />
            CXT AI Assistant
          </CardTitle>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 text-white"
            onClick={() => {
              playButtonSound()
              onClose()
            }}
          >
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
