import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, MapPin, FileText, Wrench, DollarSign, Calendar } from "lucide-react";

const AdminDashboard = () => {
  const stats = [
    { title: "Total Users", value: "152", icon: Users, change: "+12%", color: "text-blue-500" },
    { title: "Active Projects", value: "24", icon: Wrench, change: "+5%", color: "text-green-500" },
    { title: "Total Leads", value: "89", icon: MapPin, change: "+23%", color: "text-purple-500" },
    { title: "Proposals Sent", value: "45", icon: FileText, change: "+8%", color: "text-orange-500" },
    { title: "Revenue (MTD)", value: "₹12.5L", icon: DollarSign, change: "+15%", color: "text-emerald-500" },
    { title: "AMC Renewals", value: "8", icon: Calendar, change: "+2", color: "text-pink-500" },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-2">Admin Dashboard</h2>
        <p className="text-muted-foreground">
          Manage all aspects of your solar business
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">
                <span className="text-green-500">{stat.change}</span> from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Manage your business operations</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-2">
            <button className="text-left p-3 rounded-lg hover:bg-muted transition-colors">
              <div className="font-medium">Manage Users & Roles</div>
              <div className="text-sm text-muted-foreground">Add, edit, or remove users and assign roles</div>
            </button>
            <button className="text-left p-3 rounded-lg hover:bg-muted transition-colors">
              <div className="font-medium">View All Projects</div>
              <div className="text-sm text-muted-foreground">Track installation progress and assignments</div>
            </button>
            <button className="text-left p-3 rounded-lg hover:bg-muted transition-colors">
              <div className="font-medium">Payment Tracking</div>
              <div className="text-sm text-muted-foreground">Monitor payments and generate invoices</div>
            </button>
            <button className="text-left p-3 rounded-lg hover:bg-muted transition-colors">
              <div className="font-medium">Technician Assignments</div>
              <div className="text-sm text-muted-foreground">Assign technicians to projects</div>
            </button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest updates across the platform</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2" />
                <div>
                  <p className="text-sm font-medium">New proposal accepted</p>
                  <p className="text-xs text-muted-foreground">Tech Park Industries - 500 kW</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2" />
                <div>
                  <p className="text-sm font-medium">Project installation started</p>
                  <p className="text-xs text-muted-foreground">Green Valley College - 200 kW</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2" />
                <div>
                  <p className="text-sm font-medium">New lead added</p>
                  <p className="text-xs text-muted-foreground">City Mall Complex - 350 kW</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
