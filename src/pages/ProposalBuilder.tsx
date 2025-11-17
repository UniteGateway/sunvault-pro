import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Save, Eye, Send } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { useNavigate } from "react-router-dom";
import { ProposalCoverPage } from "@/components/proposal/ProposalCoverPage";
import { ProposalOverview } from "@/components/proposal/ProposalOverview";
import { ProposalBOQ } from "@/components/proposal/ProposalBOQ";
import { ProposalFinancials } from "@/components/proposal/ProposalFinancials";
import { ProposalTerms } from "@/components/proposal/ProposalTerms";
import { ProposalROI } from "@/components/proposal/ProposalROI";
import { ProposalAssessment } from "@/components/proposal/ProposalAssessment";
import { ProposalClosing } from "@/components/proposal/ProposalClosing";
import { toast } from "sonner";

const ProposalBuilder = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("cover");
  const [proposalData, setProposalData] = useState({
    clientName: "",
    systemCapacity: 0,
    totalCost: 0,
  });

  const handleSave = () => {
    toast.success("Proposal saved as draft");
  };

  const handlePreview = () => {
    navigate("/proposal-preview", { state: { proposalData } });
  };

  const tabs = [
    { value: "cover", label: "Cover Page", component: ProposalCoverPage },
    { value: "overview", label: "Overview", component: ProposalOverview },
    { value: "boq", label: "BOQ", component: ProposalBOQ },
    { value: "financials", label: "Financials", component: ProposalFinancials },
    { value: "roi", label: "ROI & EMI", component: ProposalROI },
    { value: "assessment", label: "Assessment", component: ProposalAssessment },
    { value: "terms", label: "Terms", component: ProposalTerms },
    { value: "closing", label: "Closing", component: ProposalClosing },
  ];

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">Proposal Builder</h2>
            <p className="text-muted-foreground">
              Create comprehensive solar installation proposals
            </p>
          </div>
          <div className="flex gap-2">
            <Button onClick={handleSave} variant="outline">
              <Save className="mr-2 h-4 w-4" />
              Save Draft
            </Button>
            <Button onClick={handlePreview} variant="outline">
              <Eye className="mr-2 h-4 w-4" />
              Preview
            </Button>
            <Button>
              <Send className="mr-2 h-4 w-4" />
              Send Proposal
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Proposal Content
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-4 lg:grid-cols-8 mb-6">
                {tabs.map((tab) => (
                  <TabsTrigger key={tab.value} value={tab.value}>
                    {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>

              {tabs.map((tab) => (
                <TabsContent key={tab.value} value={tab.value}>
                  <tab.component 
                    data={proposalData}
                    onChange={setProposalData}
                  />
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default ProposalBuilder;
