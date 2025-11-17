import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Mail, Share2, FileText, ArrowRight } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const ProposalPDFPreview = () => {
  const navigate = useNavigate();

  const handleDownload = () => {
    toast.success("Proposal PDF downloaded successfully");
  };

  const handleEmail = () => {
    toast.success("Proposal sent via email");
  };

  const handleShare = () => {
    toast.success("Proposal link copied to clipboard");
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Button variant="ghost" onClick={() => navigate("/proposals")} className="mb-4">
            <ArrowRight className="mr-2 h-4 w-4 rotate-180" />
            Back to Proposals
          </Button>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-2">Proposal PDF Preview</h2>
              <p className="text-muted-foreground">Review and share your solar proposal</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleEmail}>
                <Mail className="mr-2 h-4 w-4" />
                Email
              </Button>
              <Button variant="outline" onClick={handleShare}>
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>
              <Button onClick={handleDownload}>
                <Download className="mr-2 h-4 w-4" />
                Download PDF
              </Button>
            </div>
          </div>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Document Preview
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* PDF Preview Container */}
            <div className="border-2 border-dashed rounded-lg p-8 min-h-[600px] bg-muted/20">
              <div className="max-w-4xl mx-auto bg-background shadow-lg rounded-lg p-8 space-y-6">
                {/* Header */}
                <div className="border-b pb-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h1 className="text-3xl font-bold text-primary">Unite Solar</h1>
                      <p className="text-sm text-muted-foreground mt-1">Solar Installation Proposal</p>
                    </div>
                    <div className="text-right text-sm">
                      <p className="font-semibold">Proposal #2024-001</p>
                      <p className="text-muted-foreground">Date: {new Date().toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>

                {/* Client Details */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-2">Client Information</h3>
                    <div className="text-sm space-y-1">
                      <p>Tech Park Industries</p>
                      <p className="text-muted-foreground">Bangalore, Karnataka</p>
                      <p className="text-muted-foreground">contact@techpark.com</p>
                      <p className="text-muted-foreground">+91 98765 43210</p>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">System Overview</h3>
                    <div className="text-sm space-y-1">
                      <p>System Size: <span className="font-medium">25 kW</span></p>
                      <p>Panel Count: <span className="font-medium">62 units</span></p>
                      <p>Annual Generation: <span className="font-medium">35,000 kWh</span></p>
                      <p>Monthly Savings: <span className="font-medium">₹28,000</span></p>
                    </div>
                  </div>
                </div>

                {/* Cost Summary */}
                <div className="bg-muted p-4 rounded-lg">
                  <h3 className="font-semibold mb-3">Investment Summary</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Total System Cost</span>
                      <span className="font-medium">₹14,50,000</span>
                    </div>
                    <div className="flex justify-between text-accent">
                      <span>Government Subsidy (40%)</span>
                      <span className="font-medium">- ₹5,80,000</span>
                    </div>
                    <div className="border-t pt-2 flex justify-between text-base">
                      <span className="font-semibold">Net Investment</span>
                      <span className="font-bold text-primary">₹8,70,000</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>Payback Period</span>
                      <span className="font-medium">3.5 years</span>
                    </div>
                  </div>
                </div>

                {/* Key Features */}
                <div>
                  <h3 className="font-semibold mb-3">Key Features</h3>
                  <ul className="grid md:grid-cols-2 gap-2 text-sm">
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
                      Net Metering Support
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
                      25 Year Panel Warranty
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
                      Remote Monitoring System
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
                      Professional Installation
                    </li>
                  </ul>
                </div>

                {/* Footer */}
                <div className="border-t pt-6 text-center text-sm text-muted-foreground">
                  <p>This proposal is valid for 30 days from the date of issue</p>
                  <p className="mt-2">For queries, contact: support@unitesolar.com | +91 1800-SOLAR-01</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default ProposalPDFPreview;
