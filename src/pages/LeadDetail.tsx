import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Building2, MapPin, Phone, Mail, Calendar, User, FileText, 
  MessageSquare, ArrowRight, Clock, TrendingUp 
} from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const LeadDetail = () => {
  const navigate = useNavigate();

  const lead = {
    id: 1,
    name: "Tech Park Industries",
    location: "Bangalore, Karnataka",
    contact: "+91 98765 43210",
    email: "contact@techpark.com",
    capacity: "500 kW",
    status: "In Progress",
    statusColor: "bg-green-500",
    createdAt: "2024-01-15",
    contactPerson: "Rajesh Kumar",
    designation: "Facilities Manager",
    buildingType: "Commercial Office",
    roofArea: 5000,
    currentBill: 125000,
    timeline: [
      { date: "2024-01-15", event: "Lead Created", status: "completed" },
      { date: "2024-01-18", event: "Initial Contact Made", status: "completed" },
      { date: "2024-01-22", event: "Site Survey Scheduled", status: "completed" },
      { date: "2024-01-25", event: "Proposal Sent", status: "current" },
      { date: "Pending", event: "Contract Signing", status: "pending" },
    ],
    notes: [
      { date: "2024-01-22", author: "Sales Team", note: "Client interested in premium panels with extended warranty" },
      { date: "2024-01-20", author: "Engineer", note: "Roof suitable for solar installation, minimal shading" },
    ],
  };

  const handleSaveNote = () => {
    toast.success("Note added successfully");
  };

  const handleUpdateStatus = () => {
    toast.success("Lead status updated");
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Button variant="ghost" onClick={() => navigate("/leads")} className="mb-4">
            <ArrowRight className="mr-2 h-4 w-4 rotate-180" />
            Back to Leads
          </Button>
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-3xl font-bold">{lead.name}</h2>
                <Badge className={`${lead.statusColor} text-white`}>{lead.status}</Badge>
              </div>
              <p className="text-muted-foreground flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                {lead.location}
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => navigate("/satellite")}>
                Scan Roof
              </Button>
              <Button onClick={() => navigate("/proposals")}>Generate Proposal</Button>
            </div>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <User className="h-4 w-4 text-muted-foreground mt-0.5" />
                <div>
                  <p className="font-medium">{lead.contactPerson}</p>
                  <p className="text-muted-foreground">{lead.designation}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{lead.contact}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="truncate">{lead.email}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Project Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Building Type:</span>
                <span className="font-medium">{lead.buildingType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Roof Area:</span>
                <span className="font-medium">{lead.roofArea} sq ft</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Target Capacity:</span>
                <span className="font-medium text-primary">{lead.capacity}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Financial Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Monthly Bill:</span>
                <span className="font-medium">₹{(lead.currentBill / 1000).toFixed(0)}k</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Potential Savings:</span>
                <span className="font-medium text-accent">₹{(lead.currentBill * 0.7 / 1000).toFixed(0)}k/mo</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Created:</span>
                <span className="font-medium">{new Date(lead.createdAt).toLocaleDateString()}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="timeline" className="space-y-6">
          <TabsList>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
            <TabsTrigger value="notes">Notes</TabsTrigger>
            <TabsTrigger value="update">Update Lead</TabsTrigger>
          </TabsList>

          <TabsContent value="timeline">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Lead Timeline
                </CardTitle>
                <CardDescription>Track the progress of this lead through the sales pipeline</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {lead.timeline.map((item, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className={`mt-1 h-4 w-4 rounded-full ${
                        item.status === 'completed' ? 'bg-primary' : 
                        item.status === 'current' ? 'bg-accent' : 'bg-muted'
                      }`} />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="font-medium">{item.event}</p>
                          <span className="text-sm text-muted-foreground">{item.date}</span>
                        </div>
                        {item.status === 'current' && (
                          <Badge variant="secondary" className="mt-1">In Progress</Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notes">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Notes & Communications
                </CardTitle>
                <CardDescription>Internal notes and communication history</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  {lead.notes.map((note, index) => (
                    <div key={index} className="border-l-2 border-primary pl-4 py-2">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-sm">{note.author}</span>
                        <span className="text-xs text-muted-foreground">{note.date}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{note.note}</p>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 pt-4 border-t">
                  <Label htmlFor="new-note">Add New Note</Label>
                  <Textarea id="new-note" placeholder="Enter your note here..." />
                  <Button onClick={handleSaveNote}>Save Note</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="update">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Update Lead Information
                </CardTitle>
                <CardDescription>Modify lead details and status</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <Input id="status" defaultValue={lead.status} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="capacity">Target Capacity</Label>
                    <Input id="capacity" defaultValue={lead.capacity} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact-person">Contact Person</Label>
                    <Input id="contact-person" defaultValue={lead.contactPerson} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" defaultValue={lead.contact} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notes-update">Additional Notes</Label>
                  <Textarea id="notes-update" placeholder="Any additional information..." />
                </div>
                <Button onClick={handleUpdateStatus}>Update Lead</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default LeadDetail;
