"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Flame, Cpu, Bot, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface NotificationProps {
  type: "welcome" | "stats"
  onClose: () => void
  stats?: {
    profit: string
    return: string
    members: number
  }
}

export function Notification({ type, onClose, stats }: NotificationProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [buttonSound] = useState(typeof Audio !== "undefined" ? new Audio("/click.mp3") : null)
  const notificationSoundRef = useRef(null)

  useEffect(() => {
    // Initialize notification sound
    if (typeof window !== "undefined") {
      notificationSoundRef.current = new Audio("/notification-sound.mp3")
      notificationSoundRef.current.volume = 1.0 // Maximum volume
    }

    const timer = setTimeout(() => {
      setIsVisible(true)
      playNotificationSound()

      // Vibrate the phone
      if (typeof window !== "undefined" && "navigator" in window && "vibrate" in navigator) {
        navigator.vibrate([200, 100, 200, 100, 200])
      }
    }, 500)

    return () => clearTimeout(timer)
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
    setIsVisible(false)
    playButtonSound()
    setTimeout(onClose, 500) // Wait for exit animation
  }

  const getContent = () => {
    switch (type) {
      case "welcome":
        return {
          icon: <Cpu className="h-10 w-10 text-purple-500" />,
          title: (
            <div className="text-center mb-2">
              <p className="text-lg font-bold">আসসালামু আলাইকুম</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">السلام عليكم</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">Peace be upon you</p>
            </div>
          ),
          content: (
            <>
              <p className="mb-4 text-center">
                <span className="font-semibold">AI System</span> এর পক্ষ থেকে আপনাকে স্বাগতম।
              </p>
              <div className="flex items-center justify-center mb-4 bg-gradient-to-r from-purple-100 to-indigo-100 dark:from-purple-900/30 dark:to-indigo-900/30 p-3 rounded-lg">
                <Zap className="h-5 w-5 text-yellow-500 mr-2" />
                <p className="text-sm font-semibold">আমি ১০০ বার ভুল করে হলেও শিখব</p>
              </div>
              <p className="text-sm text-center">আমি প্রতিদিন ঘুম থেকে উঠে নতুন আমি কে তৈরি করতে চাই</p>
            </>
          ),
          button: (
            <div className="flex justify-center mt-4">
              <Button
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white"
                onClick={handleClose}
              >
                প্রমিস <Flame className="ml-2 h-4 w-4" />
              </Button>
            </div>
          ),
        }
      case "stats":
        return {
          icon: <Bot className="h-10 w-10 text-blue-500" />,
          title: <p className="text-lg font-bold text-center mb-2">গ্রুপ স্ট্যাটিসটিক্স</p>,
          content: (
            <div className="space-y-3">
              <div className="flex justify-between items-center bg-slate-50 dark:bg-gray-800 p-2 rounded-md">
                <span className="text-sm text-slate-700 dark:text-slate-300">মাসিক প্রফিট:</span>
                <span className="font-bold text-slate-900 dark:text-white">{stats?.profit}</span>
              </div>
              <div className="flex justify-between items-center bg-slate-50 dark:bg-gray-800 p-2 rounded-md">
                <span className="text-sm text-slate-700 dark:text-slate-300">মাসিক রিটার্ন:</span>
                <span className="font-bold text-green-600 dark:text-green-400">{stats?.return}</span>
              </div>
              <div className="flex justify-between items-center bg-slate-50 dark:bg-gray-800 p-2 rounded-md">
                <span className="text-sm text-slate-700 dark:text-slate-300">কমিউনিটি সদস্য:</span>
                <span className="font-bold text-blue-600 dark:text-blue-400">{stats?.members} জন</span>
              </div>
            </div>
          ),
          button: (
            <div className="flex justify-center mt-4">
              <Button
                variant="outline"
                className="border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800"
                onClick={handleClose}
              >
                ক্লোজ করুন
              </Button>
            </div>
          ),
        }
    }
  }

  const content = getContent()

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
                <div className="bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-800 dark:to-indigo-800 p-4 flex justify-center">
                  <motion.div
                    animate={{
                      y: [0, -10, 0],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "reverse",
                    }}
                  >
                    {content.icon}
                  </motion.div>
                </div>
                <div className="p-6">
                  {content.title}
                  {content.content}
                  {content.button}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
