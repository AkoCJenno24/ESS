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
import { FileText, Download, ShieldCheck, ReceiptText } from "lucide-react"

const docs = [
  { id: "DOC-1001", name: "Payslip - March 2026", type: "Payslip", uploadedOn: "2026-03-31", status: "Available" },
  { id: "DOC-1002", name: "Form 16 - FY 2025-26", type: "Tax", uploadedOn: "2026-04-05", status: "Available" },
  { id: "DOC-1003", name: "Employee Handbook", type: "Policy", uploadedOn: "2026-01-02", status: "Updated" },
  { id: "DOC-1004", name: "Medical Insurance Card", type: "Benefits", uploadedOn: "2026-02-11", status: "Available" },
]

export default function DocumentsPage() {
  const total = docs.length
  const payslips = docs.filter((d) => d.type === "Payslip").length
  const taxDocs = docs.filter((d) => d.type === "Tax").length

  return (
    <div className="space-y-6">
      <section className="flex flex-col justify-between gap-4 rounded-xl border p-4 md:flex-row md:items-center">
        <div>
          <h2 className="text-2xl font-semibold">Documents Center</h2>
          <p className="text-muted-foreground">Access payroll, tax, policy, and benefits documents.</p>
        </div>
        <div className="flex w-full gap-2 md:w-auto">
          <Input placeholder="Search documents..." className="md:w-64" />
          <Button>Upload Document</Button>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Documents</CardTitle>
            <FileText className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{total}</p>
            <p className="text-xs text-muted-foreground">In your ESS vault</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Payslips</CardTitle>
            <ReceiptText className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{payslips}</p>
            <p className="text-xs text-muted-foreground">Salary records</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Tax Documents</CardTitle>
            <ShieldCheck className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{taxDocs}</p>
            <p className="text-xs text-muted-foreground">Compliance files</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Downloads</CardTitle>
            <Download className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">24</p>
            <p className="text-xs text-muted-foreground">Last 30 days</p>
          </CardContent>
        </Card>
      </section>

      <Card>
        <CardHeader>
          <CardTitle>Document Library</CardTitle>
          <CardDescription>View and download your files</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Uploaded On</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {docs.map((doc) => (
                <TableRow key={doc.id}>
                  <TableCell>{doc.id}</TableCell>
                  <TableCell>{doc.name}</TableCell>
                  <TableCell>{doc.type}</TableCell>
                  <TableCell>{doc.uploadedOn}</TableCell>
                  <TableCell>
                    <Badge variant={doc.status === "Available" ? "default" : "secondary"}>
                      {doc.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button size="sm" variant="outline">Download</Button>
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