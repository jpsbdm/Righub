"use client"

import * as React from "react"
import { Moon, Sun, Monitor } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <div className="flex bg-muted p-1 rounded-xl">
      <Button
        variant={theme === "light" ? "secondary" : "ghost"}
        size="icon"
        className="h-8 w-8 rounded-lg"
        onClick={() => setTheme("light")}
      >
        <Sun className="h-4 w-4" />
      </Button>
      <Button
        variant={theme === "dark" ? "secondary" : "ghost"}
        size="icon"
        className="h-8 w-8 rounded-lg"
        onClick={() => setTheme("dark")}
      >
        <Moon className="h-4 w-4" />
      </Button>
      <Button
        variant={theme === "system" ? "secondary" : "ghost"}
        size="icon"
        className="h-8 w-8 rounded-lg"
        onClick={() => setTheme("system")}
      >
        <Monitor className="h-4 w-4" />
      </Button>
    </div>
  )
}
