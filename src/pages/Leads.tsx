import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sun, MapPin, Phone, Mail, Building2, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "@/components/Footer";

const Leads = () => {
  const leads = [
    {
      id: 1,
      name: "Tech Park Industries",
      location: "Bangalore, Karnataka",
      contact: "+91 98765 43210",
      email: "contact@techpark.com",
      capacity: "500 kW",
      status: "New",
      statusColor: "bg-blue-500",
    },
    {
      id: 2,
      name: "City Hospital",
      location: "Mumbai, Maharashtra",
      contact: "+91 98765 43211",
      email: "admin@cityhospital.com",
      capacity: "300 kW",
      status: "Proposal Sent",
      statusColor: "bg-yellow-500",
    },
    {
      id: 3,
      name: "Green Valley College",
      location: "Pune, Maharashtra",
      contact: "+91 98765 43212",
      email: "info@greenvalley.edu",
      capacity: "200 kW",
      status: "In Progress",
      statusColor: "bg-green-500",
    },
    {
      id: 4,
      name: "Manufacturing Hub Ltd",
      location: "Hyderabad, Telangana",
      contact: "+91 98765 43213",
      email: "projects@mfghub.com",
      capacity: "750 kW",
      status: "New",
      statusColor: "bg-blue-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted flex flex-col">
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
              <Link to="/dashboard" className="text-sm font-medium text-muted-foreground hover:text-foreground">
                Dashboard
              </Link>
              <Link to="/satellite" className="text-sm font-medium text-muted-foreground hover:text-foreground">
                Satellite Scan
              </Link>
              <Link to="/leads" className="text-sm font-medium text-foreground">
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

      <div className="flex-1 container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">Solar Leads</h2>
            <p className="text-muted-foreground">
              Manage and track your solar installation opportunities
            </p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Lead
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {leads.map((lead) => (
            <Card key={lead.id} className="hover:shadow-solar transition-all cursor-pointer">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <Building2 className="h-5 w-5 text-primary" />
                    <CardTitle className="text-lg">{lead.name}</CardTitle>
                  </div>
                  <Badge className={`${lead.statusColor} text-white`}>
                    {lead.status}
                  </Badge>
                </div>
                <CardDescription className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {lead.location}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{lead.contact}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="truncate">{lead.email}</span>
                  </div>
                </div>
                <div className="pt-3 border-t">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Capacity</span>
                    <span className="font-semibold text-primary">{lead.capacity}</span>
                  </div>
                </div>
                <Button className="w-full" variant="outline">
                  View Details
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Leads;
