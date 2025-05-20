"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Check, X, Award, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent } from "@/components/ui/dialog"

interface QuizProps {
  onClose: () => void
}

export function Quiz({ onClose }: QuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [serialNumber, setSerialNumber] = useState("")
  const [showSuccess, setShowSuccess] = useState(false)

  useEffect(() => {
    // Generate random serial number
    const randomSerial = Math.floor(Math.random() * 900000) + 100000
    setSerialNumber(randomSerial.toString())
  }, [])

  const questions = [
    {
      question: "আপনার স্বপ্ন কি?",
      options: ["অনেক টাকা পয়সার মালিক হওয়া", "গাড়ি বাড়ি বিলাসী জীবন তৈরি করা", "সৎ ও যোগ্য মানুষ হওয়া", "দ্রুত সফলতা প্রয়োজন"],
      correctAnswer: 2, // Index of the correct option (0-based)
    },
    {
      question: "আপনার ইনভেস্টের ওপর কি চান? এটা থেকে কি আশা করেন?",
      options: ["প্রফিট লাগবেই", "যা হবে দেখা যাবে", "নিজের পিছনে ব্যয় এবং সামনে আগানো"],
      correctAnswer: 2,
    },
  ]

  const handleOptionSelect = (optionIndex: number) => {
    setSelectedOption(optionIndex)

    // Check if answer is correct
    if (optionIndex === questions[currentQuestion].correctAnswer) {
      // Show success notification
      setShowSuccess(true)
      setTimeout(() => {
        setShowSuccess(false)

        // Update score
        setScore(score + 25)

        // Move to next question or show result
        if (currentQuestion < questions.length - 1) {
          setCurrentQuestion(currentQuestion + 1)
          setSelectedOption(null)
        } else {
          setShowResult(true)
        }
      }, 1500)
    } else {
      // Show error briefly
      setTimeout(() => {
        setSelectedOption(null)
      }, 1000)
    }
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-white dark:bg-gray-900 p-0 overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-800 dark:to-indigo-800 text-white">
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <BookOpen className="h-5 w-5 mr-2" />
              <span>ছোট্ট পরীক্ষা</span>
            </div>
            <div className="text-xs bg-white/20 px-2 py-1 rounded-md">সিরিয়াল: {serialNumber}</div>
          </CardTitle>
        </CardHeader>

        <CardContent className="p-6">
          {!showResult ? (
            <>
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-4">
                  {currentQuestion + 1}. {questions[currentQuestion].question}
                </h3>

                <div className="space-y-3">
                  {questions[currentQuestion].options.map((option, index) => (
                    <motion.div key={index} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button
                        variant="outline"
                        className={`w-full justify-start text-left h-auto py-3 px-4 ${
                          selectedOption === index
                            ? selectedOption === questions[currentQuestion].correctAnswer
                              ? "border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300"
                              : "border-red-500 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300"
                            : "border-slate-200 dark:border-slate-700"
                        }`}
                        onClick={() => handleOptionSelect(index)}
                        disabled={selectedOption !== null}
                      >
                        <div className="flex items-center">
                          <div
                            className={`h-6 w-6 rounded-full mr-3 flex items-center justify-center ${
                              selectedOption === index
                                ? selectedOption === questions[currentQuestion].correctAnswer
                                  ? "bg-green-500 text-white"
                                  : "bg-red-500 text-white"
                                : "bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300"
                            }`}
                          >
                            {selectedOption === index ? (
                              selectedOption === questions[currentQuestion].correctAnswer ? (
                                <Check className="h-4 w-4" />
                              ) : (
                                <X className="h-4 w-4" />
                              )
                            ) : (
                              <span>{String.fromCharCode(65 + index)}</span>
                            )}
                          </div>
                          <span>{option}</span>
                        </div>
                      </Button>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="flex justify-between items-center text-sm text-slate-500 dark:text-slate-400">
                <div>
                  প্রশ্ন {currentQuestion + 1}/{questions.length}
                </div>
                <div>মোট মার্ক: {score}/100</div>
              </div>
            </>
          ) : (
            <div className="text-center py-6">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", damping: 10 }}
                className="mb-4"
              >
                <Award className="h-16 w-16 text-yellow-500 mx-auto" />
              </motion.div>

              <h3 className="text-xl font-bold mb-2">পরীক্ষা শেষ!</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                আপনার স্কোর: {score}/{questions.length * 25}
              </p>

              <Button
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white"
                onClick={onClose}
              >
                সমাপ্ত করুন
              </Button>
            </div>
          )}
        </CardContent>

        <AnimatePresence>
          {showSuccess && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-xl"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
              >
                <div className="text-center">
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                      rotate: [0, 10, -10, 0],
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    <Check className="h-12 w-12 text-green-500 mx-auto mb-2" />
                  </motion.div>
                  <h3 className="text-xl font-bold mb-1">কংগ্রেচুলেশন!</h3>
                  <p className="text-green-600 dark:text-green-400 font-bold text-2xl">+25 মার্ক</p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  )
}
