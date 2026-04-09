import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { CalendarCheck2, Clock3, AlertTriangle, TimerReset } from "lucide-react"

const attendanceLogs = [
  { date: "2026-04-11", checkIn: "09:12", checkOut: "18:24", hours: "9h 12m", status: "Present" },
  { date: "2026-04-10", checkIn: "09:41", checkOut: "18:16", hours: "8h 35m", status: "Late" },
  { date: "2026-04-09", checkIn: "--", checkOut: "--", hours: "--", status: "Absent" },
  { date: "2026-04-08", checkIn: "09:05", checkOut: "18:09", hours: "9h 04m", status: "Present" },
]

export default function AttendancePage() {
  const present = attendanceLogs.filter((a) => a.status === "Present").length
  const late = attendanceLogs.filter((a) => a.status === "Late").length
  const absent = attendanceLogs.filter((a) => a.status === "Absent").length

  return (
    <div className="space-y-6">
      <section className="flex flex-col justify-between gap-4 rounded-xl border p-4 md:flex-row md:items-center">
        <div>
          <h2 className="text-2xl font-semibold">Attendance Details</h2>
          <p className="text-muted-foreground">Track daily logs and request attendance corrections.</p>
        </div>
        <div className="flex w-full gap-2 md:w-auto">
          <Input placeholder="Search by date..." className="md:w-64" />
          <Button>Request Correction</Button>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Present Days</CardTitle>
            <CalendarCheck2 className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{present}</p>
            <p className="text-xs text-muted-foreground">Current month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Late Markings</CardTitle>
            <Clock3 className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{late}</p>
            <p className="text-xs text-muted-foreground">Needs improvement</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Absent Days</CardTitle>
            <AlertTriangle className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{absent}</p>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Avg Work Hours</CardTitle>
            <TimerReset className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">8h 57m</p>
            <p className="text-xs text-muted-foreground">Last 30 days</p>
          </CardContent>
        </Card>
      </section>

      <Card>
        <CardHeader>
          <CardTitle>Daily Attendance Log</CardTitle>
          <CardDescription>Recent check-in/check-out entries</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Check-in</TableHead>
                <TableHead>Check-out</TableHead>
                <TableHead>Hours</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {attendanceLogs.map((log) => (
                <TableRow key={log.date}>
                  <TableCell>{log.date}</TableCell>
                  <TableCell>{log.checkIn}</TableCell>
                  <TableCell>{log.checkOut}</TableCell>
                  <TableCell>{log.hours}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        log.status === "Present"
                          ? "default"
                          : log.status === "Late"
                          ? "secondary"
                          : "destructive"
                      }
                    >
                      {log.status}
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