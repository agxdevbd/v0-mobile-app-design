"use client"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { Lightbulb, VolumeIcon as VolumeUp, Languages, TrendingUp, Zap, AlertTriangle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function LearningContent() {
  const [language, setLanguage] = useState<"en" | "bn">("en")
  const [isPlaying, setIsPlaying] = useState<number | null>(null)
  const audioRefs = useRef<HTMLAudioElement[]>([])
  const [buttonSound] = useState(typeof Audio !== "undefined" ? new Audio("/click.mp3") : null)

  const playButtonSound = () => {
    if (buttonSound) {
      buttonSound.currentTime = 0
      buttonSound.play().catch((e) => console.log("Audio play failed:", e))
    }
  }

  const toggleLanguage = () => {
    playButtonSound()
    setLanguage(language === "en" ? "bn" : "en")
  }

  const playAudio = (index: number) => {
    playButtonSound()

    // Stop any currently playing audio
    if (isPlaying !== null && audioRefs.current[isPlaying]) {
      audioRefs.current[isPlaying].pause()
      audioRefs.current[isPlaying].currentTime = 0
    }

    // Play the selected audio
    if (audioRefs.current[index]) {
      audioRefs.current[index].play()
      setIsPlaying(index)

      // Reset when audio ends
      audioRefs.current[index].onended = () => {
        setIsPlaying(null)
      }
    }
  }

  const content = [
    {
      icon: <Lightbulb className="h-6 w-6 text-yellow-500" />,
      title: {
        en: "Investment Mindset",
        bn: "বিনিয়োগের মানসিকতা",
      },
      content: {
        en: "Investment is not about getting rich quick. It's about consistent effort, learning from mistakes, and making informed decisions. The market rewards patience and discipline.",
        bn: "বিনিয়োগ দ্রুত ধনী হওয়ার বিষয় নয়। এটি ধারাবাহিক প্রচেষ্টা, ভুল থেকে শেখা এবং সঠিক সিদ্ধান্ত নেওয়ার বিষয়। বাজার ধৈর্য এবং শৃঙ্খলাকে পুরস্কৃত করে।",
      },
    },
    {
      icon: <TrendingUp className="h-6 w-6 text-blue-500" />,
      title: {
        en: "Handling Losses",
        bn: "লস মোকাবেলা করা",
      },
      content: {
        en: "Losses are part of the journey. Don't be discouraged when you face a loss. Instead, analyze what went wrong, learn from it, and come back stronger. Every successful investor has faced losses.",
        bn: "লস যাত্রার একটি অংশ। আপনি যখন লস মুখোমুখি হন তখন নিরুৎসাহিত হবেন না। পরিবর্তে, কী ভুল হয়েছে তা বিশ্লেষণ করুন, এটি থেকে শিখুন এবং আরও শক্তিশালী হয়ে ফিরে আসুন। প্রতিটি সফল বিনিয়োগকারী লস মুখোমুখি হয়েছেন।",
      },
    },
    {
      icon: <Zap className="h-6 w-6 text-purple-500" />,
      title: {
        en: "Consistency is Key",
        bn: "ধারাবাহিকতাই মূল চাবিকাঠি",
      },
      content: {
        en: "Success comes from consistent action, not occasional bursts of effort. Make small, regular investments rather than waiting for the 'perfect' moment. Time in the market beats timing the market.",
        bn: "সাফল্য আসে ধারাবাহিক কর্ম থেকে, মাঝে মাঝে প্রচেষ্টার বিস্ফোরণ থেকে নয়। 'পারফেক্ট' মুহূর্তের জন্য অপেক্ষা করার পরিবর্তে ছোট, নিয়মিত বিনিয়োগ করুন। বাজারে সময় বাজারের সময়কে হারায়।",
      },
    },
    {
      icon: <AlertTriangle className="h-6 w-6 text-orange-500" />,
      title: {
        en: "Risk Management",
        bn: "ঝুঁকি ব্যবস্থাপনা",
      },
      content: {
        en: "Never invest more than you can afford to lose. Diversify your investments and always have a backup plan. Emotional decisions often lead to losses. Stay calm and stick to your strategy.",
        bn: "আপনি যা হারাতে পারেন তার চেয়ে বেশি কখনও বিনিয়োগ করবেন না। আপনার বিনিয়োগ বিভিন্ন করুন এবং সর্বদা একটি ব্যাকআপ পরিকল্পনা রাখুন। আবেগপ্রবণ সিদ্ধান্ত প্রায়ই লসের দিকে নিয়ে যায়। শান্ত থাকুন এবং আপনার কৌশলে অটল থাকুন।",
      },
    },
  ]

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
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-bold text-slate-800 dark:text-white flex items-center">
          <Lightbulb className="mr-2 h-5 w-5 text-yellow-600 dark:text-yellow-400" />
          {language === "en" ? "Investment Wisdom" : "বিনিয়োগের জ্ঞান"}
        </h3>
        <Button variant="outline" size="sm" className="flex items-center" onClick={toggleLanguage}>
          <Languages className="h-4 w-4 mr-1" />
          {language === "en" ? "বাংলা" : "English"}
        </Button>
      </div>

      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-4">
        {content.map((item, index) => (
          <motion.div key={index} variants={itemVariants}>
            <Card className="bg-white dark:bg-gray-800/70 border-slate-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-all">
              <CardContent className="p-4">
                <div className="flex items-start">
                  <div className="h-10 w-10 rounded-full bg-slate-100 dark:bg-gray-700 flex items-center justify-center mr-4 shrink-0">
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <h4 className="font-medium text-slate-800 dark:text-white">{item.title[language]}</h4>
                      <Button
                        variant="ghost"
                        size="icon"
                        className={`h-8 w-8 ${isPlaying === index ? "text-green-600 dark:text-green-400" : "text-slate-500 dark:text-slate-400"}`}
                        onClick={() => playAudio(index)}
                      >
                        <VolumeUp className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{item.content[language]}</p>
                    <audio
                      ref={(el) => {
                        if (el) audioRefs.current[index] = el
                      }}
                      src={`/audio-placeholder.mp3`}
                      className="hidden"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <div className="mt-6 bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-700 dark:to-indigo-700 rounded-lg p-4 text-white">
        <div className="flex items-center mb-2">
          <Badge className="bg-white/20 text-white border-none">PRO TIP</Badge>
        </div>
        <p className="text-sm">
          {language === "en"
            ? "The most successful investors are those who stay consistent, learn continuously, and never give up despite temporary setbacks."
            : "সবচেয়ে সফল বিনিয়োগকারীরা হলেন তারা যারা ধারাবাহিক থাকেন, নিরন্তর শেখেন এবং অস্থায়ী বাধা সত্ত্বেও কখনও হাল ছাড়েন না।"}
        </p>
      </div>
    </div>
  )
}
