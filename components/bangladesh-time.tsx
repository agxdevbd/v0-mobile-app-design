"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Clock } from "lucide-react"

export function BangladeshTime() {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    // Update time every second
    const interval = setInterval(() => {
      setTime(new Date())
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  // Format time for Bangladesh (UTC+6)
  const formatBangladeshTime = () => {
    // Bangladesh is UTC+6
    const options: Intl.DateTimeFormatOptions = {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
      timeZone: "Asia/Dhaka",
    }

    return new Intl.DateTimeFormat("bn-BD", options).format(time)
  }

  // Format date for Bangladesh
  const formatBangladeshDate = () => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "Asia/Dhaka",
    }

    return new Intl.DateTimeFormat("bn-BD", options).format(time)
  }

  return (
    <motion.div
      className="flex items-center bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2 text-white"
      whileHover={{ scale: 1.05 }}
    >
      <motion.div
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        className="mr-2"
      >
        <Clock className="h-4 w-4" />
      </motion.div>
      <div className="text-xs">
        <div>{formatBangladeshTime()}</div>
        <div className="text-white/70 text-[10px]">{formatBangladeshDate()}</div>
      </div>
    </motion.div>
  )
}
