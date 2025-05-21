"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface EidGreetingProps {
  onClose: () => void
}

export function EidGreeting({ onClose }: EidGreetingProps) {
  const [isVisible, setIsVisible] = useState(true)
  const [buttonSound] = useState(typeof Audio !== "undefined" ? new Audio("/click.mp3") : null)
  const notificationSoundRef = useRef(null)

  useEffect(() => {
    // Initialize notification sound
    if (typeof window !== "undefined") {
      notificationSoundRef.current = new Audio("/eid-notification.mp3")
      notificationSoundRef.current.volume = 1.0 // Maximum volume
    }

    // Play notification sound
    playNotificationSound()

    // Vibrate the phone with strong pattern
    if (typeof window !== "undefined" && "navigator" in window && "vibrate" in navigator) {
      navigator.vibrate([300, 100, 300, 100, 300, 100, 300, 100, 300])
    }

    return () => {
      if (notificationSoundRef.current) {
        notificationSoundRef.current.pause()
        notificationSoundRef.current.currentTime = 0
      }
    }
  }, [])

  const playButtonSound = () => {
    if (buttonSound) {
      buttonSound.currentTime = 0
      buttonSound.volume = 1.0 // Maximum volume
      buttonSound.play().catch((e) => console.log("Audio play failed:", e))

      // Vibrate the phone
      if (typeof window !== "undefined" && "navigator" in window && "vibrate" in navigator) {
        navigator.vibrate(100)
      }
    }
  }

  const playNotificationSound = () => {
    if (typeof window !== "undefined" && notificationSoundRef.current) {
      notificationSoundRef.current.currentTime = 0
      notificationSoundRef.current.volume = 1.0 // Maximum volume
      notificationSoundRef.current.play().catch((e) => console.log("Audio play failed:", e))
    }
  }

  const handleClose = () => {
    playButtonSound()
    setIsVisible(false)
    setTimeout(onClose, 500) // Wait for exit animation
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", damping: 20 }}
            className="w-full max-w-md"
          >
            <Card className="bg-white dark:bg-gray-900 border-slate-200 dark:border-gray-800 overflow-hidden shadow-xl">
              <CardContent className="p-0">
                <div className="bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-700 dark:to-emerald-700 p-6 flex flex-col items-center">
                  <motion.div
                    animate={{
                      rotate: [0, 360],
                    }}
                    transition={{
                      duration: 20,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "loop",
                    }}
                    className="relative h-20 w-20 mb-4"
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Star className="h-16 w-16 text-yellow-300" />
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Star className="h-10 w-10 text-white" />
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="h-6 w-6 rounded-full bg-yellow-300"></div>
                    </div>
                  </motion.div>
                  <h2 className="text-2xl font-bold text-white text-center mb-2">Eid Mubarak!</h2>
                  <p className="text-white/90 text-center">
                    Wishing you joy, peace, and prosperity on this blessed occasion
                  </p>
                </div>

                <div className="p-6">
                  <motion.p
                    className="text-center text-slate-700 dark:text-slate-300 font-medium mb-6"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  >
                    Never be discouraged by your situation
                  </motion.p>

                  <Button
                    className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white"
                    onClick={handleClose}
                  >
                    Thank You
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
