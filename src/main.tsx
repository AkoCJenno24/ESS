import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from "@/theme/theme-provider"
import { TooltipProvider } from "@/components/ui/tooltip"
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
       <TooltipProvider>
      <App />
      </TooltipProvider>
    </ThemeProvider>
  </StrictMode>,
)
