"use client"

import { useEffect } from "react"

export function SecuritySystem() {
  useEffect(() => {
    // Prevent right-click context menu
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault()
      return false
    }

    // Prevent keyboard shortcuts for screenshots and copying
    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent PrintScreen
      if (e.key === "PrintScreen") {
        e.preventDefault()
        return false
      }

      // Prevent Ctrl+C, Ctrl+V, Ctrl+S, Ctrl+P, Ctrl+Shift+I
      if (e.ctrlKey && ["c", "v", "s", "p", "i"].includes(e.key.toLowerCase())) {
        e.preventDefault()
        return false
      }

      // Prevent F12
      if (e.key === "F12") {
        e.preventDefault()
        return false
      }

      // Prevent Alt+PrtScn
      if (e.altKey && e.key === "PrintScreen") {
        e.preventDefault()
        return false
      }

      // Prevent Windows+Shift+S (Windows screenshot)
      if (e.shiftKey && e.key === "S" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        return false
      }
    }

    // Prevent copy/paste
    const handleCopy = (e: ClipboardEvent) => {
      e.preventDefault()
      return false
    }

    // Detect when window loses focus (potential screenshot attempt)
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        // Add a black overlay when app loses focus
        const overlay = document.createElement("div")
        overlay.id = "security-overlay"
        overlay.style.position = "fixed"
        overlay.style.top = "0"
        overlay.style.left = "0"
        overlay.style.width = "100%"
        overlay.style.height = "100%"
        overlay.style.backgroundColor = "black"
        overlay.style.zIndex = "9999"
        document.body.appendChild(overlay)
      } else {
        // Remove overlay when focus returns
        const overlay = document.getElementById("security-overlay")
        if (overlay) {
          document.body.removeChild(overlay)
        }
      }
    }

    // CSS to prevent selection
    const style = document.createElement("style")
    style.innerHTML = `
      * {
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
      }
      
      /* Hide content when screen capture API is used */
      .protected-content {
        content-visibility: hidden;
      }
      
      @media print {
        body {
          display: none;
        }
      }
    `
    document.head.appendChild(style)

    // Add event listeners
    document.addEventListener("contextmenu", handleContextMenu)
    document.addEventListener("keydown", handleKeyDown)
    document.addEventListener("copy", handleCopy as EventListener)
    document.addEventListener("cut", handleCopy as EventListener)
    document.addEventListener("paste", handleCopy as EventListener)
    document.addEventListener("visibilitychange", handleVisibilityChange)

    // Detect screen capture API
    if (navigator.mediaDevices && navigator.mediaDevices.getDisplayMedia) {
      const originalGetDisplayMedia = navigator.mediaDevices.getDisplayMedia
      navigator.mediaDevices.getDisplayMedia = (constraints) => {
        // Add protected-content class to body when screen capture is attempted
        document.body.classList.add("protected-content")

        // Return a rejected promise
        return Promise.reject(new Error("Screen capture is not allowed"))
      }
    }

    return () => {
      // Clean up event listeners
      document.removeEventListener("contextmenu", handleContextMenu)
      document.removeEventListener("keydown", handleKeyDown)
      document.removeEventListener("copy", handleCopy as EventListener)
      document.removeEventListener("cut", handleCopy as EventListener)
      document.removeEventListener("paste", handleCopy as EventListener)
      document.removeEventListener("visibilitychange", handleVisibilityChange)
      document.head.removeChild(style)
    }
  }, [])

  return null
}
