import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from "@/theme/theme-provider"
import { ColorThemeProvider } from "@/theme/color-theme-provider"
import { TooltipProvider } from "@/components/ui/tooltip"
import { BrowserRouter } from "react-router-dom"
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <ColorThemeProvider defaultTheme="violet" storageKey="vite-color-theme">
        <TooltipProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </TooltipProvider>
      </ColorThemeProvider>
    </ThemeProvider>
  </StrictMode>,
)
