import AvatarDropdown from "@/components/dashboard/user-avatar"
import { ModeToggle } from "@/theme/mode-toggle"
import { ThemeToggle } from "@/theme/theme-toggle"
import { Bell } from "lucide-react"
import { Button } from "../ui/button"
import { Link, matchPath, useLocation } from "react-router-dom"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

const routeLabels: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/profile": "Profile",
  "/leave": "Leave",
  "/payroll": "Payroll",
  "/my-requests": "My Requests",
  "/attendance": "Attendance Details",
  "/documents": "Documents",
  "/helpdesk": "Helpdesk",
  "/my-requests/:id": "Request Details",
}

function getBreadcrumbs(pathname: string) {
  const segments = pathname.split("/").filter(Boolean)
  const crumbs: { label: string; href: string }[] = []

  for (let i = 0; i < segments.length; i++) {
    const href = `/${segments.slice(0, i + 1).join("/")}`
    const exactLabel = routeLabels[href]
    const dynamicLabel = Object.entries(routeLabels).find(([pattern]) =>
      pattern.includes(":") ? matchPath({ path: pattern, end: true }, href) : false
    )?.[1]

    crumbs.push({
      label: exactLabel ?? dynamicLabel ?? segments[i].replace(/-/g, " "),
      href,
    })
  }

  return crumbs
}

const AppHeader = () => {
  const { pathname } = useLocation()
  const breadcrumbs = getBreadcrumbs(pathname)

  return (
    <div className="flex flex-1 items-center justify-between">
      <Breadcrumb>
        <BreadcrumbList>
          {breadcrumbs.map((crumb, index) => {
            const isLast = index === breadcrumbs.length - 1

            return (
              <BreadcrumbItem key={crumb.href}>
                {isLast ? (
                  <BreadcrumbPage className="text-lg font-semibold">{crumb.label}</BreadcrumbPage>
                ) : (
                  <>
                    <BreadcrumbLink asChild>
                      <Link to={crumb.href}>{crumb.label}</Link>
                    </BreadcrumbLink>
                    <BreadcrumbSeparator />
                  </>
                )}
              </BreadcrumbItem>
            )
          })}
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex items-center justify-end space-x-3">
        <ThemeToggle />
        <ModeToggle />
        <Button variant="outline" size="icon">
          <Bell className="h-[1.2rem] w-[1.2rem]" />
        </Button>

        <AvatarDropdown />
      </div>
    </div>
  )
}

export default AppHeader
