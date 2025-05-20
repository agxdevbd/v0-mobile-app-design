"use client"

import { motion } from "framer-motion"
import { Shield, TrendingUp, Zap, Bot } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export function RulesSection() {
  const rules = [
    {
      icon: <Shield className="h-6 w-6 text-purple-500" />,
      title: "লোভ করা যাবে না",
      description: "লোভ মানুষকে অন্ধ করে দেয়।",
    },
    {
      icon: <TrendingUp className="h-6 w-6 text-blue-500" />,
      title: "লস করব কিন্তু কিছু শিখব",
      description: "প্রতিটি ব্যর্থতা একটি শিক্ষা।",
    },
    {
      icon: <Zap className="h-6 w-6 text-yellow-500" />,
      title: "অসৎ পথে চলবো না",
      description: "সততা সবচেয়ে বড় সম্পদ।",
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
        <Shield className="mr-2 h-5 w-5 text-purple-600 dark:text-purple-400" />
        নিয়ম ও শৃঙ্খলা
      </h3>

      <div className="grid grid-cols-1 gap-4">
        {rules.map((rule, index) => (
          <motion.div key={index} variants={itemVariants}>
            <Card className="bg-gradient-to-r from-slate-50 to-white dark:from-gray-800 dark:to-gray-800/70 border-slate-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-all">
              <CardContent className="p-4">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-100 to-indigo-100 dark:from-purple-900/30 dark:to-indigo-900/30 flex items-center justify-center mr-4 shrink-0">
                    {rule.icon}
                  </div>
                  <div>
                    <h4 className="font-medium text-slate-800 dark:text-white">{rule.title}</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{rule.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}

        <motion.div variants={itemVariants}>
          <Card className="bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-700 dark:to-indigo-700 text-white overflow-hidden">
            <CardContent className="p-4">
              <div className="flex items-center justify-center mb-2">
                <Bot className="h-6 w-6 mr-2" />
                <h4 className="font-medium">AI সিস্টেম</h4>
              </div>
              <p className="text-sm text-center">এই সিস্টেম আপনার সাফল্যের জন্য ডিজাইন করা হয়েছে। আমরা আপনার সাথে আছি।</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  )
}
