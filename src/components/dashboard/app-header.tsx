import AvatarDropdown from "@/components/dashboard/user-avatar"
import { ModeToggle } from "@/theme/mode-toggle"
import { Bell } from "lucide-react"
import { Button } from "../ui/button"

const AppHeader = () => {
  return (
    <div className="flex flex-1 items-center justify-between">
      <h1 className="text-lg font-semibold">Dashboard</h1>
      <div className="flex items-center justify-end space-x-3">
        <ModeToggle />
        
        {/* Unified Bell Icon Container */}
        <Button variant="outline" size="icon">
          <Bell className="h-[1.2rem] w-[1.2rem]" />
        </Button>

        <AvatarDropdown />
      </div>
    </div>
  )
}

export default AppHeader
