"use client"

import { motion } from "framer-motion"
import { Sparkles, Zap, Star } from "lucide-react"

export function TryAnimation() {
  return (
    <motion.div
      className="absolute top-2 left-1/2 transform -translate-x-1/2 z-20"
      animate={{ y: [0, -5, 0] }}
      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
    >
      <motion.div
        className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-3 py-1 rounded-full flex items-center shadow-lg"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
      >
        <Sparkles className="h-4 w-4 mr-1 text-yellow-300" />
        <span className="font-bold text-sm">TRY TRY TRY</span>
        <Star className="h-4 w-4 ml-1 text-yellow-300" />
        <Zap className="h-4 w-4 ml-1 text-yellow-300" />
      </motion.div>
    </motion.div>
  )
}
