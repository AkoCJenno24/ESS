import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Link } from "react-router-dom"
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
import { ClipboardList, CheckCircle2, Clock3, XCircle } from "lucide-react"

const requests = [
  {
    id: "REQ-2026-001",
    category: "Leave",
    title: "Casual Leave - 2 Days",
    submittedOn: "2026-04-10",
    approver: "Aarav Sharma",
    status: "Approved",
  },
  {
    id: "REQ-2026-002",
    category: "Attendance",
    title: "Missed Check-in Correction",
    submittedOn: "2026-04-11",
    approver: "HR Team",
    status: "Pending",
  },
  {
    id: "REQ-2026-003",
    category: "Expense",
    title: "Internet Reimbursement",
    submittedOn: "2026-04-08",
    approver: "Finance Team",
    status: "Rejected",
  },
]

export default function MyRequestsPage() {
  const approved = requests.filter((r) => r.status === "Approved").length
  const pending = requests.filter((r) => r.status === "Pending").length
  const rejected = requests.filter((r) => r.status === "Rejected").length

  return (
    <div className="space-y-6">
      <section className="flex flex-col justify-between gap-4 rounded-xl border p-4 md:flex-row md:items-center">
        <div>
          <h2 className="text-2xl font-semibold">My Requests</h2>
          <p className="text-muted-foreground">
            Track all employee requests in one place.
          </p>
        </div>
        <div className="flex w-full gap-2 md:w-auto">
          <Input placeholder="Search by ID or request title..." className="md:w-72" />
          <Button>New Request</Button>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Requests</CardTitle>
            <ClipboardList className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{requests.length}</p>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Approved</CardTitle>
            <CheckCircle2 className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{approved}</p>
            <p className="text-xs text-muted-foreground">Completed successfully</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock3 className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{pending}</p>
            <p className="text-xs text-muted-foreground">Awaiting approval</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Rejected</CardTitle>
            <XCircle className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{rejected}</p>
            <p className="text-xs text-muted-foreground">Needs re-submission</p>
          </CardContent>
        </Card>
      </section>

      <Card>
        <CardHeader>
          <CardTitle>Request History</CardTitle>
          <CardDescription>Latest requests across all categories</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Request ID</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Submitted</TableHead>
                <TableHead>Approver</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {requests.map((request) => (
                <TableRow key={request.id}><TableCell>
                <Link to={`/my-requests/${request.id}`} className="font-medium hover:underline">
                  {request.id}
                </Link>
              </TableCell><TableCell>{request.id}</TableCell>
                  <TableCell>{request.category}</TableCell>
                  <TableCell>{request.title}</TableCell>
                  <TableCell>{request.submittedOn}</TableCell>
                  <TableCell>{request.approver}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        request.status === "Approved"
                          ? "default"
                          : request.status === "Pending"
                            ? "secondary"
                            : "destructive"
                      }
                    >
                      {request.status}
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