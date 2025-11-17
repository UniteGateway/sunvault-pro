import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sun, FileText, Calendar, DollarSign, Download, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "@/components/Footer";

const Proposals = () => {
  const proposals = [
    {
      id: 1,
      client: "Tech Park Industries",
      date: "2024-01-15",
      capacity: "500 kW",
      amount: "₹4,50,00,000",
      status: "Pending",
      statusColor: "bg-yellow-500",
    },
    {
      id: 2,
      client: "City Hospital",
      date: "2024-01-12",
      capacity: "300 kW",
      amount: "₹2,70,00,000",
      status: "Accepted",
      statusColor: "bg-green-500",
    },
    {
      id: 3,
      client: "Green Valley College",
      date: "2024-01-10",
      capacity: "200 kW",
      amount: "₹1,80,00,000",
      status: "Under Review",
      statusColor: "bg-blue-500",
    },
    {
      id: 4,
      client: "Manufacturing Hub Ltd",
      date: "2024-01-08",
      capacity: "750 kW",
      amount: "₹6,75,00,000",
      status: "Pending",
      statusColor: "bg-yellow-500",
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
              <Link to="/leads" className="text-sm font-medium text-muted-foreground hover:text-foreground">
                Leads
              </Link>
              <Link to="/proposals" className="text-sm font-medium text-foreground">
                Proposals
              </Link>
              <Button size="sm" variant="outline">Profile</Button>
            </nav>
          </div>
        </div>
      </header>

      <div className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Solar Proposals</h2>
          <p className="text-muted-foreground">
            Track and manage all your solar installation proposals
          </p>
        </div>

        <div className="space-y-4">
          {proposals.map((proposal) => (
            <Card key={proposal.id} className="hover:shadow-solar transition-all">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <FileText className="h-6 w-6 text-primary" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-semibold text-lg">{proposal.client}</h3>
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {new Date(proposal.date).toLocaleDateString('en-IN')}
                        </div>
                        <div className="flex items-center gap-1">
                          <Sun className="h-4 w-4" />
                          {proposal.capacity}
                        </div>
                        <div className="flex items-center gap-1">
                          <DollarSign className="h-4 w-4" />
                          {proposal.amount}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Badge className={`${proposal.statusColor} text-white`}>
                      {proposal.status}
                    </Badge>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      <Button size="sm" variant="outline">
                        <Download className="h-4 w-4 mr-1" />
                        Download
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Proposals;
