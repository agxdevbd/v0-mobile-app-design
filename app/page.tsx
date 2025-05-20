"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { ArrowRight, Moon, Sun, TrendingUp, BookOpen, ChevronRight, Bot } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useTheme } from "next-themes"
import { PinEntry } from "@/components/pin-entry"
import { LoadingScreen } from "@/components/loading-screen"
import { BangladeshTime } from "@/components/bangladesh-time"
import { ClimbingAnimation } from "@/components/climbing-animation"
import { SubscriptionPackage } from "@/components/subscription-package"
import { LocationNotification } from "@/components/location-notification"
import { EidGreeting } from "@/components/eid-greeting"

export default function Home() {
  const router = useRouter()
  const { theme, setTheme } = useTheme()
  const [isHovering, setIsHovering] = useState(false)
  const [isPinVerified, setIsPinVerified] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [showSubscription, setShowSubscription] = useState(false)
  const [showLocation, setShowLocation] = useState(false)
  const [showEidGreeting, setShowEidGreeting] = useState(false)
  const [buttonSound] = useState(typeof Audio !== "undefined" ? new Audio("/click.mp3") : null)

  useEffect(() => {
    // Check if user has already verified PIN in this session
    const pinVerified = sessionStorage.getItem("pinVerified")
    if (pinVerified === "true") {
      setIsPinVerified(true)
      setShowSubscription(true)
    }

    // Simulate loading screen
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  const playButtonSound = () => {
    if (buttonSound) {
      buttonSound.currentTime = 0
      buttonSound.play().catch((e) => console.log("Audio play failed:", e))
    }
  }

  const handlePinSuccess = () => {
    setIsPinVerified(true)
    sessionStorage.setItem("pinVerified", "true")
    setShowSubscription(true)
  }

  const handleSubscriptionContinue = () => {
    setShowSubscription(false)
    setShowLocation(true)

    // Show Eid greeting after location notification
    setTimeout(() => {
      setShowEidGreeting(true)
    }, 4000)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  }

  if (isLoading) {
    return <LoadingScreen />
  }

  if (!isPinVerified) {
    return <PinEntry onSuccess={handlePinSuccess} />
  }

  if (showSubscription) {
    return <SubscriptionPackage onContinue={handleSubscriptionContinue} />
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-100 to-slate-200 dark:from-gray-950 dark:via-purple-950 dark:to-gray-950 text-slate-900 dark:text-white p-4 flex flex-col">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 dark:opacity-20 animate-blob"></div>
        <div className="absolute top-3/4 right-1/4 w-64 h-64 bg-yellow-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 dark:opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/2 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 dark:opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {showLocation && <LocationNotification />}
      {showEidGreeting && <EidGreeting onClose={() => setShowEidGreeting(false)} />}

      <div className="absolute top-4 right-4 z-50 flex items-center space-x-2">
        <BangladeshTime />
        <Button
          variant="outline"
          size="icon"
          className="rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm"
          onClick={() => {
            playButtonSound()
            setTheme(theme === "dark" ? "light" : "dark")
          }}
        >
          {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>
      </div>

      <div className="flex-1 flex items-center justify-center relative z-10">
        <motion.div className="max-w-md w-full" initial="hidden" animate="visible" variants={containerVariants}>
          <motion.div className="text-center mb-8" variants={itemVariants}>
            <ClimbingAnimation />

            <h1 className="text-4xl font-bold mt-4 bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400 text-transparent bg-clip-text">
              CXT Trading Platform
            </h1>
            <p className="text-slate-600 dark:text-slate-300 mt-2">Advanced buy & sell management platform</p>
          </motion.div>

          <motion.div className="space-y-4" variants={containerVariants}>
            <motion.div variants={itemVariants}>
              <Card
                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-slate-200 dark:border-gray-700 overflow-hidden shadow-lg hover:shadow-xl transition-all"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="h-12 w-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center mr-4">
                        <TrendingUp className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold">Dashboard</h2>
                        <p className="text-sm text-slate-600 dark:text-slate-400">View member details and statistics</p>
                      </div>
                    </div>
                    <Button
                      className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                      onClick={() => {
                        playButtonSound()
                        router.push("/dashboard")
                      }}
                    >
                      <motion.div
                        className="flex items-center"
                        animate={isHovering ? { x: [0, 5, 0] } : {}}
                        transition={{ repeat: isHovering ? Number.POSITIVE_INFINITY : 0, duration: 1 }}
                      >
                        Enter <ArrowRight className="ml-2 h-4 w-4" />
                      </motion.div>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-slate-200 dark:border-gray-700 overflow-hidden shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="h-12 w-12 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center mr-4">
                        <BookOpen className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold">Learning Center</h2>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          Discover trading secrets and strategies
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      className="border-emerald-500 dark:border-emerald-400 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20"
                      onClick={() => {
                        playButtonSound()
                        router.push("/learning")
                      }}
                    >
                      Explore <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          <motion.div className="mt-8 text-center" variants={itemVariants}>
            <Badge className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white border-none">
              <Bot className="h-3 w-3 mr-1" />
              AI Powered
            </Badge>
          </motion.div>

          <motion.div className="mt-4 text-center text-sm text-slate-500 dark:text-slate-400" variants={itemVariants}>
            <motion.p
              animate={{
                color: ["#6366f1", "#8b5cf6", "#ec4899", "#6366f1"],
              }}
              transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY }}
              className="font-medium"
            >
              © 2025 CXT Trading Platform • Powered by CXT AI V1
            </motion.p>
          </motion.div>
        </motion.div>
      </div>
    </main>
  )
}
