"use client"

import { motion } from "framer-motion"
import { Award, Clock, Heart, Zap, Star } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export function SuccessSection() {
  const sections = [
    {
      icon: <Clock className="h-6 w-6 text-blue-500" />,
      title: "সফলতার সময়",
      content:
        "সফল হওয়ার কোন নির্দিষ্ট সময় নাই। একদিনও লাগতে পারে, এক মাসও লাগতে পারে, এক বছর লাগতে পারে, ১০ বছর লাগতে পারে, এক যুগ পর্যন্ত লাগতে পারে। কিন্তু চেষ্টা ছাড়া যাবে না।",
    },
    {
      icon: <Heart className="h-6 w-6 text-red-500" />,
      title: "বিশ্বাস",
      content: "কেউ কখনো কারো সাথে বিশ্বাসঘাতকতা বা বিশ্বাস নিয়ে কোন সমস্যা করবা না। বিশ্বাস অনেক বড় একটা জিনিস যেটা টাকা দিয়ে কেনা যায় না।",
    },
    {
      icon: <Zap className="h-6 w-6 text-yellow-500" />,
      title: "মেন্টর নোটিশ",
      content:
        "আমি এই সিদ্ধান্ত নিজের ওপর অনেক চাপ এবং কষ্ট নিয়ে করেছি। আমার পক্ষে এত ফান্ড ম্যানেজ করা সম্ভব হতো না। আপনারা আমাকে সাহায্য করেছেন, আপনাদের প্রতি আমি কৃতজ্ঞ। আপনাদের জন্য আমি আজকে এইটার একজন পরিচালক হতে পেরেছি। আপনারা জানেন এই আপনাদের এত সুন্দর একটা ম্যানেজমেন্ট করার জন্য প্রায় অনেক ফান্ড এটার পিছনে ব্যয় করা হয়েছে এবং এটার প্রতি মাসে খরচ আছে। এগুলো আমি শুধুমাত্র আপনাদের জন্য করতে করেছি এবং আপনারা এইটার সম্মান টা বজায় রাখবেন। ধন্যবাদ।",
    },
    {
      icon: <Star className="h-6 w-6 text-amber-500" />,
      title: "এজেন্সি ফান্ড",
      content:
        "তোমাদের জন্য আমার চেষ্টা সব সময় থাকবে। তোমাদের পিছনে আমি সময় এবং অর্থ দুইটাই খরচ করতে বাধ্য। তোমরা আমার কথাগুলো রেখো, কখনো পিছুটান বা নিজেদের ক্ষতি বা অন্যের ক্ষতি এগুলা করবা না। নিজেকে একজন সৎ এবং পরিশ্রমী এবং সফল একটা ব্যক্তি তৈরি করব।",
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
    <motion.div
      className="mt-6 space-y-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      transition={{ delay: 0.2 }}
    >
      <h3 className="text-lg font-bold flex items-center text-slate-800 dark:text-white">
        <Award className="mr-2 h-5 w-5 text-amber-600 dark:text-amber-400" />
        সফলতার পথে
      </h3>

      <div className="grid grid-cols-1 gap-4">
        {sections.map((section, index) => (
          <motion.div key={index} variants={itemVariants}>
            <Card
              className={`${
                index === 2
                  ? "bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-700 dark:to-indigo-700 text-white"
                  : "bg-white dark:bg-gray-800/70 border-slate-200 dark:border-gray-700"
              } overflow-hidden hover:shadow-md transition-all`}
            >
              <CardContent className="p-4">
                <div className="flex items-start">
                  <div
                    className={`h-10 w-10 rounded-full ${
                      index === 2 ? "bg-white/20" : "bg-slate-100 dark:bg-gray-700"
                    } flex items-center justify-center mr-4 shrink-0`}
                  >
                    {section.icon}
                  </div>
                  <div>
                    <h4 className={`font-medium ${index === 2 ? "text-white" : "text-slate-800 dark:text-white"}`}>
                      {section.title}
                    </h4>
                    <p className={`text-sm ${index === 2 ? "text-white/90" : "text-slate-600 dark:text-slate-400"}`}>
                      {section.content}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}

        <motion.div variants={itemVariants}>
          <Card className="bg-white dark:bg-gray-800/70 border-slate-200 dark:border-gray-700 overflow-hidden">
            <CardContent className="p-4">
              <p className="text-sm text-center text-slate-600 dark:text-slate-400">
                <span className="font-medium">নোটিশ:</span> আপনাদের সাধ্যমতে যেটুক পরিশোধ করার সক্ষমতা আছে সেটা নিজ দায়িত্বে
                সময়মতাবেক জমা করুন।
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  )
}
