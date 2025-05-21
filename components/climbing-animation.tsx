"use client"

import { motion } from "framer-motion"

export function ClimbingAnimation() {
  return (
    <div className="relative h-20 w-full overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/20 to-purple-900/20 rounded-lg" />

      {/* Person climbing stairs slowly */}
      <motion.div
        className="absolute bottom-0 left-1/4 transform -translate-x-1/2"
        initial={{ y: 20 }}
        animate={{ y: -40 }}
        transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, repeatType: "loop" }}
      >
        <div className="relative">
          {/* Stairs */}
          <div className="absolute bottom-0 left-0 w-20 h-40">
            <div className="absolute bottom-0 left-0 w-4 h-2 bg-gray-400 dark:bg-gray-600"></div>
            <div className="absolute bottom-2 left-2 w-4 h-2 bg-gray-400 dark:bg-gray-600"></div>
            <div className="absolute bottom-4 left-4 w-4 h-2 bg-gray-400 dark:bg-gray-600"></div>
            <div className="absolute bottom-6 left-6 w-4 h-2 bg-gray-400 dark:bg-gray-600"></div>
            <div className="absolute bottom-8 left-8 w-4 h-2 bg-gray-400 dark:bg-gray-600"></div>
            <div className="absolute bottom-10 left-10 w-4 h-2 bg-gray-400 dark:bg-gray-600"></div>
            <div className="absolute bottom-12 left-12 w-4 h-2 bg-gray-400 dark:bg-gray-600"></div>
          </div>

          {/* Person */}
          <div className="w-4 h-6 bg-blue-500 rounded-t-full relative">
            <div className="absolute top-1 left-1 w-0.5 h-0.5 bg-white rounded-full"></div>
            <div className="absolute top-1 right-1 w-0.5 h-0.5 bg-white rounded-full"></div>
            <motion.div
              className="absolute -bottom-2 left-0 w-4 h-2"
              animate={{ rotate: [-10, 10] }}
              transition={{ duration: 0.5, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
            >
              <div className="w-1 h-3 bg-blue-500 absolute top-0 left-0.5 rounded-b-sm"></div>
              <div className="w-1 h-3 bg-blue-500 absolute top-0 right-0.5 rounded-b-sm"></div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Person using ladder who falls */}
      <motion.div
        className="absolute bottom-0 right-1/4 transform translate-x-1/2"
        initial={{ y: 20 }}
        animate={[
          { y: -30, transition: { duration: 2 } },
          { y: 20, transition: { duration: 1 } },
        ]}
        transition={{ repeat: Number.POSITIVE_INFINITY, repeatDelay: 3 }}
      >
        <div className="relative">
          {/* Ladder */}
          <div className="absolute bottom-0 left-0 w-8 h-30 border-l-2 border-r-2 border-yellow-600">
            <div className="absolute top-0 left-0 w-8 h-0.5 bg-yellow-600"></div>
            <div className="absolute top-3 left-0 w-8 h-0.5 bg-yellow-600"></div>
            <div className="absolute top-6 left-0 w-8 h-0.5 bg-yellow-600"></div>
            <div className="absolute top-9 left-0 w-8 h-0.5 bg-yellow-600"></div>
            <div className="absolute top-12 left-0 w-8 h-0.5 bg-yellow-600"></div>
          </div>

          {/* Person */}
          <motion.div
            className="w-4 h-6 bg-red-500 rounded-t-full relative"
            animate={[
              { rotate: 0, transition: { duration: 2 } },
              { rotate: 180, transition: { duration: 1 } },
            ]}
            transition={{ repeat: Number.POSITIVE_INFINITY, repeatDelay: 3 }}
          >
            <div className="absolute top-1 left-1 w-0.5 h-0.5 bg-white rounded-full"></div>
            <div className="absolute top-1 right-1 w-0.5 h-0.5 bg-white rounded-full"></div>
            <motion.div
              className="absolute -bottom-2 left-0 w-4 h-2"
              animate={{ rotate: [-20, 20] }}
              transition={{ duration: 0.3, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
            >
              <div className="w-1 h-3 bg-red-500 absolute top-0 left-0.5 rounded-b-sm"></div>
              <div className="w-1 h-3 bg-red-500 absolute top-0 right-0.5 rounded-b-sm"></div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}
