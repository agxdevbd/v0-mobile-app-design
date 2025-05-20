"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { X, Home, BookOpen, DollarSign, Award, TrendingUp, Sun, Moon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog"
import { useTheme } from "next-themes"
import { Notification } from "@/components/notification"
import { useRouter } from "next/navigation"
import { TryAnimation } from "@/components/try-animation"
import { SuccessMotivation } from "@/components/success-motivation"
import { DigitalClock } from "@/components/digital-clock"

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
  const [showSuccessMotivation, setShowSuccessMotivation] = useState(false)
  const [buttonSound] = useState(typeof Audio !== "undefined" ? new Audio("/click.mp3") : null)

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationComplete(true)
    }, 1500)

    // Show welcome notification after a short delay
    const notificationTimer = setTimeout(() => {
      setShowWelcomeNotification(true)
    }, 2000)

    // Show success motivation after 10 seconds
    const motivationTimer = setTimeout(() => {
      setShowSuccessMotivation(true)
    }, 10000)

    return () => {
      clearTimeout(timer)
      clearTimeout(notificationTimer)
      clearTimeout(motivationTimer)
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
    <main className="min-h-screen bg-slate-100 dark:bg-gray-950 dark:via-purple-950 dark:to-gray-950 text-slate-900 dark:text-white p-4 pb-20">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-5 dark:opacity-10 animate-blob"></div>
        <div className="absolute top-3/4 right-1/4 w-64 h-64 bg-yellow-500 rounded-full mix-blend-multiply filter blur-3xl opacity-5 dark:opacity-10 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/2 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-5 dark:opacity-10 animate-blob animation-delay-4000"></div>
      </div>

      <TryAnimation />

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

      {showSuccessMotivation && <SuccessMotivation onClose={() => setShowSuccessMotivation(false)} />}

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
          <DigitalClock />
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
    </main>
  )
}
