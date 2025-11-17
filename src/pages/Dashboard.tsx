import DashboardLayout from "@/components/DashboardLayout";
import { useUserRole } from "@/hooks/useUserRole";
import AdminDashboard from "./dashboards/AdminDashboard";
import SalesDashboard from "./dashboards/SalesDashboard";
import EngineerDashboard from "./dashboards/EngineerDashboard";
import BuilderDashboard from "./dashboards/BuilderDashboard";
import CustomerDashboard from "./dashboards/CustomerDashboard";

const Dashboard = () => {
  const { roles, loading, isAdmin, isSales, isEngineer, isBuilder, isCustomer } = useUserRole();

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" />
        </div>
      </DashboardLayout>
    );
  }

  // Role-based dashboard routing
  const renderDashboard = () => {
    if (isAdmin) return <AdminDashboard />;
    if (isSales) return <SalesDashboard />;
    if (isEngineer) return <EngineerDashboard />;
    if (isBuilder) return <BuilderDashboard />;
    if (isCustomer) return <CustomerDashboard />;
    
    // Default fallback
    return <CustomerDashboard />;
  };

  return (
    <DashboardLayout>
      {renderDashboard()}
    </DashboardLayout>
  );
};

export default Dashboard;
