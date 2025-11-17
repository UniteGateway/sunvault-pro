import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Zap, IndianRupee, Calendar, FileText, DollarSign, CalendarCheck, File, CheckCircle2 } from "lucide-react";
import { RecentScans } from "@/components/RecentScans";

const CustomerDashboard = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-2">My Solar Project</h2>
        <p className="text-muted-foreground">Track your solar installation progress</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <h3 className="text-sm font-medium text-muted-foreground">Project Status</h3>
            <CheckCircle2 className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">In Progress</div>
            <p className="text-xs text-muted-foreground mt-1">Installation phase</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <h3 className="text-sm font-medium text-muted-foreground">System Capacity</h3>
            <Zap className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">10 kW</div>
            <p className="text-xs text-muted-foreground mt-1">Residential system</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <h3 className="text-sm font-medium text-muted-foreground">Payment Status</h3>
            <IndianRupee className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">60%</div>
            <p className="text-xs text-muted-foreground mt-1">₹3,60,000 paid</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <h3 className="text-sm font-medium text-muted-foreground">Est. Completion</h3>
            <Calendar className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">15 days</div>
            <p className="text-xs text-muted-foreground mt-1">March 5, 2025</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start" variant="outline">
              <FileText className="mr-2 h-4 w-4" />
              View Proposal
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <DollarSign className="mr-2 h-4 w-4" />
              Payment History
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <CalendarCheck className="mr-2 h-4 w-4" />
              Schedule Visit
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <File className="mr-2 h-4 w-4" />
              View Documents
            </Button>
          </CardContent>
        </Card>

        <RecentScans />
      </div>
    </div>
  );
};

export default CustomerDashboard;
