"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Heart, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface DonationFormProps {
  onClose: () => void
}

export function DonationForm({ onClose }: DonationFormProps) {
  const [percentage, setPercentage] = useState(10)
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
    setIsSubmitted(true)
    setTimeout(() => {
      onClose()
    }, 2000)
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
            <CardHeader className="bg-gradient-to-r from-pink-600 to-rose-600 dark:from-pink-700 dark:to-rose-700 text-white">
              <CardTitle className="flex items-center">
                <Heart className="h-5 w-5 mr-2 text-white" />
                Donate
              </CardTitle>
            </CardHeader>

            <CardContent className="p-6">
              {!isSubmitted ? (
                <div className="space-y-6">
                  <div className="text-center">
                    <p className="text-slate-700 dark:text-slate-300">
                      Your donated amount will be calculated as a percentage of your balance.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600 dark:text-slate-400">Donation Percentage</span>
                      <span className="font-medium text-slate-800 dark:text-slate-200">{percentage}%</span>
                    </div>
                    <Slider
                      value={[percentage]}
                      min={1}
                      max={50}
                      step={1}
                      onValueChange={(value) => setPercentage(value[0])}
                      className="py-4"
                    />
                    <div className="flex justify-between text-xs text-slate-500 dark:text-slate-500">
                      <span>1%</span>
                      <span>25%</span>
                      <span>50%</span>
                    </div>
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
                      className="bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 text-white"
                      onClick={handleSubmit}
                    >
                      Donate {percentage}%
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
                  <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">Thank You!</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-center">
                    Your donation of {percentage}% has been received.
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
