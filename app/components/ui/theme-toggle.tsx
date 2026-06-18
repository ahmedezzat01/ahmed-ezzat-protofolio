"use client"
import { useState } from "react"
import { Moon, Sun } from "lucide-react"
import { cn } from "@/lib/utils"

interface ThemeToggleProps { className?: string }

function getInitialDark(): boolean {
  if (typeof window === 'undefined') return true;
  const saved = localStorage.getItem('theme');
  if (saved) {
    document.documentElement.classList.toggle('dark', saved === 'dark');
    return saved === 'dark';
  }
  document.documentElement.classList.add('dark');
  return true;
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const [isDark, setIsDark] = useState(getInitialDark)

  const toggle = () => {
    setIsDark(prev => {
      const newMode = !prev
      localStorage.setItem('theme', newMode ? 'dark' : 'light')
      document.documentElement.classList.toggle('dark', newMode)
      return newMode
    })
  }

  return (
    <div
      className={cn("flex w-16 h-8 p-1 rounded-full cursor-pointer transition-all duration-300", isDark ? "bg-zinc-950 border border-zinc-800" : "bg-white border border-zinc-200 shadow-md", className)}
      onClick={toggle}
      role="button"
      tabIndex={0}
      aria-label="Toggle theme"
    >
      <div className="flex justify-between items-center w-full">
        <div className={cn("flex justify-center items-center w-6 h-6 rounded-full transition-all duration-300", isDark ? "translate-x-0 bg-zinc-800 shadow-lg" : "translate-x-8 bg-amber-100 shadow-lg")}>
          {isDark ? <Moon className="w-4 h-4 text-white" strokeWidth={1.5} /> : <Sun className="w-4 h-4 text-amber-500" strokeWidth={1.5} />}
        </div>
        <div className={cn("flex justify-center items-center w-6 h-6 rounded-full transition-all duration-300", isDark ? "bg-transparent" : "-translate-x-8")}>
          {isDark ? <Sun className="w-4 h-4 text-zinc-500" strokeWidth={1.5} /> : <Moon className="w-4 h-4 text-zinc-800" strokeWidth={1.5} />}
        </div>
      </div>
    </div>
  )
}
