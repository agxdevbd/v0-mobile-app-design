"use client"

import { motion } from "framer-motion"
import { FileText, AlertTriangle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export function OrdersInstructions() {
  return (
    <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }} className="mb-4">
      <Card className="bg-gradient-to-r from-amber-600 to-orange-600 dark:from-amber-700 dark:to-orange-700 text-white overflow-hidden hover:shadow-md transition-all">
        <CardContent className="p-4">
          <div className="flex items-center">
            <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center mr-3 shrink-0">
              <FileText className="h-5 w-5 text-white" />
            </div>
            <div>
              <div className="font-medium text-lg">আদেশ এবং নির্দেশ</div>
              <div className="flex items-center mt-1">
                <AlertTriangle className="h-4 w-4 mr-1 text-yellow-300" />
                <span className="text-sm text-white/90">এটার কাজ এখনো শেষ হয়নি এটার কাজ চলমান</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
