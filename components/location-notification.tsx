"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MapPin } from "lucide-react"

export function LocationNotification() {
  const [isVisible, setIsVisible] = useState(true)
  const [countdown, setCountdown] = useState(3)

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1)
      }, 1000)
      return () => clearTimeout(timer)
    } else {
      const timer = setTimeout(() => {
        setIsVisible(false)
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [countdown])

  if (!isVisible) return null

  return (
    <AnimatePresence>
      <motion.div
        className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
      >
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-3 flex items-center max-w-xs">
          <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-3">
            <MapPin className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <div className="text-sm font-medium text-slate-800 dark:text-white">Your Location</div>
            <div className="text-xs text-slate-500 dark:text-slate-400">United States</div>
          </div>
          <div className="ml-3 text-xs text-slate-400 dark:text-slate-500">{countdown}s</div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
