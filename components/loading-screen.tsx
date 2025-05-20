"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Sparkles, Code, Cpu } from "lucide-react"
import { Progress } from "@/components/ui/progress"

export function LoadingScreen() {
  const [progress, setProgress] = useState(0)
  const [randomCode, setRandomCode] = useState("")
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    // Generate random code
    const codes = [
      "AI:7X92:INIT:SYSTEM",
      "NEURAL:NET:LOADING",
      "QUANTUM:PROCESS:ACTIVE",
      "SYS:MATRIX:CALIBRATING",
      "AI:CORE:INITIALIZING",
      "DEEP:LEARNING:ACTIVE",
    ]
    setRandomCode(codes[Math.floor(Math.random() * codes.length)])

    // Animate progress
    const startTime = Date.now()
    const duration = 1500 // 1.5 seconds

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime
      const newProgress = Math.min(Math.floor((elapsed / duration) * 100), 100)
      setProgress(newProgress)

      if (newProgress >= 100) {
        clearInterval(interval)
        setTimeout(() => setIsComplete(true), 300)
      }
    }, 30)

    return () => clearInterval(interval)
  }, [])

  if (isComplete) return null

  return (
    <motion.div
      className="fixed inset-0 bg-gradient-to-b from-slate-900 to-purple-950 z-50 flex flex-col items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 360],
        }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "loop",
        }}
        className="relative mb-8"
      >
        <Cpu className="h-16 w-16 text-purple-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        >
          <Sparkles className="h-24 w-24 text-indigo-400" />
        </motion.div>
      </motion.div>

      <div className="w-full max-w-xs mb-4">
        <Progress value={progress} className="h-2 bg-gray-800" />
        <div className="flex justify-between mt-2 text-xs text-gray-400">
          <span>Initializing</span>
          <span>{progress}%</span>
        </div>
      </div>

      <div className="flex items-center space-x-2 text-sm text-cyan-400 font-mono bg-gray-900/50 px-3 py-1 rounded-md">
        <Code className="h-4 w-4" />
        <span>{randomCode}</span>
      </div>

      <div className="mt-8 text-center">
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
          className="text-white text-sm"
        >
          AI System Loading...
        </motion.div>
      </div>
    </motion.div>
  )
}
