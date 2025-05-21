"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import {
  Users,
  Star,
  Shield,
  Calendar,
  Eye,
  X,
  Bot,
  Sparkles,
  Home,
  BookOpen,
  Moon,
  Sun,
  DollarSign,
  MessageSquare,
  BookMarked,
  Award,
  TrendingUp,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog"
import { useTheme } from "next-themes"
import { Notification } from "@/components/notification"
import { BangladeshTime } from "@/components/bangladesh-time"
import { ClimbingAnimation } from "@/components/climbing-animation"
import { AIChat } from "@/components/ai-chat"
import { Quiz } from "@/components/quiz"
import { useRouter } from "next/navigation"

export default function Dashboard() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("dashboard")
  const [animationComplete, setAnimationComplete] = useState(false)
  const [selectedMember, setSelectedMember] = useState(null)
  const { theme, setTheme } = useTheme()
  const [showWelcomeNotification, setShowWelcomeNotification] = useState(false)
  const [showStatsNotification, setShowStatsNotification] = useState(false)
  const [showCostNotification, setShowCostNotification] = useState(false)
  const [showMembersSection, setShowMembersSection] = useState(false)
  const [memberWaitTime, setMemberWaitTime] = useState(300) // 5 minutes in seconds
  const [waitingForMembers, setWaitingForMembers] = useState(false)
  const [showAIChat, setShowAIChat] = useState(false)
  const [showQuiz, setShowQuiz] = useState(false)
  const [showTalkMarketDialog, setShowTalkMarketDialog] = useState(false)
  const [showSuccessDialog, setShowSuccessDialog] = useState(false)
  const [buttonSound] = useState(typeof Audio !== "undefined" ? new Audio("/click.mp3") : null)

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationComplete(true)
    }, 1500)

    // Show welcome notification after a short delay
    const notificationTimer = setTimeout(() => {
      setShowWelcomeNotification(true)
    }, 2000)

    return () => {
      clearTimeout(timer)
      clearTimeout(notificationTimer)
    }
  }, [])

  useEffect(() => {
    if (waitingForMembers && memberWaitTime > 0) {
      const timer = setTimeout(() => {
        setMemberWaitTime(memberWaitTime - 1)
      }, 1000)

      return () => clearTimeout(timer)
    } else if (waitingForMembers && memberWaitTime === 0) {
      setShowMembersSection(true)
      setWaitingForMembers(false)
    }
  }, [waitingForMembers, memberWaitTime])

  const playButtonSound = () => {
    if (buttonSound) {
      buttonSound.currentTime = 0
      buttonSound.play().catch((e) => console.log("Audio play failed:", e))
    }
  }

  // Generate member names and amounts
  const generateMembers = () => {
    const cartoonNames = [
      "Golap Bangla",
      "Motu Patlu",
      "Ninja Hattori",
      "Doraemon",
      "Shinchan",
      "Nobita",
      "Gian",
      "Suneo",
      "Perman",
      "Kiteretsu",
      "Tom Cat",
      "Jerry Mouse",
      "Popeye",
      "Olive Oyl",
      "Bluto",
      "Mickey Mouse",
      "Donald Duck",
      "Goofy",
      "Bugs Bunny",
      "Daffy Duck",
      "Road Runner",
      "Wile E. Coyote",
      "Scooby-Doo",
      "Shaggy Rogers",
      "Fred Flintstone",
      "Barney Rubble",
      "George Jetson",
      "Yogi Bear",
      "Boo-Boo Bear",
      "Huckleberry Hound",
      "Snagglepuss",
      "Quick Draw McGraw",
      "Baba Lokenath",
      "Mizan Bangla",
      "Karim Khan",
      "Rahim Mia",
      "Jamal Hossain",
      "Kamal Ahmed",
      "Sohel Rana",
      "Masud Parvez",
      "Alamgir Khan",
      "Faruk Ahmed",
      "Jahangir Alam",
      "Monir Hossain",
      "Liton Das",
      "Shakib Khan",
      "Manna Hero",
      "Dipjol Star",
      "Rubel Mia",
      "Jashim Actor",
      "Razzak Legend",
      "Kazi Hayat",
      "Humayun Faridi",
      "Misha Sawdagor",
      "Ilias Kanchan",
      "Ferdous Ahmed",
      "Riaz Uddin",
      "Bapparaj Star",
    ]

    // Shuffle the array to randomize names
    const shuffledNames = [...cartoonNames].sort(() => Math.random() - 0.5)

    // Generate random members
    const members = []

    // Insert Dadu X at position 9
    const daduXPosition = 8 // Index 8 is position 9

    // Create members with varying amounts
    for (let i = 0; i < 59; i++) {
      const name = shuffledNames[i % shuffledNames.length]

      // Determine if this member should have a lower amount (10-20 members)
      const isLowerAmount = i < 20 && i !== daduXPosition

      let amount
      if (isLowerAmount) {
        // $400 to $1200 for 10-20 members
        amount = Math.floor(Math.random() * 801) + 400
      } else if (i !== daduXPosition) {
        // $10,000 to $25,000 for the rest
        amount = Math.floor(Math.random() * 15001) + 10000
      }

      // Generate a random date in May (before June)
      const day = Math.floor(Math.random() * 31) + 1
      const repaymentDate = `May ${day}, 2025`

      // Skip the position where Dadu X will be inserted
      if (i === daduXPosition) continue

      members.push({
        id: i + 1,
        name: name,
        amount,
        verified: true,
        special: false,
        repaymentDate,
      })
    }

    // Insert Dadu X at position 9 with specific June dates
    members.splice(daduXPosition, 0, {
      id: 9,
      name: "Dadu X",
      amount: 400,
      verified: true,
      special: true,
      repaymentDate: "June 2, 2025",
      secondRepaymentDate: "June 10, 2025",
    })

    return members
  }

  const members = generateMembers()

  const filteredMembers = members.filter((member) => member.name.toLowerCase().includes(searchTerm.toLowerCase()))

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  }

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`
  }

  return (
    <main className="min-h-screen bg-slate-100 dark:bg-gray-950 dark:via-purple-950 dark:to-gray-950 text-slate-900 dark:text-white p-4">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-5 dark:opacity-10 animate-blob"></div>
        <div className="absolute top-3/4 right-1/4 w-64 h-64 bg-yellow-500 rounded-full mix-blend-multiply filter blur-3xl opacity-5 dark:opacity-10 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/2 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-5 dark:opacity-10 animate-blob animation-delay-4000"></div>
      </div>

      {showWelcomeNotification && <Notification type="welcome" onClose={() => setShowWelcomeNotification(false)} />}

      {showStatsNotification && (
        <Notification
          type="stats"
          stats={{ profit: "0%", return: "18%", members: 60 }}
          onClose={() => setShowStatsNotification(false)}
        />
      )}

      {showCostNotification && (
        <Dialog open={showCostNotification} onOpenChange={setShowCostNotification}>
          <DialogContent className="sm:max-w-md bg-white dark:bg-gray-900">
            <DialogHeader>
              <DialogTitle className="flex items-center">
                <DollarSign className="h-5 w-5 mr-2 text-green-600 dark:text-green-400" />
                ওয়েবসাইট ব্যয়
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="bg-slate-50 dark:bg-gray-800 p-4 rounded-md">
                <div className="flex justify-between items-center">
                  <span className="text-slate-700 dark:text-slate-300">মোট ব্যয়:</span>
                  <span className="font-bold text-green-600 dark:text-green-400">২২,৭০,০০০ টাকা</span>
                </div>
              </div>
              <div className="bg-slate-50 dark:bg-gray-800 p-4 rounded-md">
                <div className="flex justify-between items-center">
                  <span className="text-slate-700 dark:text-slate-300">মাসিক ব্যয়:</span>
                  <span className="font-bold text-green-600 dark:text-green-400">৭,৫০০ USD</span>
                </div>
              </div>
            </div>
            <DialogClose asChild>
              <Button
                variant="outline"
                className="w-full mt-2 border-slate-200 dark:border-gray-700 text-slate-800 dark:text-white hover:bg-slate-100 dark:hover:bg-gray-800"
                onClick={() => playButtonSound()}
              >
                <X className="h-4 w-4 mr-2" /> ক্লোজ করুন
              </Button>
            </DialogClose>
          </DialogContent>
        </Dialog>
      )}

      {showTalkMarketDialog && (
        <Dialog open={showTalkMarketDialog} onOpenChange={setShowTalkMarketDialog}>
          <DialogContent className="sm:max-w-md bg-white dark:bg-gray-900">
            <DialogHeader>
              <DialogTitle className="flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400" />
                টক মার্কেট সম্পর্কে
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <p className="text-slate-700 dark:text-slate-300 text-sm">
                টক মার্কেটে বিনিয়োগ করা একটি সুবর্ণ সুযোগ। আপনার অর্থ বিনিয়োগ করে আপনি অল্প সময়ে বেশি লাভ করতে পারেন।
              </p>
              <p className="text-slate-700 dark:text-slate-300 text-sm">
                আমাদের সিস্টেম আপনাকে সঠিক সময়ে সঠিক সিদ্ধান্ত নিতে সাহায্য করবে। আপনার টাকার প্রতি মায়া রাখুন, কিন্তু ভয় পাবেন না।
              </p>
              <p className="text-slate-700 dark:text-slate-300 text-sm font-medium">
                নিয়মিত টক কিনুন এবং বিক্রি করুন, আপনার ডিপোজিট বাড়ান। সফলতা আপনার অপেক্ষায় আছে।
              </p>
            </div>
            <DialogClose asChild>
              <Button
                className="w-full mt-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white"
                onClick={() => playButtonSound()}
              >
                বুঝেছি
              </Button>
            </DialogClose>
          </DialogContent>
        </Dialog>
      )}

      {showSuccessDialog && (
        <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
          <DialogContent className="sm:max-w-md bg-white dark:bg-gray-900">
            <DialogHeader>
              <DialogTitle className="flex items-center">
                <Award className="h-5 w-5 mr-2 text-yellow-600 dark:text-yellow-400" />
                আমাদের সাকসেসফুল প্রাপ্তি
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-700 dark:to-indigo-700 text-white p-4 rounded-md">
                <p className="text-center font-medium mb-2">আপনার স্বপ্নের চেয়েও বেশি</p>
                <p className="text-sm text-center">
                  সফল হলে আপনি পাবেন এমন একটি পুরস্কার যা আপনি কখনো কল্পনাও করেননি। আপনার জীবন পরিবর্তন হয়ে যাবে।
                </p>
              </div>
              <p className="text-slate-700 dark:text-slate-300 text-sm">
                আমাদের সিস্টেমে সফল হওয়া প্রত্যেক ব্যক্তি পেয়েছেন তাদের জীবনের সেরা উপহার। আপনিও পেতে পারেন।
              </p>
              <p className="text-slate-700 dark:text-slate-300 text-sm font-medium">
                সফলতার জন্য প্রতিদিন চেষ্টা করুন, আমাদের নিয়ম মেনে চলুন, এবং আপনার লক্ষ্যে পৌঁছান।
              </p>
            </div>
            <DialogClose asChild>
              <Button
                className="w-full mt-2 bg-gradient-to-r from-yellow-600 to-amber-600 hover:from-yellow-700 hover:to-amber-700 text-white"
                onClick={() => playButtonSound()}
              >
                আমি সফল হব
              </Button>
            </DialogClose>
          </DialogContent>
        </Dialog>
      )}

      {showAIChat && <AIChat onClose={() => setShowAIChat(false)} />}

      {showQuiz && <Quiz onClose={() => setShowQuiz(false)} />}

      <div className="flex justify-between items-center mb-4 relative z-10">
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" asChild onClick={() => playButtonSound()}>
            <Link href="/">
              <Home className="h-4 w-4 mr-1" /> Home
            </Link>
          </Button>
          <Button variant="outline" size="sm" asChild onClick={() => playButtonSound()}>
            <Link href="/learning">
              <BookOpen className="h-4 w-4 mr-1" /> Learning
            </Link>
          </Button>
        </div>
        <div className="flex items-center space-x-2">
          <BangladeshTime />
          <Button
            variant="outline"
            size="icon"
            className="rounded-full"
            onClick={() => {
              playButtonSound()
              setTheme(theme === "dark" ? "light" : "dark")
            }}
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md mx-auto relative z-10"
      >
        <Card className="bg-white dark:bg-gray-900/90 backdrop-blur-sm border-slate-200 dark:border-gray-800 mb-4 overflow-hidden shadow-xl">
          <CardHeader className="bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-900 dark:to-indigo-900 pb-8 relative">
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
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="absolute -top-10 -left-10 w-40 h-40 bg-indigo-500 opacity-10 rounded-full"
            />

            <ClimbingAnimation />

            <motion.div
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.1, type: "spring" }}
            >
              <CardDescription className="text-slate-200">
                <span className="flex items-center">
                  <Bot className="mr-1 h-4 w-4 text-cyan-400" />
                  AI Control
                </span>
              </CardDescription>
            </motion.div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-2 gap-3 mb-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
                onClick={() => {
                  playButtonSound()
                  setShowStatsNotification(true)
                }}
              >
                <Card className="bg-slate-50 dark:bg-gray-800/70 backdrop-blur-sm border-slate-200 dark:border-gray-700 overflow-hidden cursor-pointer hover:shadow-md transition-all">
                  <CardContent className="p-3">
                    <div className="flex items-center">
                      <Star className="h-5 w-5 mr-2 text-yellow-600 dark:text-yellow-400" />
                      <div>
                        <div className="text-sm font-medium text-slate-700 dark:text-white">Community Details</div>
                        <div className="text-xs text-slate-500 dark:text-slate-400">View stats</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
                onClick={() => {
                  playButtonSound()
                  setShowCostNotification(true)
                }}
              >
                <Card className="bg-slate-50 dark:bg-gray-800/70 backdrop-blur-sm border-slate-200 dark:border-gray-700 overflow-hidden cursor-pointer hover:shadow-md transition-all">
                  <CardContent className="p-3">
                    <div className="flex items-center">
                      <DollarSign className="h-5 w-5 mr-2 text-green-600 dark:text-green-400" />
                      <div>
                        <div className="text-sm font-medium text-slate-700 dark:text-white">ওয়েবসাইট ব্যয়</div>
                        <div className="text-xs text-slate-500 dark:text-slate-400">View costs</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
                onClick={() => {
                  playButtonSound()
                  setShowTalkMarketDialog(true)
                }}
              >
                <Card className="bg-slate-50 dark:bg-gray-800/70 backdrop-blur-sm border-slate-200 dark:border-gray-700 overflow-hidden cursor-pointer hover:shadow-md transition-all">
                  <CardContent className="p-3">
                    <div className="flex items-center">
                      <TrendingUp className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400" />
                      <div>
                        <div className="text-sm font-medium text-slate-700 dark:text-white">টক মার্কেট সম্পর্কে</div>
                        <div className="text-xs text-slate-500 dark:text-slate-400">View details</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
                onClick={() => {
                  playButtonSound()
                  setShowSuccessDialog(true)
                }}
              >
                <Card className="bg-slate-50 dark:bg-gray-800/70 backdrop-blur-sm border-slate-200 dark:border-gray-700 overflow-hidden cursor-pointer hover:shadow-md transition-all">
                  <CardContent className="p-3">
                    <div className="flex items-center">
                      <Award className="h-5 w-5 mr-2 text-yellow-600 dark:text-yellow-400" />
                      <div>
                        <div className="text-sm font-medium text-slate-700 dark:text-white">সাকসেসফুল প্রাপ্তি</div>
                        <div className="text-xs text-slate-500 dark:text-slate-400">View rewards</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
                onClick={() => {
                  playButtonSound()
                  setShowQuiz(true)
                }}
              >
                <Card className="bg-slate-50 dark:bg-gray-800/70 backdrop-blur-sm border-slate-200 dark:border-gray-700 overflow-hidden cursor-pointer hover:shadow-md transition-all">
                  <CardContent className="p-3">
                    <div className="flex items-center">
                      <BookOpen className="h-5 w-5 mr-2 text-purple-600 dark:text-purple-400" />
                      <div>
                        <div className="text-sm font-medium text-slate-700 dark:text-white">ছোট্ট পরীক্ষা</div>
                        <div className="text-xs text-slate-500 dark:text-slate-400">পরীক্ষা দাও</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
                onClick={() => {
                  playButtonSound()
                  setShowAIChat(!showAIChat)
                }}
              >
                <Card className="bg-slate-50 dark:bg-gray-800/70 backdrop-blur-sm border-slate-200 dark:border-gray-700 overflow-hidden cursor-pointer hover:shadow-md transition-all">
                  <CardContent className="p-3">
                    <div className="flex items-center">
                      <MessageSquare className="h-5 w-5 mr-2 text-cyan-600 dark:text-cyan-400" />
                      <div>
                        <div className="text-sm font-medium text-slate-700 dark:text-white">AI Assistant</div>
                        <div className="text-xs text-slate-500 dark:text-slate-400">Ask questions</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
              onClick={() => {
                playButtonSound()
                if (!showMembersSection && !waitingForMembers) {
                  setWaitingForMembers(true)
                }
              }}
              className="mb-4"
            >
              <Card className="bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-700 dark:to-indigo-700 text-white overflow-hidden cursor-pointer hover:shadow-md transition-all">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Users className="h-5 w-5 mr-2" />
                      <div>
                        <div className="font-medium">Member Community Tough</div>
                        <div className="text-xs text-white/70">View all members</div>
                      </div>
                    </div>
                    {waitingForMembers ? (
                      <div className="text-sm bg-white/20 px-2 py-1 rounded">{formatTime(memberWaitTime)}</div>
                    ) : (
                      <Badge className="bg-white/20 hover:bg-white/30">Visit</Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
              className="mb-4"
              onClick={() => {
                playButtonSound()
                window.open("https://example.com/books", "_blank")
              }}
            >
              <Card className="bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-700 dark:to-teal-700 text-white overflow-hidden cursor-pointer hover:shadow-md transition-all">
                <CardContent className="p-4">
                  <div className="flex items-center">
                    <BookMarked className="h-5 w-5 mr-2" />
                    <div>
                      <div className="font-medium">GOOD NEWS! 📚✨</div>
                      <div className="text-xs text-white/70 mt-1">IF YOU DO GOOD, AI WILL HELP YOU MOVE FORWARD</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {showMembersSection && (
              <div className="space-y-4">
                <div className="relative">
                  <Input
                    placeholder="Search members..."
                    className="bg-slate-50 dark:bg-gray-800/50 backdrop-blur-sm border-slate-200 dark:border-gray-700 pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <Users className="absolute left-2 top-2.5 h-4 w-4 text-slate-500 dark:text-slate-400" />
                </div>

                <motion.div
                  className="space-y-2 max-h-[60vh] overflow-y-auto pr-1"
                  variants={containerVariants}
                  initial="hidden"
                  animate={animationComplete ? "visible" : "hidden"}
                >
                  {filteredMembers.map((member, index) => (
                    <motion.div
                      key={member.id}
                      variants={itemVariants}
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Card
                        className={`bg-white dark:bg-gray-800/70 backdrop-blur-sm border-slate-200 dark:border-gray-700 hover:bg-slate-50 dark:hover:bg-gray-800/90 transition-all ${
                          member.special ? "border-l-4 border-l-yellow-500" : ""
                        }`}
                      >
                        <CardContent className="p-3 flex justify-between items-center">
                          <div className="flex items-center gap-3">
                            <div className="relative">
                              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-600 to-indigo-700 flex items-center justify-center">
                                <Sparkles className="h-5 w-5 text-white" />
                              </div>
                            </div>
                            <div>
                              <div className="font-medium flex items-center text-slate-800 dark:text-white">
                                {member.name}
                                {member.verified && (
                                  <motion.div
                                    whileHover={{ rotate: 360 }}
                                    transition={{ duration: 0.5 }}
                                    className="ml-1"
                                  >
                                    <Badge
                                      className={`ml-1 ${
                                        member.special
                                          ? "bg-gradient-to-r from-yellow-500 to-amber-500 text-white"
                                          : "bg-gradient-to-r from-emerald-500 to-green-600 text-white"
                                      }`}
                                    >
                                      <Shield className="h-3 w-3 mr-1" /> Verified
                                    </Badge>
                                  </motion.div>
                                )}
                              </div>
                              <div className="text-xs text-slate-500 dark:text-slate-400">Member #{member.id}</div>
                            </div>
                          </div>
                          <div className="flex flex-col items-end">
                            <div
                              className={`font-bold ${
                                member.special
                                  ? "text-yellow-600 dark:text-yellow-400"
                                  : member.amount < 1500
                                    ? "text-orange-600 dark:text-orange-400"
                                    : "text-green-600 dark:text-green-400"
                              }`}
                            >
                              ${member.amount.toLocaleString()}
                            </div>
                            <div className="text-xs text-slate-500 dark:text-slate-400">Support from Agency</div>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 px-2 text-xs text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 hover:bg-slate-100 dark:hover:bg-gray-700/50 mt-1"
                              onClick={() => {
                                playButtonSound()
                                setSelectedMember(member)
                              }}
                            >
                              <Eye className="h-3 w-3 mr-1" /> Details
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            )}
          </CardContent>
          <CardFooter className="px-6 py-3 bg-slate-50 dark:bg-gray-900/80 border-t border-slate-200 dark:border-gray-800 flex justify-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
              className="text-xs text-center text-slate-500 dark:text-slate-400"
            >
              <span className="bg-gradient-to-r from-purple-600 to-pink-500 text-transparent bg-clip-text font-bold">
                Powered by CXT AI V1
              </span>
            </motion.div>
          </CardFooter>
        </Card>
      </motion.div>

      {/* Member Details Dialog */}
      <AnimatePresence>
        {selectedMember && (
          <Dialog open={!!selectedMember} onOpenChange={() => setSelectedMember(null)}>
            <DialogContent className="bg-white dark:bg-gray-900 border-slate-200 dark:border-gray-800 text-slate-900 dark:text-white max-w-sm">
              <DialogHeader>
                <DialogTitle className="flex items-center">
                  <Sparkles className="h-5 w-5 mr-2 text-yellow-600 dark:text-yellow-400" />
                  {selectedMember.name} Details
                </DialogTitle>
                <DialogDescription className="text-slate-500 dark:text-slate-400">
                  Member #{selectedMember.id}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="flex justify-center">
                  <div className="h-20 w-20 rounded-full bg-gradient-to-br from-purple-600 to-indigo-700 flex items-center justify-center">
                    <Sparkles className="h-10 w-10 text-white" />
                  </div>
                </div>

                <div className="bg-slate-50 dark:bg-gray-800 p-3 rounded-md">
                  <div className="text-sm text-slate-500 dark:text-slate-400">Support Amount</div>
                  <div
                    className={`text-xl font-bold ${
                      selectedMember.special
                        ? "text-yellow-600 dark:text-yellow-400"
                        : selectedMember.amount < 1500
                          ? "text-orange-600 dark:text-orange-400"
                          : "text-green-600 dark:text-green-400"
                    }`}
                  >
                    ${selectedMember.amount.toLocaleString()}
                  </div>
                </div>

                <div className="bg-slate-50 dark:bg-gray-800 p-3 rounded-md">
                  <div className="text-sm text-slate-500 dark:text-slate-400">Repayment Date</div>
                  <div className="flex items-center text-slate-800 dark:text-white">
                    <Calendar className="h-4 w-4 mr-2 text-cyan-600 dark:text-cyan-400" />
                    {selectedMember.repaymentDate}
                  </div>

                  {selectedMember.secondRepaymentDate && (
                    <div className="flex items-center text-slate-800 dark:text-white mt-2">
                      <Calendar className="h-4 w-4 mr-2 text-cyan-600 dark:text-cyan-400" />
                      {selectedMember.secondRepaymentDate}
                    </div>
                  )}
                </div>

                <div className="bg-slate-50 dark:bg-gray-800 p-3 rounded-md">
                  <div className="text-sm text-slate-500 dark:text-slate-400">Status</div>
                  <div className="flex items-center">
                    <Badge
                      className={`${
                        selectedMember.special
                          ? "bg-gradient-to-r from-yellow-500 to-amber-500 text-white"
                          : "bg-gradient-to-r from-emerald-500 to-green-600 text-white"
                      }`}
                    >
                      <Shield className="h-3 w-3 mr-1" /> Verified
                    </Badge>
                  </div>
                </div>
              </div>
              <DialogClose asChild>
                <Button
                  variant="outline"
                  className="w-full mt-2 border-slate-200 dark:border-gray-700 text-slate-800 dark:text-white hover:bg-slate-100 dark:hover:bg-gray-800"
                  onClick={() => playButtonSound()}
                >
                  <X className="h-4 w-4 mr-2" /> Close
                </Button>
              </DialogClose>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
    </main>
  )
}
