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
import { LifeBuoy, CircleAlert, CheckCircle2, Timer } from "lucide-react"

const tickets = [
  {
    id: "TCK-301",
    category: "HR",
    subject: "Update dependent details",
    priority: "Medium",
    createdOn: "2026-04-10",
    status: "Open",
  },
  {
    id: "TCK-302",
    category: "IT",
    subject: "VPN access issue",
    priority: "High",
    createdOn: "2026-04-09",
    status: "In Progress",
  },
  {
    id: "TCK-303",
    category: "Admin",
    subject: "ID card replacement",
    priority: "Low",
    createdOn: "2026-04-05",
    status: "Closed",
  },
]

export default function HelpdeskPage() {
  const open = tickets.filter((t) => t.status === "Open").length
  const inProgress = tickets.filter((t) => t.status === "In Progress").length
  const closed = tickets.filter((t) => t.status === "Closed").length

  return (
    <div className="space-y-6">
      <section className="flex flex-col justify-between gap-4 rounded-xl border p-4 md:flex-row md:items-center">
        <div>
          <h2 className="text-2xl font-semibold">Helpdesk & Tickets</h2>
          <p className="text-muted-foreground">
            Raise and track HR, IT, and Admin support requests.
          </p>
        </div>
        <div className="flex w-full gap-2 md:w-auto">
          <Input placeholder="Search ticket..." className="md:w-64" />
          <Button>Raise Ticket</Button>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Tickets</CardTitle>
            <LifeBuoy className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{tickets.length}</p>
            <p className="text-xs text-muted-foreground">Current period</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Open</CardTitle>
            <CircleAlert className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{open}</p>
            <p className="text-xs text-muted-foreground">Awaiting assignment</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            <Timer className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{inProgress}</p>
            <p className="text-xs text-muted-foreground">Under resolution</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Closed</CardTitle>
            <CheckCircle2 className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{closed}</p>
            <p className="text-xs text-muted-foreground">Resolved tickets</p>
          </CardContent>
        </Card>
      </section>

      <Card>
        <CardHeader>
          <CardTitle>Ticket List</CardTitle>
          <CardDescription>Monitor all submitted support tickets</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ticket ID</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Created On</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tickets.map((ticket) => (
                <TableRow key={ticket.id}>
                  <TableCell>{ticket.id}</TableCell>
                  <TableCell>{ticket.category}</TableCell>
                  <TableCell>{ticket.subject}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        ticket.priority === "High"
                          ? "destructive"
                          : ticket.priority === "Medium"
                          ? "secondary"
                          : "default"
                      }
                    >
                      {ticket.priority}
                    </Badge>
                  </TableCell>
                  <TableCell>{ticket.createdOn}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        ticket.status === "Closed"
                          ? "default"
                          : ticket.status === "In Progress"
                          ? "secondary"
                          : "destructive"
                      }
                    >
                      {ticket.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button size="sm" variant="outline">
                      View
                    </Button>
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