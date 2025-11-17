import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Building2, Upload, FileText, Plus } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { toast } from "sonner";

const BuilderForms = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Project details submitted successfully");
  };

  const handleFileUpload = () => {
    toast.success("Document uploaded successfully");
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Builder / Property Owner Portal</h2>
          <p className="text-muted-foreground">Submit project details and documentation</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Building2 className="h-5 w-5 text-primary" />
                Active Projects
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">12</div>
              <p className="text-sm text-muted-foreground mt-1">Currently registered</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <FileText className="h-5 w-5 text-accent" />
                Documents
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-accent">48</div>
              <p className="text-sm text-muted-foreground mt-1">Files uploaded</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Upload className="h-5 w-5 text-secondary" />
                Pending Review
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-secondary">3</div>
              <p className="text-sm text-muted-foreground mt-1">Awaiting approval</p>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Add New Project</CardTitle>
            <CardDescription>Register a new property for solar installation</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="project-name">Project Name *</Label>
                  <Input id="project-name" placeholder="e.g., Green Valley Apartments" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="builder-name">Builder / Owner Name *</Label>
                  <Input id="builder-name" placeholder="Your company or full name" required />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="location">Project Location *</Label>
                  <Input id="location" placeholder="City, State" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="building-type">Building Type *</Label>
                  <Input id="building-type" placeholder="e.g., Residential, Commercial" required />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="total-units">Total Units / Buildings</Label>
                  <Input id="total-units" type="number" placeholder="Number of units" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="roof-area">Estimated Roof Area (sq ft)</Label>
                  <Input id="roof-area" type="number" placeholder="Total roof area" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="project-address">Complete Address *</Label>
                <Textarea 
                  id="project-address" 
                  placeholder="Full project address with pincode" 
                  required 
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="project-description">Project Description</Label>
                <Textarea 
                  id="project-description" 
                  placeholder="Additional details about the project..."
                  rows={4}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="contact-person">Contact Person *</Label>
                  <Input id="contact-person" placeholder="Primary contact name" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact-number">Contact Number *</Label>
                  <Input id="contact-number" type="tel" placeholder="+91 XXXXX XXXXX" required />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="contact-email">Email Address *</Label>
                <Input id="contact-email" type="email" placeholder="your@email.com" required />
              </div>

              <Button type="submit" className="w-full">
                <Plus className="mr-2 h-4 w-4" />
                Submit Project Details
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upload Documents</CardTitle>
            <CardDescription>Submit required property and legal documents</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="border-2 border-dashed rounded-lg p-6 text-center hover:border-primary transition-colors cursor-pointer">
                <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                <p className="font-medium mb-1">Property Documents</p>
                <p className="text-sm text-muted-foreground mb-3">Title deed, ownership proof</p>
                <Button variant="outline" size="sm" onClick={handleFileUpload}>
                  Upload Files
                </Button>
              </div>

              <div className="border-2 border-dashed rounded-lg p-6 text-center hover:border-primary transition-colors cursor-pointer">
                <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                <p className="font-medium mb-1">Building Plans</p>
                <p className="text-sm text-muted-foreground mb-3">Layout, structural drawings</p>
                <Button variant="outline" size="sm" onClick={handleFileUpload}>
                  Upload Files
                </Button>
              </div>

              <div className="border-2 border-dashed rounded-lg p-6 text-center hover:border-primary transition-colors cursor-pointer">
                <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                <p className="font-medium mb-1">Project Photos</p>
                <p className="text-sm text-muted-foreground mb-3">Current site images</p>
                <Button variant="outline" size="sm" onClick={handleFileUpload}>
                  Upload Files
                </Button>
              </div>

              <div className="border-2 border-dashed rounded-lg p-6 text-center hover:border-primary transition-colors cursor-pointer">
                <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                <p className="font-medium mb-1">Brochures</p>
                <p className="text-sm text-muted-foreground mb-3">Marketing materials (optional)</p>
                <Button variant="outline" size="sm" onClick={handleFileUpload}>
                  Upload Files
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default BuilderForms;
