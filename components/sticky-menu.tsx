"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { MessageSquare, TrendingUp, Clock, Heart, Coffee, Check } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { AIChat } from "@/components/ai-chat"
import { DonationForm } from "@/components/donation-form"
import { BreakApplication } from "@/components/break-application"

export function StickyMenu() {
  const [showAIChat, setShowAIChat] = useState(false)
  const [showInspiration, setShowInspiration] = useState(false)
  const [showDonation, setShowDonation] = useState(false)
  const [showBreakApplication, setShowBreakApplication] = useState(false)
  const [inspirationText, setInspirationText] = useState("")
  const [inspirationSaved, setInspirationSaved] = useState(false)
  const [subscriptionDays, setSubscriptionDays] = useState(28)
  const [buttonSound] = useState(typeof Audio !== "undefined" ? new Audio("/click.mp3") : null)

  const playButtonSound = () => {
    if (buttonSound) {
      buttonSound.currentTime = 0
      buttonSound.play().catch((e) => console.log("Audio play failed:", e))
    }
  }

  const saveInspiration = () => {
    playButtonSound()
    if (inspirationText.trim()) {
      setInspirationSaved(true)
      setTimeout(() => {
        setInspirationSaved(false)
        setInspirationText("")
        setShowInspiration(false)
      }, 2000)
    }
  }

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-slate-200 dark:border-gray-800 py-2 px-4 z-30">
        <div className="flex justify-between items-center max-w-md mx-auto">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="flex flex-col items-center"
            onClick={() => {
              playButtonSound()
              setShowAIChat(!showAIChat)
            }}
          >
            <div className="h-10 w-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-1">
              <MessageSquare className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            </div>
            <span className="text-xs text-slate-700 dark:text-slate-300">AI Chat</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="flex flex-col items-center"
            onClick={() => {
              playButtonSound()
              setShowDonation(true)
            }}
          >
            <div className="h-10 w-10 rounded-full bg-pink-100 dark:bg-pink-900/30 flex items-center justify-center mb-1">
              <Heart className="h-5 w-5 text-pink-600 dark:text-pink-400" />
            </div>
            <span className="text-xs text-slate-700 dark:text-slate-300">Donate</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="flex flex-col items-center relative"
            onClick={() => {
              playButtonSound()
            }}
          >
            <div className="h-14 w-14 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 flex items-center justify-center mb-1 -mt-5 border-4 border-white dark:border-gray-900">
              <Clock className="h-6 w-6 text-white" />
            </div>
            <span className="text-xs text-slate-700 dark:text-slate-300">{subscriptionDays} days</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="flex flex-col items-center"
            onClick={() => {
              playButtonSound()
              setShowInspiration(true)
            }}
          >
            <div className="h-10 w-10 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center mb-1">
              <TrendingUp className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
            </div>
            <span className="text-xs text-slate-700 dark:text-slate-300">Inspiration</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="flex flex-col items-center"
            onClick={() => {
              playButtonSound()
              setShowBreakApplication(true)
            }}
          >
            <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-1">
              <Coffee className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <span className="text-xs text-slate-700 dark:text-slate-300">Take Break</span>
          </motion.button>
        </div>
      </div>

      {showAIChat && <AIChat onClose={() => setShowAIChat(false)} />}

      {showDonation && <DonationForm onClose={() => setShowDonation(false)} />}

      {showBreakApplication && <BreakApplication onClose={() => setShowBreakApplication(false)} />}

      {showInspiration && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm p-4">
          <Card className="w-full max-w-md bg-white dark:bg-gray-900 border-slate-200 dark:border-gray-800 overflow-hidden shadow-xl">
            <CardContent className="p-6">
              {!inspirationSaved ? (
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-slate-800 dark:text-white">Tell us your inspiration</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Share what or who inspires you on your journey to success.
                  </p>
                  <Textarea
                    value={inspirationText}
                    onChange={(e) => setInspirationText(e.target.value)}
                    placeholder="I'm inspired by..."
                    className="min-h-[120px]"
                  />
                  <div className="flex justify-between">
                    <Button
                      variant="outline"
                      className="border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800"
                      onClick={() => {
                        playButtonSound()
                        setShowInspiration(false)
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      className="bg-gradient-to-r from-yellow-600 to-amber-600 hover:from-yellow-700 hover:to-amber-700 text-white"
                      onClick={saveInspiration}
                      disabled={!inspirationText.trim()}
                    >
                      Save
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center py-6">
                  <motion.div
                    initial={{ scale: 0, rotate: 0 }}
                    animate={{ scale: 1, rotate: 360 }}
                    transition={{ type: "spring", damping: 10 }}
                    className="bg-green-100 dark:bg-green-900/30 h-16 w-16 rounded-full flex items-center justify-center mb-4"
                  >
                    <Check className="h-8 w-8 text-green-600 dark:text-green-400" />
                  </motion.div>
                  <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">Saved!</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-center">
                    Thank you for sharing your inspiration.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </>
  )
}
