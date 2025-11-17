import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building2, MapPin, FileText, Users, Sun, TrendingUp, Zap, BarChart3 } from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const stats = [
    { label: "Total Leads", value: "248", icon: Users, change: "+12%", color: "text-blue-500" },
    { label: "Active Projects", value: "34", icon: Building2, change: "+8%", color: "text-green-500" },
    { label: "Proposals Sent", value: "156", icon: FileText, change: "+18%", color: "text-purple-500" },
    { label: "Solar Capacity", value: "2.4 MW", icon: Zap, change: "+24%", color: "text-primary" },
  ];

  const recentLeads = [
    { name: "Tech Park Industries", location: "Bangalore", capacity: "500 kW", status: "New" },
    { name: "City Hospital", location: "Mumbai", capacity: "300 kW", status: "Proposal Sent" },
    { name: "Green Valley College", location: "Pune", capacity: "200 kW", status: "In Progress" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sun className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Unite Solar
              </h1>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <Link to="/dashboard" className="text-sm font-medium text-foreground">
                Dashboard
              </Link>
              <Link to="/satellite" className="text-sm font-medium text-muted-foreground hover:text-foreground">
                Satellite Scan
              </Link>
              <Link to="/leads" className="text-sm font-medium text-muted-foreground hover:text-foreground">
                Leads
              </Link>
              <Link to="/proposals" className="text-sm font-medium text-muted-foreground hover:text-foreground">
                Proposals
              </Link>
              <Button size="sm" variant="outline">Profile</Button>
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="hover:shadow-solar transition-all">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.label}
                </CardTitle>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stat.value}</div>
                <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3" />
                  {stat.change} from last month
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Recent Leads */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Recent Leads</CardTitle>
              <CardDescription>Latest solar installation opportunities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentLeads.map((lead, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 border rounded-lg hover:border-primary transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Building2 className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold">{lead.name}</p>
                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {lead.location} • {lead.capacity}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">
                        {lead.status}
                      </span>
                      <Button size="sm" variant="ghost">View</Button>
                    </div>
                  </div>
                ))}
              </div>
              <Button className="w-full mt-4" variant="outline">
                View All Leads
              </Button>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common tasks</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start" variant="outline">
                <MapPin className="mr-2 h-4 w-4" />
                New Satellite Scan
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <FileText className="mr-2 h-4 w-4" />
                Generate Proposal
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Building2 className="mr-2 h-4 w-4" />
                Add Manual Lead
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <BarChart3 className="mr-2 h-4 w-4" />
                View Analytics
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-2 gap-6 mt-8">
          <Card className="border-2 border-primary/20 hover:border-primary transition-all">
            <CardHeader>
              <MapPin className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Satellite Roof Analysis</CardTitle>
              <CardDescription>
                AI-powered detection of roof area, shading, and solar potential using satellite imagery
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full">
                Start Scanning
              </Button>
            </CardContent>
          </Card>

          <Card className="border-2 border-primary/20 hover:border-primary transition-all">
            <CardHeader>
              <FileText className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Proposal Generator</CardTitle>
              <CardDescription>
                Auto-generate technical and financial proposals with ROI calculations and system layouts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full">
                Create Proposal
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
