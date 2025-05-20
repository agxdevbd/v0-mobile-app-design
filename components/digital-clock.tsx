"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

export function DigitalClock() {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    // Update time every second
    const interval = setInterval(() => {
      setTime(new Date())
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  // Format time in 12-hour format
  const formatTime = () => {
    let hours = time.getHours()
    const minutes = time.getMinutes().toString().padStart(2, "0")
    const seconds = time.getSeconds().toString().padStart(2, "0")
    const ampm = hours >= 12 ? "PM" : "AM"

    hours = hours % 12
    hours = hours ? hours : 12 // the hour '0' should be '12'
    const hoursStr = hours.toString().padStart(2, "0")

    return { hoursStr, minutes, seconds, ampm }
  }

  const { hoursStr, minutes, seconds, ampm } = formatTime()

  return (
    <div className="flex items-center justify-center bg-black rounded-lg p-2 shadow-inner shadow-blue-500/20">
      <div className="flex items-center">
        <div className="flex">
          {hoursStr.split("").map((digit, index) => (
            <motion.div
              key={`hour-${index}`}
              className="w-6 h-10 bg-gray-900 rounded-sm flex items-center justify-center mx-0.5 border border-blue-500/20"
              initial={{ y: 0 }}
              animate={{ y: [0, -2, 0] }}
              transition={{ duration: 0.5, delay: index * 0.1, repeat: Number.POSITIVE_INFINITY, repeatDelay: 10 }}
            >
              <span className="text-cyan-500 font-mono text-xl font-bold">{digit}</span>
            </motion.div>
          ))}
        </div>

        <div className="mx-1 flex flex-col space-y-1">
          <div className="w-1 h-1 rounded-full bg-cyan-500"></div>
          <div className="w-1 h-1 rounded-full bg-cyan-500"></div>
        </div>

        <div className="flex">
          {minutes.split("").map((digit, index) => (
            <motion.div
              key={`min-${index}`}
              className="w-6 h-10 bg-gray-900 rounded-sm flex items-center justify-center mx-0.5 border border-blue-500/20"
              initial={{ y: 0 }}
              animate={{ y: [0, -2, 0] }}
              transition={{
                duration: 0.5,
                delay: index * 0.1 + 0.2,
                repeat: Number.POSITIVE_INFINITY,
                repeatDelay: 10,
              }}
            >
              <span className="text-cyan-500 font-mono text-xl font-bold">{digit}</span>
            </motion.div>
          ))}
        </div>

        <div className="mx-1 flex flex-col space-y-1">
          <div className="w-1 h-1 rounded-full bg-cyan-500"></div>
          <div className="w-1 h-1 rounded-full bg-cyan-500"></div>
        </div>

        <div className="flex">
          {seconds.split("").map((digit, index) => (
            <motion.div
              key={`sec-${index}`}
              className="w-6 h-10 bg-gray-900 rounded-sm flex items-center justify-center mx-0.5 border border-blue-500/20"
              initial={{ y: 0 }}
              animate={{ y: [0, -2, 0] }}
              transition={{
                duration: 0.5,
                delay: index * 0.1 + 0.4,
                repeat: Number.POSITIVE_INFINITY,
                repeatDelay: 10,
              }}
            >
              <span className="text-cyan-500 font-mono text-xl font-bold">{digit}</span>
            </motion.div>
          ))}
        </div>

        <div className="ml-2 flex flex-col">
          <motion.div
            className="w-8 h-5 bg-gray-900 rounded-sm flex items-center justify-center border border-blue-500/20"
            animate={{ opacity: [1, 0.7, 1] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          >
            <span className="text-cyan-500 font-mono text-xs font-bold">{ampm}</span>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
