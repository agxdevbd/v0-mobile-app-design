"use client"

import { motion } from "framer-motion"

export function ClimbingAnimation() {
  return (
    <div className="relative h-24 w-full overflow-hidden">
      {/* Background - House with stairs */}
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/20 to-purple-900/20 rounded-lg">
        {/* House outline */}
        <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-20 h-14 border-2 border-gray-400 dark:border-gray-600 rounded-t-lg"></div>
        <div className="absolute top-15 left-1/2 transform -translate-x-1/2 w-24 h-0 border-t-8 border-t-gray-400 dark:border-t-gray-600 border-l-8 border-l-transparent border-r-8 border-r-transparent"></div>

        {/* Stairs */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 h-12">
          <div className="absolute bottom-0 left-0 w-32 h-2 bg-gray-400 dark:bg-gray-600"></div>
          <div className="absolute bottom-2 left-2 w-28 h-2 bg-gray-400 dark:bg-gray-600"></div>
          <div className="absolute bottom-4 left-4 w-24 h-2 bg-gray-400 dark:bg-gray-600"></div>
          <div className="absolute bottom-6 left-6 w-20 h-2 bg-gray-400 dark:bg-gray-600"></div>
          <div className="absolute bottom-8 left-8 w-16 h-2 bg-gray-400 dark:bg-gray-600"></div>
          <div className="absolute bottom-10 left-10 w-12 h-2 bg-gray-400 dark:bg-gray-600"></div>
        </div>
      </div>

      {/* Person climbing slowly but steadily */}
      <motion.div
        className="absolute bottom-0 left-1/3 transform -translate-x-1/2 z-10"
        initial={{ y: 0, x: 0 }}
        animate={[
          { y: -2, x: 2, transition: { duration: 0.5 } },
          { y: -4, x: 4, transition: { duration: 0.5 } },
          { y: -6, x: 6, transition: { duration: 0.5 } },
          { y: -8, x: 8, transition: { duration: 0.5 } },
          { y: -10, x: 10, transition: { duration: 0.5 } },
          { y: -12, x: 12, transition: { duration: 0.5 } },
        ]}
        transition={{ repeat: Number.POSITIVE_INFINITY, repeatDelay: 3 }}
      >
        <div className="relative">
          {/* Person */}
          <div className="w-5 h-7 bg-blue-500 rounded-t-full relative">
            <div className="absolute top-1 left-1 w-1 h-1 bg-white rounded-full"></div>
            <div className="absolute top-1 right-1 w-1 h-1 bg-white rounded-full"></div>
            <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-2 h-0.5 bg-white rounded-full"></div>
            <motion.div
              className="absolute -bottom-3 left-0 w-5 h-3"
              animate={{ rotate: [-10, 10] }}
              transition={{ duration: 0.5, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
            >
              <div className="w-1.5 h-3 bg-blue-500 absolute top-0 left-0.5 rounded-b-sm"></div>
              <div className="w-1.5 h-3 bg-blue-500 absolute top-0 right-0.5 rounded-b-sm"></div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Person climbing quickly, falling, then climbing again */}
      <motion.div
        className="absolute bottom-0 right-1/3 transform translate-x-1/2 z-10"
        initial={{ y: 0, x: 0 }}
        animate={[
          // First attempt - quick climb then fall
          { y: -10, x: -10, transition: { duration: 0.8 } },
          { y: 0, x: 0, transition: { duration: 0.4 } },
          // Second attempt - fall after two steps
          { y: -4, x: -4, transition: { duration: 0.4 } },
          { y: 0, x: 0, transition: { duration: 0.3 } },
          // Third attempt - successful but slow
          { y: -2, x: -2, transition: { duration: 0.6 } },
          { y: -4, x: -4, transition: { duration: 0.6 } },
          { y: -6, x: -6, transition: { duration: 0.6 } },
          { y: -8, x: -8, transition: { duration: 0.6 } },
          { y: -10, x: -10, transition: { duration: 0.6 } },
          { y: -12, x: -12, transition: { duration: 0.6 } },
        ]}
        transition={{ repeat: Number.POSITIVE_INFINITY, repeatDelay: 3 }}
      >
        <div className="relative">
          {/* Person */}
          <div className="w-5 h-7 bg-red-500 rounded-t-full relative">
            <div className="absolute top-1 left-1 w-1 h-1 bg-white rounded-full"></div>
            <div className="absolute top-1 right-1 w-1 h-1 bg-white rounded-full"></div>
            <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-2 h-0.5 bg-white rounded-full"></div>
            <motion.div
              className="absolute -bottom-3 left-0 w-5 h-3"
              animate={{ rotate: [-20, 20] }}
              transition={{ duration: 0.3, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
            >
              <div className="w-1.5 h-3 bg-red-500 absolute top-0 left-0.5 rounded-b-sm"></div>
              <div className="w-1.5 h-3 bg-red-500 absolute top-0 right-0.5 rounded-b-sm"></div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
