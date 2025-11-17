import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Download, Eye, Plus } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";

const Proposals = () => {
  const proposals = [
    {
      id: 1,
      clientName: "Tech Park Industries",
      sentDate: "2024-01-15",
      validUntil: "2024-02-15",
      capacity: "500 kW",
      amount: 45000000,
      status: "Pending",
      statusColor: "bg-yellow-500",
    },
    {
      id: 2,
      clientName: "City Hospital",
      sentDate: "2024-01-12",
      validUntil: "2024-02-12",
      capacity: "300 kW",
      amount: 27000000,
      status: "Accepted",
      statusColor: "bg-green-500",
    },
    {
      id: 3,
      clientName: "Green Valley College",
      sentDate: "2024-01-10",
      validUntil: "2024-02-10",
      capacity: "200 kW",
      amount: 18000000,
      status: "Under Review",
      statusColor: "bg-blue-500",
    },
    {
      id: 4,
      clientName: "Manufacturing Hub Ltd",
      sentDate: "2024-01-08",
      validUntil: "2024-02-08",
      capacity: "750 kW",
      amount: 67500000,
      status: "Pending",
      statusColor: "bg-yellow-500",
    },
  ];

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">Proposals</h2>
            <p className="text-muted-foreground">
              Generate and manage solar installation proposals
            </p>
          </div>
          <Button onClick={() => window.location.href = '/proposal-builder'}>
            <Plus className="mr-2 h-4 w-4" />
            New Proposal
          </Button>
        </div>

        <div className="grid gap-6">
          {proposals.map((proposal) => (
            <Card key={proposal.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <FileText className="h-6 w-6 text-primary" />
                    <div>
                      <CardTitle className="text-xl">{proposal.clientName}</CardTitle>
                      <CardDescription>
                        {proposal.capacity} • ₹{proposal.amount.toLocaleString('en-IN')}
                      </CardDescription>
                    </div>
                  </div>
                  <Badge className={`${proposal.statusColor} text-white`}>
                    {proposal.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Sent: {proposal.sentDate}</p>
                    {proposal.validUntil && (
                      <p className="text-sm text-muted-foreground">Valid until: {proposal.validUntil}</p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Eye className="mr-2 h-4 w-4" />
                      View
                    </Button>
                    <Button size="sm" variant="outline">
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Proposals;
