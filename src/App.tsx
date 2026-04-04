import Layout from "./components/dashboard/layout"
import Dashboard from "./components/dashboard/dashboard"
import { ThemeProvider } from "@/components/theme/theme-provider"

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <Layout>
      <Dashboard />
    </Layout>
    </ThemeProvider>
  )
}

export default App