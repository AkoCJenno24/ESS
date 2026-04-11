"use client"

import { createContext, useContext, useEffect, useState } from "react"

export type ColorTheme = "violet" | "emerald" | "amber"

type ColorThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: ColorTheme
  storageKey?: string
}

type ColorThemeProviderState = {
  colorTheme: ColorTheme
  setColorTheme: (theme: ColorTheme) => void
}

const initialState: ColorThemeProviderState = {
  colorTheme: "violet",
  setColorTheme: () => null,
}

const ColorThemeProviderContext =
  createContext<ColorThemeProviderState>(initialState)

export function ColorThemeProvider({
  children,
  defaultTheme = "violet",
  storageKey = "vite-color-theme",
}: ColorThemeProviderProps) {
  const [colorTheme, setColorTheme] = useState<ColorTheme>(
    () => (localStorage.getItem(storageKey) as ColorTheme) || defaultTheme
  )

  useEffect(() => {
    window.document.documentElement.setAttribute("data-theme", colorTheme)
  }, [colorTheme])

  const value = {
    colorTheme,
    setColorTheme: (theme: ColorTheme) => {
      localStorage.setItem(storageKey, theme)
      setColorTheme(theme)
    },
  }

  return (
    <ColorThemeProviderContext.Provider value={value}>
      {children}
    </ColorThemeProviderContext.Provider>
  )
}

export const useColorTheme = () => {
  const context = useContext(ColorThemeProviderContext)

  if (context === undefined) {
    throw new Error("useColorTheme must be used within a ColorThemeProvider")
  }

  return context
}
