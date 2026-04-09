import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function ProfilePage() {
  return (
    <div className="space-y-6">
      <section className="rounded-xl border p-4 md:p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src="" alt="Employee avatar" />
              <AvatarFallback>JN</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-2xl font-semibold">Jenno Fernandes</h2>
              <p className="text-sm text-muted-foreground">Software Engineer - Product Team</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge>Active</Badge>
            <Button>Edit Profile</Button>
          </div>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Keep your details updated for HR records.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <p className="text-sm font-medium">First Name</p>
              <Input value="Jenno" readOnly />
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium">Last Name</p>
              <Input value="Fernandes" readOnly />
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium">Email</p>
              <Input value="jenno@company.com" readOnly />
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium">Phone</p>
              <Input value="+91 98765 43210" readOnly />
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium">Employee ID</p>
              <Input value="EMP-1024" readOnly />
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium">Location</p>
              <Input value="Bengaluru, India" readOnly />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Work Details</CardTitle>
            <CardDescription>Employment and reporting info</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Department</span>
              <span className="font-medium">Engineering</span>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Manager</span>
              <span className="font-medium">Aarav Sharma</span>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Joining Date</span>
              <span className="font-medium">12 Aug 2023</span>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Employment Type</span>
              <span className="font-medium">Full-time</span>
            </div>
          </CardContent>
        </Card>
      </section>

      <Card>
        <CardHeader>
          <CardTitle>Emergency Contact</CardTitle>
          <CardDescription>Used only for urgent situations</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-3">
          <div className="space-y-2">
            <p className="text-sm font-medium">Name</p>
            <Input value="Maria Fernandes" readOnly />
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium">Relationship</p>
            <Input value="Mother" readOnly />
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium">Phone</p>
            <Input value="+91 99887 77665" readOnly />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}