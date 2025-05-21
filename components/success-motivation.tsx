"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface SuccessMotivationProps {
  onClose: () => void
}

export function SuccessMotivation({ onClose }: SuccessMotivationProps) {
  const [isVisible, setIsVisible] = useState(true)
  const [buttonSound] = useState(typeof Audio !== "undefined" ? new Audio("/click.mp3") : null)
  const notificationSoundRef = useRef(null)

  useEffect(() => {
    // Initialize notification sound
    if (typeof window !== "undefined") {
      notificationSoundRef.current = new Audio("/notification-sound.mp3")
      notificationSoundRef.current.volume = 1.0 // Maximum volume
    }

    // Play notification sound
    playNotificationSound()

    // Vibrate the phone
    if (typeof window !== "undefined" && "navigator" in window && "vibrate" in navigator) {
      navigator.vibrate([200, 100, 200, 100, 200])
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
                <div className="bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-700 dark:to-indigo-700 p-6 flex flex-col items-center">
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "reverse",
                    }}
                    className="mb-4"
                  >
                    <Zap className="h-16 w-16 text-yellow-300" />
                  </motion.div>
                  <h2 className="text-2xl font-bold text-white text-center">I WILL BE SUCCESSFUL</h2>
                  <p className="text-white/90 text-center mt-2">NO MATTER WHAT IT TAKES</p>
                </div>

                <div className="p-6">
                  <Button
                    className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white"
                    onClick={handleClose}
                  >
                    YES
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
