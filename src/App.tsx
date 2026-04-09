import { useRoutes } from "react-router-dom"
import Layout from "@/layout/dashboard-layout"
import { appRoutes } from "@/routes"

function App() {
  const routedContent = useRoutes(appRoutes)
  return <Layout>{routedContent}</Layout>
}

export default App