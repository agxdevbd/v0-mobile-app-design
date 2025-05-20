"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Coffee, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface BreakApplicationProps {
  onClose: () => void
}

export function BreakApplication({ onClose }: BreakApplicationProps) {
  const [reason, setReason] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [buttonSound] = useState(typeof Audio !== "undefined" ? new Audio("/click.mp3") : null)

  const playButtonSound = () => {
    if (buttonSound) {
      buttonSound.currentTime = 0
      buttonSound.play().catch((e) => console.log("Audio play failed:", e))
    }
  }

  const handleSubmit = () => {
    playButtonSound()
    if (reason.trim()) {
      setIsSubmitted(true)
      setTimeout(() => {
        onClose()
      }, 2000)
    }
  }

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", damping: 20 }}
          className="w-full max-w-md"
        >
          <Card className="bg-white dark:bg-gray-900 border-slate-200 dark:border-gray-800 overflow-hidden shadow-xl">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-700 dark:to-cyan-700 text-white">
              <CardTitle className="flex items-center">
                <Coffee className="h-5 w-5 mr-2 text-white" />
                Break Application
              </CardTitle>
            </CardHeader>

            <CardContent className="p-6">
              {!isSubmitted ? (
                <div className="space-y-6">
                  <div className="text-center">
                    <p className="text-slate-700 dark:text-slate-300">
                      If you're feeling overwhelmed, unsuccessful, or facing personal issues, take a break and come back
                      stronger.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm text-slate-600 dark:text-slate-400">
                      Please explain why you need a break:
                    </label>
                    <Textarea
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                      placeholder="I need a break because..."
                      className="min-h-[100px]"
                    />
                  </div>

                  <div className="flex justify-between">
                    <Button
                      variant="outline"
                      className="border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800"
                      onClick={() => {
                        playButtonSound()
                        onClose()
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white"
                      onClick={handleSubmit}
                      disabled={!reason.trim()}
                    >
                      Submit Application
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center py-6">
                  <motion.div
                    initial={{ scale: 0, rotate: 0 }}
                    animate={{ scale: 1, rotate: 360 }}
                    transition={{ type: "spring", damping: 10 }}
                    className="bg-green-100 dark:bg-green-900/30 h-16 w-16 rounded-full flex items-center justify-center mb-4"
                  >
                    <Check className="h-8 w-8 text-green-600 dark:text-green-400" />
                  </motion.div>
                  <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">Application Received</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-center">
                    Your break application has been submitted. Take care and come back stronger!
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
