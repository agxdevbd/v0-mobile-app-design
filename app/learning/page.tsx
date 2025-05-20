"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import {
  Home,
  TrendingUp,
  BookOpen,
  Moon,
  Sun,
  Lock,
  Lightbulb,
  BarChart3,
  Zap,
  ArrowRight,
  Calendar,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { useTheme } from "next-themes"
import { Notification } from "@/components/notification"

export default function Learning() {
  const { theme, setTheme } = useTheme()
  const [progress, setProgress] = useState(35)
  const [showNotification, setShowNotification] = useState(false)

  useEffect(() => {
    // Show learning notification after a short delay
    const notificationTimer = setTimeout(() => {
      setShowNotification(true)
    }, 2000)

    return () => {
      clearTimeout(notificationTimer)
    }
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  }

  return (
    <main className="min-h-screen bg-slate-100 dark:bg-gray-950 dark:via-purple-950 dark:to-gray-950 text-slate-900 dark:text-white p-4">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-5 dark:opacity-10 animate-blob"></div>
        <div className="absolute top-3/4 right-1/4 w-64 h-64 bg-yellow-500 rounded-full mix-blend-multiply filter blur-3xl opacity-5 dark:opacity-10 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/2 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-5 dark:opacity-10 animate-blob animation-delay-4000"></div>
      </div>

      {showNotification && <Notification type="welcome" onClose={() => setShowNotification(false)} />}

      <div className="flex justify-between items-center mb-4 relative z-10">
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" asChild>
            <Link href="/">
              <Home className="h-4 w-4 mr-1" /> Home
            </Link>
          </Button>
          <Button variant="outline" size="sm" asChild>
            <Link href="/dashboard">
              <TrendingUp className="h-4 w-4 mr-1" /> Dashboard
            </Link>
          </Button>
        </div>
        <Button
          variant="outline"
          size="icon"
          className="rounded-full"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </Button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto relative z-10"
      >
        <Card className="bg-white dark:bg-gray-900/90 backdrop-blur-sm border-slate-200 dark:border-gray-800 mb-6 overflow-hidden shadow-xl">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-900 dark:to-cyan-900 pb-6 relative">
            <motion.div
              className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full -mt-16 -mr-16"
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 90, 0],
              }}
              transition={{
                duration: 15,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            />

            <motion.div
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.7, type: "spring" }}
            >
              <CardTitle className="text-2xl font-bold flex items-center text-white">
                <BookOpen className="mr-2 h-6 w-6" />
                Learning Center
              </CardTitle>
            </motion.div>

            <motion.div
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.1, type: "spring" }}
            >
              <CardDescription className="text-slate-200">Discover trading secrets and strategies</CardDescription>
            </motion.div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-sm font-medium text-slate-700 dark:text-slate-300">Your Progress</h3>
                <span className="text-sm text-slate-600 dark:text-slate-400">{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>

            <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-4">
              <motion.div variants={itemVariants}>
                <Card className="bg-slate-50 dark:bg-gray-800/70 border-slate-200 dark:border-gray-700 overflow-hidden">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-amber-500 to-yellow-500 flex items-center justify-center mr-4">
                          <Lightbulb className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <h3 className="font-medium text-slate-800 dark:text-white">Trading Fundamentals</h3>
                          <p className="text-sm text-slate-600 dark:text-slate-400">Basic concepts and strategies</p>
                        </div>
                      </div>
                      <Badge className="bg-green-600">Completed</Badge>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Card className="bg-slate-50 dark:bg-gray-800/70 border-slate-200 dark:border-gray-700 overflow-hidden">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mr-4">
                          <BarChart3 className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <h3 className="font-medium text-slate-800 dark:text-white">Advanced Analysis</h3>
                          <p className="text-sm text-slate-600 dark:text-slate-400">Chart patterns and indicators</p>
                        </div>
                      </div>
                      <Badge className="bg-blue-600">In Progress</Badge>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Card className="bg-slate-50 dark:bg-gray-800/70 border-slate-200 dark:border-gray-700 overflow-hidden">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center mr-4">
                          <Lock className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <h3 className="font-medium text-slate-800 dark:text-white">Upcoming Secret Logic</h3>
                          <p className="text-sm text-slate-600 dark:text-slate-400">Advanced trading algorithms</p>
                        </div>
                      </div>
                      <Badge variant="outline" className="border-purple-500 text-purple-600 dark:text-purple-400">
                        Coming Soon
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Card className="bg-slate-50 dark:bg-gray-800/70 border-slate-200 dark:border-gray-700 overflow-hidden">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-emerald-500 to-green-500 flex items-center justify-center mr-4">
                          <Calendar className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <h3 className="font-medium text-slate-800 dark:text-white">Upcoming Webinars</h3>
                          <p className="text-sm text-slate-600 dark:text-slate-400">Live trading sessions</p>
                        </div>
                      </div>
                      <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white">
                        Register
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="mt-8 bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-700 dark:to-indigo-700 rounded-lg p-6 text-white"
            >
              <div className="flex items-start">
                <Zap className="h-8 w-8 mr-4 text-yellow-300" />
                <div>
                  <h3 className="text-lg font-bold mb-2">Premium Trading Course</h3>
                  <p className="text-sm text-slate-200 mb-4">
                    Unlock our exclusive trading strategies and increase your success rate by 300%
                  </p>
                  <Button className="bg-white text-purple-600 hover:bg-slate-100">
                    Learn More <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          </CardContent>
          <CardFooter className="px-6 py-3 bg-slate-50 dark:bg-gray-900/80 border-t border-slate-200 dark:border-gray-800 flex justify-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
              className="text-xs text-center text-slate-500 dark:text-slate-400"
            >
              <span className="bg-gradient-to-r from-purple-600 to-pink-500 text-transparent bg-clip-text font-bold">
                AI Powered System
              </span>
            </motion.div>
          </CardFooter>
        </Card>
      </motion.div>
    </main>
  )
}
