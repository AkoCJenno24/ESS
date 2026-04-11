import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { CalendarDays, Clock3, FileText, Wallet } from "lucide-react"
import {
  useAttendanceClock,
  formatDuration,
  formatTime,
} from "@/hooks/use-attendance-clock"

const upcomingLeaves = [
  { type: "Casual Leave", from: "2026-04-15", to: "2026-04-16", status: "Approved" },
  { type: "Sick Leave", from: "2026-05-02", to: "2026-05-02", status: "Pending" },
]

export default function Dashboard() {
  const { attendance, totalWorkedMs, clockIn, clockOut } = useAttendanceClock()

  return (
    <div className="space-y-6">
      <section className="grid gap-4 lg:grid-cols-12">
        <section className="rounded-xl border p-6 lg:col-span-8">
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold">Welcome back, Jenno</h2>
            <p className="text-muted-foreground">
              Here is your employee overview for this week. Keep track of attendance, leave
              balance, and payroll updates from one place.
            </p>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <div className="rounded-lg bg-muted/40 p-3">
              <p className="text-xs text-muted-foreground">Today</p>
              <p className="text-sm font-medium">Friday, Apr 10</p>
            </div>
            <div className="rounded-lg bg-muted/40 p-3">
              <p className="text-xs text-muted-foreground">This Week</p>
              <p className="text-sm font-medium">2 pending requests</p>
            </div>
            <div className="rounded-lg bg-muted/40 p-3">
              <p className="text-xs text-muted-foreground">Reminder</p>
              <p className="text-sm font-medium">Submit timesheet by 6:00 PM</p>
            </div>
          </div>
        </section>

        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Today Attendance</CardTitle>
            <CardDescription>Clock in/out and track today&apos;s work duration</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant={attendance.isClockedIn ? "default" : "secondary"}>
                {attendance.isClockedIn ? "Clocked In" : "Clocked Out"}
              </Badge>
              <span className="text-sm text-muted-foreground">
                In: {formatTime(attendance.clockedInAt)}
              </span>
              <span className="text-sm text-muted-foreground">
                Out: {formatTime(attendance.clockedOutAt)}
              </span>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Total worked today</p>
              <p className="text-xl font-semibold">{formatDuration(totalWorkedMs)}</p>
            </div>

            <div className="flex gap-2">
              <Button onClick={clockIn} disabled={attendance.isClockedIn}>
                Clock In
              </Button>
              <Button onClick={clockOut} disabled={!attendance.isClockedIn}>
                Clock Out
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Attendance</CardTitle>
            <Clock3 className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">19 / 22 days</p>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Leave Balance</CardTitle>
            <CalendarDays className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">12 days</p>
            <Progress value={60} className="mt-3" />
            <p className="mt-2 text-xs text-muted-foreground">Used 8 of 20 annual leaves</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Payroll</CardTitle>
            <Wallet className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">$3,450</p>
            <p className="text-xs text-muted-foreground">Last credited salary</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Documents</CardTitle>
            <FileText className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">6</p>
            <p className="text-xs text-muted-foreground">Available HR documents</p>
          </CardContent>
        </Card>
      </section>

      <Card>
        <CardHeader>
          <CardTitle>Upcoming Leave Requests</CardTitle>
          <CardDescription>Track your pending and approved leaves</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>From</TableHead>
                <TableHead>To</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {upcomingLeaves.map((leave) => (
                <TableRow key={`${leave.type}-${leave.from}`}>
                  <TableCell>{leave.type}</TableCell>
                  <TableCell>{leave.from}</TableCell>
                  <TableCell>{leave.to}</TableCell>
                  <TableCell>
                    <Badge variant={leave.status === "Approved" ? "default" : "secondary"}>
                      {leave.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}