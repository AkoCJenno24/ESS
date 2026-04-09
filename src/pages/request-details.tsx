import { useMemo } from "react"
import { Link, useParams } from "react-router-dom"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const requestData = [
  {
    id: "REQ-2026-001",
    category: "Leave",
    title: "Casual Leave - 2 Days",
    submittedOn: "2026-04-10",
    approver: "Aarav Sharma",
    status: "Approved",
    reason: "Family function in hometown.",
    timeline: [
      { label: "Submitted", at: "2026-04-10 09:12", by: "You" },
      { label: "Manager Review", at: "2026-04-10 14:40", by: "Aarav Sharma" },
      { label: "Approved", at: "2026-04-10 14:42", by: "Aarav Sharma" },
    ],
    comments: [
        { by: "You", at: "2026-04-10 09:15", message: "Please process before weekend." },
        { by: "Aarav Sharma", at: "2026-04-10 14:41", message: "Approved. Plan handover with team." },
      ],
    approverNote: "Ensure task handover is updated in project board before leave starts.",
  },
  {
    id: "REQ-2026-002",
    category: "Attendance",
    title: "Missed Check-in Correction",
    submittedOn: "2026-04-11",
    approver: "HR Team",
    status: "Pending",
    reason: "Internet outage prevented check-in.",
    timeline: [
      { label: "Submitted", at: "2026-04-11 10:03", by: "You" },
      { label: "In Review", at: "2026-04-11 12:25", by: "HR Team" },
    ],
  },
]

type RequestStatus = "Approved" | "Pending" | "Rejected"

type StatusMeta = {
  badgeVariant: "default" | "secondary" | "destructive"
  hint: string
  actions: Array<"comment" | "download" | "withdraw" | "resubmit">
}

function getStatusMeta(status: RequestStatus): StatusMeta {
  switch (status) {
    case "Approved":
      return {
        badgeVariant: "default",
        hint: "Download final approved document.",
        actions: ["comment", "download"],
      }
    case "Pending":
      return {
        badgeVariant: "secondary",
        hint: "You can withdraw while review is in progress.",
        actions: ["comment", "withdraw"],
      }
    case "Rejected":
      return {
        badgeVariant: "destructive",
        hint: "Update details and submit again.",
        actions: ["comment", "resubmit"],
      }
    default:
      return {
        badgeVariant: "secondary",
        hint: "",
        actions: ["comment"],
      }
  }
}

export default function RequestDetailsPage() {
  const { id } = useParams<{ id: string }>()

  const request = useMemo(
    () => requestData.find((r) => r.id === id),
    [id]
  )

  const statusMeta = getStatusMeta(request?.status as RequestStatus)

  if (!request) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Request not found</CardTitle>
          <CardDescription>No request matches id: {id}</CardDescription>
        </CardHeader>
        <CardContent>
          <Button asChild>
            <Link to="/my-requests">Back to My Requests</Link>
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <section className="flex flex-col justify-between gap-4 rounded-xl border p-4 md:flex-row md:items-center">
        <div>
          <p className="text-sm text-muted-foreground">{request.id}</p>
          <h2 className="text-2xl font-semibold">{request.title}</h2>
          <p className="text-muted-foreground">{request.category} request details</p>
        </div>
        <div className="flex gap-2">
        <Badge variant={statusMeta.badgeVariant}>{request.status}</Badge>
          <Button asChild variant="outline">
            <Link to="/my-requests">Back</Link>
          </Button>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Request Information</CardTitle>
            <CardDescription>Core details submitted by employee</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Submitted On</span>
              <span className="font-medium">{request.submittedOn}</span>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Approver</span>
              <span className="font-medium">{request.approver}</span>
            </div>
            <Separator />
            <div className="space-y-1">
              <p className="text-muted-foreground">Reason</p>
              <p className="font-medium">{request.reason}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
  <CardHeader>
    <CardTitle>Actions</CardTitle>
    <CardDescription>Quick options</CardDescription>
  </CardHeader>
  <CardContent className="space-y-2">
    {statusMeta.actions.includes("comment") && (
      <Button className="w-full" variant="outline">
        Add Comment
      </Button>
    )}

    {statusMeta.actions.includes("download") && (
      <Button className="w-full" variant="outline">
        Download PDF
      </Button>
    )}

    {statusMeta.actions.includes("withdraw") && (
      <Button className="w-full" variant="destructive">
        Withdraw Request
      </Button>
    )}

    {statusMeta.actions.includes("resubmit") && (
      <Button className="w-full">
        Re-submit Request
      </Button>
    )}

    <p className="pt-1 text-xs text-muted-foreground">{statusMeta.hint}</p>
  </CardContent>
</Card>
      </section>

      <Card>
        <CardHeader>
          <CardTitle>Approval Timeline</CardTitle>
          <CardDescription>Status progression for this request</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {request.timeline.map((step, index) => (
            <div key={`${step.label}-${step.at}`} className="space-y-2">
              <div className="flex items-center justify-between">
                <p className="font-medium">{step.label}</p>
                <p className="text-sm text-muted-foreground">{step.at}</p>
              </div>
              <p className="text-sm text-muted-foreground">By {step.by}</p>
              {index < request.timeline.length - 1 && <Separator />}
            </div>
          ))}
        </CardContent>
      </Card>

      <section className="grid gap-4 lg:grid-cols-3">
  <Card className="lg:col-span-2">
    <CardHeader>
      <CardTitle>Comments</CardTitle>
      <CardDescription>Conversation on this request</CardDescription>
    </CardHeader>
    <CardContent className="space-y-4">
      {request.comments?.length ? (
        request.comments.map((comment, index) => (
          <div key={`${comment.by}-${comment.at}-${index}`} className="space-y-2">
            <div className="flex items-center justify-between">
              <p className="font-medium">{comment.by}</p>
              <p className="text-sm text-muted-foreground">{comment.at}</p>
            </div>
            <p className="text-sm">{comment.message}</p>
            {index < request.comments.length - 1 && <Separator />}
          </div>
        ))
      ) : (
        <p className="text-sm text-muted-foreground">No comments yet.</p>
      )}
    </CardContent>
  </Card>

  <Card>
    <CardHeader>
      <CardTitle>Approver Note</CardTitle>
      <CardDescription>Latest reviewer guidance</CardDescription>
    </CardHeader>
    <CardContent>
      <p className="text-sm text-muted-foreground">
        {request.approverNote || "No approver note available."}
      </p>
    </CardContent>
  </Card>
</section>
    </div>
  )
}