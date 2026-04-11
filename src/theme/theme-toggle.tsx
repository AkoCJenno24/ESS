import { Palette } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useColorTheme } from "@/theme/color-theme-provider"

const themeOptions = [
  { key: "violet", label: "Violet", dotClassName: "bg-violet-500" },
  { key: "emerald", label: "Emerald", dotClassName: "bg-emerald-500" },
  { key: "amber", label: "Amber", dotClassName: "bg-amber-500" },
] as const

export function ThemeToggle() {
  const { colorTheme, setColorTheme } = useColorTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Palette className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Toggle color theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {themeOptions.map((option) => (
          <DropdownMenuItem
            key={option.key}
            onClick={() => setColorTheme(option.key)}
            className={colorTheme === option.key ? "font-medium" : undefined}
          >
            <span className={`mr-2 size-2.5 rounded-full ${option.dotClassName}`} />
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
