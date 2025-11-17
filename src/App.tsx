import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Satellite from "./pages/Satellite";
import RooftopMonitoring from "./pages/RooftopMonitoring";
import Leads from "./pages/Leads";
import LeadDetail from "./pages/LeadDetail";
import Proposals from "./pages/Proposals";
import RoofAreaResult from "./pages/RoofAreaResult";
import ShadingAnalysis from "./pages/ShadingAnalysis";
import SolarRecommendation from "./pages/SolarRecommendation";
import ProposalPDFPreview from "./pages/ProposalPDFPreview";
import ProposalBuilder from "./pages/ProposalBuilder";
import BuilderForms from "./pages/BuilderForms";
import LayoutsDocuments from "./pages/LayoutsDocuments";
import ProjectStatus from "./pages/ProjectStatus";
import PaymentTracker from "./pages/PaymentTracker";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/satellite" element={<Satellite />} />
          <Route path="/rooftop-monitoring" element={<RooftopMonitoring />} />
          <Route path="/roof-area-result" element={<RoofAreaResult />} />
          <Route path="/shading-analysis" element={<ShadingAnalysis />} />
          <Route path="/solar-recommendation" element={<SolarRecommendation />} />
          <Route path="/leads" element={<Leads />} />
          <Route path="/lead-detail/:id" element={<LeadDetail />} />
          <Route path="/proposals" element={<Proposals />} />
          <Route path="/proposal-pdf/:id" element={<ProposalPDFPreview />} />
          <Route path="/proposal-builder" element={<ProposalBuilder />} />
          <Route path="/builder-forms" element={<BuilderForms />} />
          <Route path="/layouts-documents" element={<LayoutsDocuments />} />
          <Route path="/project-status" element={<ProjectStatus />} />
          <Route path="/payment-tracker" element={<PaymentTracker />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
