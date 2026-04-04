import { Button } from "../ui/button"
import { ModeToggle } from "../theme/mode-toggle"



const Dashboard = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold underline text-orange-500">
        Hello world!
      </h1>
      <Button variant="destructive">Click me</Button>
      <ModeToggle />
    </div>
  )
}

export default Dashboard
