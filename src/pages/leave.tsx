import { useMemo, useState } from "react"
import { Dialog } from "radix-ui"
import { Button } from "@/components/ui/button"
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
import { cn } from "@/lib/utils"
import { CalendarDays, XCircle } from "lucide-react"

type LeaveStatus = "Approved" | "Pending" | "Rejected"
type LeaveType = "Casual Leave" | "Sick Leave" | "Earned Leave"

type LeaveItem = {
  type: LeaveType
  days: number
  from: string
  to: string
  status: LeaveStatus
  reason?: string
}

const initialLeaveHistory: LeaveItem[] = [
  {
    type: "Casual Leave",
    days: 2,
    from: "2026-04-15",
    to: "2026-04-16",
    status: "Approved" as LeaveStatus,
  },
  {
    type: "Sick Leave",
    days: 1,
    from: "2026-05-02",
    to: "2026-05-02",
    status: "Pending" as LeaveStatus,
  },
  {
    type: "Earned Leave",
    days: 3,
    from: "2026-03-10",
    to: "2026-03-12",
    status: "Approved" as LeaveStatus,
  },
  {
    type: "Casual Leave",
    days: 2,
    from: "2026-02-21",
    to: "2026-02-22",
    status: "Rejected" as LeaveStatus,
  },
]

export default function LeavePage() {
  const [leaveHistory, setLeaveHistory] = useState<LeaveItem[]>(initialLeaveHistory)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [leaveType, setLeaveType] = useState<LeaveType>("Casual Leave")
  const [fromDate, setFromDate] = useState("")
  const [toDate, setToDate] = useState("")
  const [reason, setReason] = useState("")
  const [formError, setFormError] = useState("")

  const leavesTaken = useMemo(
    () =>
      leaveHistory
        .filter((item) => item.status === "Approved")
        .reduce((sum, item) => sum + item.days, 0),
    [leaveHistory]
  )

  const pendingRequests = useMemo(
    () => leaveHistory.filter((item) => item.status === "Pending").length,
    [leaveHistory]
  )

  const rejectedRequests = useMemo(
    () => leaveHistory.filter((item) => item.status === "Rejected").length,
    [leaveHistory]
  )

  const resetForm = () => {
    setLeaveType("Casual Leave")
    setFromDate("")
    setToDate("")
    setReason("")
    setFormError("")
  }

  const calculateLeaveDays = (from: string, to: string) => {
    const msPerDay = 24 * 60 * 60 * 1000
    const fromMs = new Date(from).getTime()
    const toMs = new Date(to).getTime()
    return Math.floor((toMs - fromMs) / msPerDay) + 1
  }

  const handleSubmitLeaveRequest = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!leaveType || !fromDate || !toDate) {
      setFormError("Leave type, from date, and to date are required.")
      return
    }

    if (new Date(toDate) < new Date(fromDate)) {
      setFormError("To date must be the same as or later than from date.")
      return
    }

    const newRequest: LeaveItem = {
      type: leaveType,
      from: fromDate,
      to: toDate,
      days: calculateLeaveDays(fromDate, toDate),
      status: "Pending",
      reason: reason.trim() || undefined,
    }

    setLeaveHistory((prev) => [newRequest, ...prev])
    setIsDialogOpen(false)
    resetForm()
  }

  return (
    <div className="space-y-6">
      <section className="flex flex-col justify-between gap-4 rounded-xl border p-4 md:flex-row md:items-center">
        <div>
          <h2 className="text-2xl font-semibold">Leave Management</h2>
          <p className="text-muted-foreground">Manage leave requests, balances, and approvals.</p>
        </div>
        <Dialog.Root
          open={isDialogOpen}
          onOpenChange={(open) => {
            setIsDialogOpen(open)
            if (!open) resetForm()
          }}
        >
          <Dialog.Trigger asChild>
            <Button>Request Leave</Button>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 z-50 bg-black/20 backdrop-blur-xs" />
            <Dialog.Content
              className={cn(
                "fixed top-1/2 left-1/2 z-50 w-[95vw] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-xl border bg-card p-5 shadow-lg"
              )}
            >
              <Dialog.Title className="text-lg font-semibold">Request Leave</Dialog.Title>
              <Dialog.Description className="mt-1 text-sm text-muted-foreground">
                Submit a new leave request for approval.
              </Dialog.Description>

              <form className="mt-4 space-y-4" onSubmit={handleSubmitLeaveRequest}>
                <div className="space-y-2">
                  <label className="text-sm font-medium" htmlFor="leave-type">
                    Leave Type
                  </label>
                  <select
                    id="leave-type"
                    value={leaveType}
                    onChange={(event) => setLeaveType(event.target.value as LeaveType)}
                    className="h-8 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                  >
                    <option value="Casual Leave">Casual Leave</option>
                    <option value="Sick Leave">Sick Leave</option>
                    <option value="Earned Leave">Earned Leave</option>
                  </select>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-medium" htmlFor="from-date">
                      From Date
                    </label>
                    <input
                      id="from-date"
                      type="date"
                      value={fromDate}
                      onChange={(event) => setFromDate(event.target.value)}
                      className="h-8 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium" htmlFor="to-date">
                      To Date
                    </label>
                    <input
                      id="to-date"
                      type="date"
                      value={toDate}
                      onChange={(event) => setToDate(event.target.value)}
                      className="h-8 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium" htmlFor="reason">
                    Reason (Optional)
                  </label>
                  <textarea
                    id="reason"
                    value={reason}
                    onChange={(event) => setReason(event.target.value)}
                    rows={3}
                    placeholder="Add a short reason for your leave request"
                    className="w-full rounded-lg border border-input bg-transparent px-2.5 py-2 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                  />
                </div>

                {formError ? <p className="text-sm text-destructive">{formError}</p> : null}

                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Submit Request</Button>
                </div>
              </form>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Available Leaves</CardTitle>
            <CalendarDays className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">12 days</p>
            <p className="text-xs text-muted-foreground">Annual balance</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Pending Requests</CardTitle>
            <CalendarDays className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{pendingRequests}</p>
            <p className="text-xs text-muted-foreground">Waiting for approval</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Leaves Taken</CardTitle>
            <CalendarDays className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{leavesTaken} days</p>
            <p className="text-xs text-muted-foreground">Approved this year</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Rejected Requests</CardTitle>
            <XCircle className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{rejectedRequests}</p>
            <p className="text-xs text-muted-foreground">Need follow-up or reapply</p>
          </CardContent>
        </Card>
      </section>

      <Card>
        <CardHeader>
          <CardTitle>Leave History</CardTitle>
          <CardDescription>Recent leave applications and statuses</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Days</TableHead>
                <TableHead>From</TableHead>
                <TableHead>To</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leaveHistory.map((item, index) => (
                <TableRow key={`${item.type}-${item.from}-${index}`}>
                  <TableCell>{item.type}</TableCell>
                  <TableCell>{item.days}</TableCell>
                  <TableCell>{item.from}</TableCell>
                  <TableCell>{item.to}</TableCell>
                  <TableCell>
                    <Badge variant={item.status === "Approved" ? "default" : "secondary"}>
                      {item.status}
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