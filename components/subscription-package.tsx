"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Check, Calendar, Gift, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

interface SubscriptionPackageProps {
  onContinue: () => void
}

export function SubscriptionPackage({ onContinue }: SubscriptionPackageProps) {
  const [daysLeft, setDaysLeft] = useState(28)
  const [progress, setProgress] = useState(100)
  const [buttonSound] = useState(typeof Audio !== "undefined" ? new Audio("/click.mp3") : null)

  useEffect(() => {
    // Calculate days left based on localStorage or set to 28 if not found
    const storedStartDate = localStorage.getItem("subscriptionStartDate")
    if (storedStartDate) {
      const startDate = new Date(storedStartDate)
      const currentDate = new Date()
      const timeDiff = new Date(startDate.getTime() + 28 * 24 * 60 * 60 * 1000).getTime() - currentDate.getTime()
      const daysRemaining = Math.max(0, Math.ceil(timeDiff / (1000 * 60 * 60 * 24)))
      setDaysLeft(daysRemaining)
      setProgress((daysRemaining / 28) * 100)
    } else {
      // Set new subscription start date
      localStorage.setItem("subscriptionStartDate", new Date().toISOString())
    }
  }, [])

  const playButtonSound = () => {
    if (buttonSound) {
      buttonSound.currentTime = 0
      buttonSound.play().catch((e) => console.log("Audio play failed:", e))
    }
  }

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", damping: 20 }}
          className="w-full max-w-md"
        >
          <Card className="bg-white dark:bg-gray-900 border-slate-200 dark:border-gray-800 overflow-hidden shadow-xl">
            <CardHeader className="bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-800 dark:to-indigo-800 p-6 text-white">
              <div className="flex justify-between items-center">
                <CardTitle className="text-2xl font-bold">মাসিক ফি</CardTitle>
                <Badge className="bg-white/20 text-white">Premium</Badge>
              </div>
              <div className="mt-4 flex items-center">
                <div className="text-3xl font-bold line-through opacity-70 mr-2">$19.99</div>
                <div className="text-4xl font-bold">FREE</div>
              </div>
              <div className="mt-2 flex items-center">
                <Gift className="h-5 w-5 mr-2 text-yellow-300" />
                <span>এই মাসের ফি ফ্রি!</span>
              </div>
            </CardHeader>

            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 mr-2 text-purple-600 dark:text-purple-400" />
                    <span className="text-slate-700 dark:text-slate-300">সাবস্ক্রিপশন মেয়াদ</span>
                  </div>
                  <span className="font-bold text-slate-900 dark:text-white">28 দিন</span>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600 dark:text-slate-400">বাকি আছে</span>
                    <span className="font-medium text-slate-800 dark:text-slate-200">{daysLeft} দিন</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>

                <div className="space-y-2">
                  <div className="flex items-start">
                    <div className="h-5 w-5 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mt-0.5 mr-2 shrink-0">
                      <Check className="h-3 w-3 text-green-600 dark:text-green-400" />
                    </div>
                    <span className="text-sm text-slate-700 dark:text-slate-300">সম্পূর্ণ ড্যাশবোর্ড অ্যাক্সেস</span>
                  </div>
                  <div className="flex items-start">
                    <div className="h-5 w-5 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mt-0.5 mr-2 shrink-0">
                      <Check className="h-3 w-3 text-green-600 dark:text-green-400" />
                    </div>
                    <span className="text-sm text-slate-700 dark:text-slate-300">AI সাপোর্ট এবং লার্নিং সেকশন</span>
                  </div>
                  <div className="flex items-start">
                    <div className="h-5 w-5 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mt-0.5 mr-2 shrink-0">
                      <Check className="h-3 w-3 text-green-600 dark:text-green-400" />
                    </div>
                    <span className="text-sm text-slate-700 dark:text-slate-300">সম্পূর্ণ কমিউনিটি অ্যাক্সেস</span>
                  </div>
                </div>

                <div className="bg-slate-50 dark:bg-gray-800 p-3 rounded-md text-sm text-center">
                  <p className="text-slate-700 dark:text-slate-300">
                    <span className="font-medium">নোট:</span> সাবস্ক্রিপশনের ৫০% সার্বিক এবং মানুষের সেবায় ব্যয় করা হয় এবং ৫০% খরচ
                    হিসেবে গণ্য করা হয়।
                  </p>
                </div>
              </div>
            </CardContent>

            <CardFooter className="p-6 pt-0 flex flex-col">
              <Button
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white"
                onClick={() => {
                  playButtonSound()
                  onContinue()
                }}
              >
                <span className="mr-2">OPEN</span>
                <Clock className="h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
