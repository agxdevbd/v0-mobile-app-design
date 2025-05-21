"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Home, BookOpen, DollarSign, Award, TrendingUp, Sun, Moon, CreditCard, Bell, Sparkles, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog"
import { useTheme } from "next-themes"
import { Notification } from "@/components/notification"
import { useRouter } from "next/navigation"
import { TryAnimation } from "@/components/try-animation"
import { SuccessMotivation } from "@/components/success-motivation"
import { DigitalClock } from "@/components/digital-clock"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { StickyMenu } from "@/components/sticky-menu"
import { OrdersInstructions } from "@/components/orders-instructions"
import { RulesSection } from "@/components/rules-section"
import { SuccessSection } from "@/components/success-section"
import { LearningContent } from "@/components/learning-content"
import { EidGreeting } from "@/components/eid-greeting"

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
  const [showEidGreeting, setShowEidGreeting] = useState(false)
  const [buttonSound] = useState(typeof Audio !== "undefined" ? new Audio("/click.mp3") : null)

  const notificationSoundRef = useRef(null)

  useEffect(() => {
    // Initialize notification sound
    if (typeof window !== "undefined") {
      notificationSoundRef.current = new Audio("/notification-sound.mp3")
      notificationSoundRef.current.volume = 1.0 // Maximum volume
    }

    const timer = setTimeout(() => {
      setAnimationComplete(true)
    }, 1500)

    // Show welcome notification after a short delay
    const notificationTimer = setTimeout(() => {
      setShowWelcomeNotification(true)
    }, 2000)

    // Show Eid greeting after welcome notification
    const eidTimer = setTimeout(() => {
      setShowEidGreeting(true)
      // Vibrate the phone for 1 second
      if (typeof window !== "undefined" && "navigator" in window && "vibrate" in navigator) {
        navigator.vibrate([200, 100, 200, 100, 200, 100, 200])
      }
    }, 5000)

    // Show success motivation after Eid greeting
    const motivationTimer = setTimeout(() => {
      setShowSuccessMotivation(true)
    }, 10000)

    return () => {
      clearTimeout(timer)
      clearTimeout(notificationTimer)
      clearTimeout(eidTimer)
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
      buttonSound.volume = 1.0 // Maximum volume
      buttonSound.play().catch((e) => console.log("Audio play failed:", e))

      // Vibrate the phone for 100ms
      if (typeof window !== "undefined" && "navigator" in window && "vibrate" in navigator) {
        navigator.vibrate(100)
      }
    }
  }

  const playNotificationSound = () => {
    if (typeof window !== "undefined" && notificationSoundRef.current) {
      notificationSoundRef.current.currentTime = 0
      notificationSoundRef.current.volume = 1.0 // Maximum volume
      notificationSoundRef.current.play().catch((e) => console.log("Audio play failed:", e))

      // Vibrate the phone for 500ms
      if (typeof window !== "undefined" && "navigator" in window && "vibrate" in navigator) {
        navigator.vibrate([100, 50, 100, 50, 100])
      }
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

  const UserCardDialog = ({ user, onClose }) => {
    if (!user) return null

    // Generate a card number based on user's id
    const generateCardNumber = (id) => {
      const baseNumber = "4921"
      const middlePart = String(id).padStart(4, "0")
      const endPart = Math.floor(Math.random() * 10000)
        .toString()
        .padStart(4, "0")
      const lastPart = Math.floor(Math.random() * 10000)
        .toString()
        .padStart(4, "0")
      return `${baseNumber} ${middlePart} ${endPart} ${lastPart}`
    }

    const cardNumber = generateCardNumber(user.id)
    const expiryDate = "05/28"
    const cvv = Math.floor(Math.random() * 900) + 100

    return (
      <Dialog open={true} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md bg-gray-900 border-gray-800">
          <div className="p-1">
            <div className="bg-gradient-to-br from-gray-900 to-black rounded-xl p-6 shadow-xl overflow-hidden relative">
              {/* Holographic effects */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full -mt-8 -mr-8 blur-xl"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500/10 rounded-full -mb-8 -ml-8 blur-xl"></div>

              {/* Card chip and design elements */}
              <div className="absolute top-6 right-6">
                <div className="w-10 h-6 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-md opacity-80"></div>
              </div>

              <div className="flex justify-between items-start mb-8">
                <div>
                  <div className="text-xs text-gray-500 mb-1">Premium Member</div>
                  <div className="text-xl font-bold text-white">XTH FOUND CARD</div>
                </div>
                <div className="flex space-x-1">
                  <div className="w-6 h-6 rounded-full bg-yellow-500/80 blur-[1px]"></div>
                  <div className="w-6 h-6 rounded-full bg-red-500/80 blur-[1px]"></div>
                </div>
              </div>

              <div className="mb-6">
                <div className="text-sm text-gray-500 mb-1">Card Number</div>
                <div className="text-lg font-mono text-white tracking-wider">{cardNumber}</div>
              </div>

              <div className="flex justify-between">
                <div>
                  <div className="text-xs text-gray-500 mb-1">Card Holder</div>
                  <div className="text-sm font-medium text-white">{user.name}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 mb-1">Expires</div>
                  <div className="text-sm font-medium text-white">{expiryDate}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 mb-1">CVV</div>
                  <div className="text-sm font-medium text-white">{cvv}</div>
                </div>
              </div>

              <div className="absolute bottom-6 right-6">
                <Sparkles className="h-6 w-6 text-purple-400/50" />
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-2">
            <Button
              className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white"
              onClick={() => {
                onClose()
                playButtonSound()
              }}
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <main className="min-h-screen bg-slate-100 dark:bg-gray-950 dark:via-purple-950 dark:to-gray-950 text-slate-900 dark:text-white p-4 pb-20">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-5 dark:opacity-10 animate-blob"></div>
        <div className="absolute top-3/4 right-1/4 w-64 h-64 bg-yellow-500 rounded-full mix-blend-multiply filter blur-3xl opacity-5 dark:opacity-10 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/2 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-5 dark:opacity-10 animate-blob animation-delay-4000"></div>
      </div>

      <TryAnimation />

      {showWelcomeNotification && (
        <Notification
          type="welcome"
          onClose={() => {
            setShowWelcomeNotification(false)
            playNotificationSound()
          }}
        />
      )}

      {showStatsNotification && (
        <Notification
          type="stats"
          stats={{ profit: "0%", return: "18%", members: 60 }}
          onClose={() => {
            setShowStatsNotification(false)
            playNotificationSound()
          }}
        />
      )}

      {showEidGreeting && <EidGreeting onClose={() => setShowEidGreeting(false)} />}

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

      {selectedMember && (
        <UserCardDialog
          user={selectedMember}
          onClose={() => {
            setSelectedMember(null)
            playButtonSound()
          }}
        />
      )}

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

      <div className="max-w-3xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="md:col-span-2 space-y-6">
            <OrdersInstructions />

            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold text-slate-800 dark:text-white">Members</h2>
                <Input
                  type="search"
                  placeholder="Search members..."
                  className="max-w-xs"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50 dark:bg-gray-800">
                    <tr>
                      <th className="px-4 py-2 text-left text-sm font-medium text-slate-500 dark:text-slate-400">ID</th>
                      <th className="px-4 py-2 text-left text-sm font-medium text-slate-500 dark:text-slate-400">
                        Name
                      </th>
                      <th className="px-4 py-2 text-left text-sm font-medium text-slate-500 dark:text-slate-400">
                        Amount
                      </th>
                      <th className="px-4 py-2 text-left text-sm font-medium text-slate-500 dark:text-slate-400">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-gray-700">
                    {filteredMembers.slice(0, 10).map((member) => (
                      <tr key={member.id} className={member.special ? "bg-purple-50 dark:bg-purple-900/20" : ""}>
                        <td className="px-4 py-3 text-sm text-slate-800 dark:text-slate-300">{member.id}</td>
                        <td className="px-4 py-3 text-sm text-slate-800 dark:text-slate-300 font-medium">
                          {member.name}
                          {member.special && (
                            <Badge className="ml-2 bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300">
                              Special
                            </Badge>
                          )}
                        </td>
                        <td className="px-4 py-3 text-sm text-slate-800 dark:text-slate-300">
                          ${member.amount.toLocaleString()}
                        </td>
                        <td className="px-4 py-3 text-sm">
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-900 hover:bg-purple-50 dark:hover:bg-purple-900/20"
                            onClick={() => {
                              setSelectedMember(member)
                              playButtonSound()
                            }}
                          >
                            <CreditCard className="h-3.5 w-3.5 mr-1" /> View Card
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {filteredMembers.length > 10 && (
                <div className="mt-4 text-center">
                  <Button variant="outline" onClick={() => playButtonSound()}>
                    Load More
                  </Button>
                </div>
              )}
            </div>

            <RulesSection />
          </div>

          <div className="space-y-6">
            <Card className="bg-white dark:bg-gray-900 border-slate-200 dark:border-gray-700 overflow-hidden">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-slate-800 dark:text-white">Stats</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300"
                    onClick={() => {
                      setShowStatsNotification(true)
                      playButtonSound()
                    }}
                  >
                    <Bell className="h-4 w-4" />
                  </Button>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600 dark:text-slate-400">Total Members:</span>
                    <span className="font-bold text-slate-800 dark:text-white">{members.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600 dark:text-slate-400">Active Members:</span>
                    <span className="font-bold text-slate-800 dark:text-white">42</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600 dark:text-slate-400">Success Rate:</span>
                    <span className="font-bold text-green-600 dark:text-green-400">87%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <SuccessSection />

            <LearningContent />
          </div>
        </div>
      </div>

      <StickyMenu />
    </main>
  )
}
