"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Check, Lock, Bot } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"

interface PinEntryProps {
  onSuccess: () => void
}

export function PinEntry({ onSuccess }: PinEntryProps) {
  const [pin, setPin] = useState("")
  const [attempts, setAttempts] = useState(0)
  const [isBlocked, setIsBlocked] = useState(false)
  const [blockExpiry, setBlockExpiry] = useState<Date | null>(null)
  const [showSuccess, setShowSuccess] = useState(false)
  const [error, setError] = useState("")
  const [showAITransfer, setShowAITransfer] = useState(false)
  const [transferComplete, setTransferComplete] = useState(false)
  const [transferProgress, setTransferProgress] = useState(0)

  const CORRECT_PIN = "262"
  const MAX_ATTEMPTS = 3
  const BLOCK_DURATION = 24 * 60 * 60 * 1000 // 24 hours in milliseconds

  useEffect(() => {
    // Check if user is blocked from localStorage
    const storedBlockExpiry = localStorage.getItem("pinBlockExpiry")
    if (storedBlockExpiry) {
      const expiryDate = new Date(storedBlockExpiry)
      if (expiryDate > new Date()) {
        setIsBlocked(true)
        setBlockExpiry(expiryDate)
      } else {
        // Block has expired
        localStorage.removeItem("pinBlockExpiry")
      }
    }
  }, [])

  const handlePinSubmit = () => {
    if (isBlocked) return

    if (pin === CORRECT_PIN) {
      setShowSuccess(true)
      setTimeout(() => {
        setShowSuccess(false)
        setShowAITransfer(true)
      }, 2000)
    } else {
      const newAttempts = attempts + 1
      setAttempts(newAttempts)
      setError("আপনার পিনটি ভুল")
      setPin("")

      if (newAttempts >= MAX_ATTEMPTS) {
        const expiry = new Date(Date.now() + BLOCK_DURATION)
        setIsBlocked(true)
        setBlockExpiry(expiry)
        localStorage.setItem("pinBlockExpiry", expiry.toISOString())
      }
    }
  }

  const handleTransfer = () => {
    // Simulate AI transfer
    let progress = 0
    const interval = setInterval(() => {
      progress += 10
      setTransferProgress(progress)

      if (progress >= 100) {
        clearInterval(interval)
        setTimeout(() => {
          setTransferComplete(true)
          setTimeout(onSuccess, 1000)
        }, 500)
      }
    }, 200)
  }

  const formatTimeRemaining = () => {
    if (!blockExpiry) return ""

    const now = new Date()
    const diff = blockExpiry.getTime() - now.getTime()

    if (diff <= 0) {
      setIsBlocked(false)
      setBlockExpiry(null)
      localStorage.removeItem("pinBlockExpiry")
      return ""
    }

    const hours = Math.floor(diff / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

    return `${hours} ঘন্টা ${minutes} মিনিট`
  }

  return (
    <AnimatePresence>
      {!showAITransfer ? (
        <motion.div
          className="fixed inset-0 flex items-center justify-center z-50 bg-gradient-to-b from-gray-900 to-purple-950 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", damping: 20 }}
            className="w-full max-w-sm"
          >
            <Card className="bg-white dark:bg-gray-900 border-slate-200 dark:border-gray-800 overflow-hidden shadow-xl">
              <CardContent className="p-0">
                <div className="bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-800 dark:to-indigo-800 p-6 flex flex-col items-center">
                  <motion.div
                    animate={{
                      y: [0, -10, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "reverse",
                    }}
                  >
                    <Lock className="h-16 w-16 text-white mb-4" />
                  </motion.div>
                  <h2 className="text-xl font-bold text-white text-center">প্রবেশ করার অনুমতি পিন দিন</h2>
                </div>

                <div className="p-6">
                  {isBlocked ? (
                    <div className="text-center">
                      <div className="text-red-500 dark:text-red-400 mb-4">আপনি এখানে ২৪ ঘন্টা প্রবেশ করতে পারবেন না</div>
                      <div className="text-sm text-slate-600 dark:text-slate-400">
                        দয়া করে {formatTimeRemaining()} পরে চেষ্টা করুন
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="mb-4">
                        <Input
                          type="password"
                          placeholder="পিন লিখুন"
                          value={pin}
                          onChange={(e) => {
                            setPin(e.target.value)
                            setError("")
                          }}
                          className="text-center text-lg"
                          maxLength={6}
                        />
                        {error && <p className="text-red-500 text-sm mt-2 text-center">{error}</p>}
                      </div>

                      <Button
                        className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                        onClick={handlePinSubmit}
                      >
                        প্রবেশ করুন
                      </Button>

                      {attempts > 0 && (
                        <p className="text-amber-500 dark:text-amber-400 text-xs mt-2 text-center">
                          আপনার {MAX_ATTEMPTS - attempts}টি চেষ্টা বাকি আছে
                        </p>
                      )}
                    </>
                  )}
                </div>
              </CardContent>
            </Card>

            <AnimatePresence>
              {showSuccess && (
                <motion.div
                  className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1, rotate: [0, 10, -10, 0] }}
                    exit={{ scale: 0.5, opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-green-500 text-white rounded-full p-8"
                  >
                    <Check className="h-16 w-16" />
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      ) : (
        <motion.div
          className="fixed inset-0 flex items-center justify-center z-50 bg-gradient-to-b from-gray-900 to-purple-950 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", damping: 20 }}
            className="w-full max-w-sm"
          >
            <Card className="bg-white dark:bg-gray-900 border-slate-200 dark:border-gray-800 overflow-hidden shadow-xl">
              <CardContent className="p-0">
                <div className="bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-800 dark:to-indigo-800 p-6 flex flex-col items-center">
                  <motion.div
                    animate={{
                      rotate: [0, 360],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "loop",
                    }}
                  >
                    <Bot className="h-16 w-16 text-white mb-4" />
                  </motion.div>
                  <h2 className="text-xl font-bold text-white text-center">আপনার প্রবেশ অনুমতি এআইকে হস্তান্তর করুন</h2>
                </div>

                <div className="p-6">
                  {!transferComplete ? (
                    <>
                      {transferProgress === 0 ? (
                        <Button
                          className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700"
                          onClick={handleTransfer}
                        >
                          হস্তান্তর করুন
                        </Button>
                      ) : (
                        <div className="space-y-4">
                          <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                            <motion.div
                              className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
                              initial={{ width: "0%" }}
                              animate={{ width: `${transferProgress}%` }}
                            />
                          </div>
                          <p className="text-center text-sm text-slate-600 dark:text-slate-400">
                            হস্তান্তর হচ্ছে... {transferProgress}%
                          </p>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="flex flex-col items-center">
                      <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: "spring", damping: 10 }}
                      >
                        <Check className="h-12 w-12 text-green-500 mb-2" />
                      </motion.div>
                      <p className="text-center text-slate-800 dark:text-slate-200">হস্তান্তর সম্পন্ন হয়েছে</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
