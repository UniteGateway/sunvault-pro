import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { DollarSign, TrendingUp, Clock, CheckCircle2, AlertCircle, Receipt } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { toast } from "sonner";

const PaymentTracker = () => {
  const paymentSchedule = {
    totalCost: 1450000,
    subsidyAmount: 580000,
    netAmount: 870000,
    paidAmount: 435000,
    pendingAmount: 435000,
    milestones: [
      {
        name: "Booking Amount",
        percentage: 10,
        amount: 87000,
        status: "paid",
        dueDate: "2024-01-10",
        paidDate: "2024-01-08",
      },
      {
        name: "Post Site Survey",
        percentage: 15,
        amount: 130500,
        status: "paid",
        dueDate: "2024-01-25",
        paidDate: "2024-01-24",
      },
      {
        name: "Material Procurement",
        percentage: 25,
        amount: 217500,
        status: "paid",
        dueDate: "2024-02-10",
        paidDate: "2024-02-08",
      },
      {
        name: "Installation Completion",
        percentage: 30,
        amount: 261000,
        status: "pending",
        dueDate: "2024-03-05",
        paidDate: null,
      },
      {
        name: "Grid Connection",
        percentage: 15,
        amount: 130500,
        status: "upcoming",
        dueDate: "2024-03-20",
        paidDate: null,
      },
      {
        name: "Final Handover",
        percentage: 5,
        amount: 43500,
        status: "upcoming",
        dueDate: "2024-03-30",
        paidDate: null,
      },
    ],
  };

  const progressPercentage = (paymentSchedule.paidAmount / paymentSchedule.netAmount) * 100;

  const handlePayNow = (milestone: string) => {
    toast.success(`Initiating payment for ${milestone}`);
  };

  const handleDownloadReceipt = (milestone: string) => {
    toast.success(`Downloading receipt for ${milestone}`);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "paid":
        return <Badge className="bg-green-500 text-white">Paid</Badge>;
      case "pending":
        return <Badge className="bg-yellow-500 text-white">Due</Badge>;
      case "upcoming":
        return <Badge variant="secondary">Upcoming</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "paid":
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case "pending":
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      case "upcoming":
        return <Clock className="h-5 w-5 text-muted-foreground" />;
      default:
        return null;
    }
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Payment Tracker</h2>
          <p className="text-muted-foreground">Monitor your solar installation payment schedule</p>
        </div>

        <div className="grid gap-6 md:grid-cols-4 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <DollarSign className="h-5 w-5 text-primary" />
                Total Cost
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">₹{(paymentSchedule.totalCost / 100000).toFixed(2)}L</div>
              <p className="text-xs text-muted-foreground mt-1">Before subsidy</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <TrendingUp className="h-5 w-5 text-accent" />
                Subsidy
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-accent">₹{(paymentSchedule.subsidyAmount / 100000).toFixed(2)}L</div>
              <p className="text-xs text-muted-foreground mt-1">40% government subsidy</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                Paid
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">₹{(paymentSchedule.paidAmount / 100000).toFixed(2)}L</div>
              <p className="text-xs text-muted-foreground mt-1">{progressPercentage.toFixed(0)}% completed</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Clock className="h-5 w-5 text-yellow-500" />
                Pending
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-500">₹{(paymentSchedule.pendingAmount / 100000).toFixed(2)}L</div>
              <p className="text-xs text-muted-foreground mt-1">{(100 - progressPercentage).toFixed(0)}% remaining</p>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Payment Progress</CardTitle>
            <CardDescription>Overall payment completion status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">
                  ₹{(paymentSchedule.paidAmount / 100000).toFixed(2)}L paid of ₹{(paymentSchedule.netAmount / 100000).toFixed(2)}L
                </span>
                <span className="font-semibold">{progressPercentage.toFixed(1)}%</span>
              </div>
              <Progress value={progressPercentage} className="h-3" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Payment Milestones</CardTitle>
            <CardDescription>Scheduled payments based on project stages</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {paymentSchedule.milestones.map((milestone, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-start gap-3 flex-1">
                      {getStatusIcon(milestone.status)}
                      <div className="flex-1">
                        <h4 className="font-semibold">{milestone.name}</h4>
                        <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                          <span>{milestone.percentage}% of total</span>
                          <span>•</span>
                          <span>₹{(milestone.amount / 1000).toFixed(0)}k</span>
                        </div>
                      </div>
                    </div>
                    {getStatusBadge(milestone.status)}
                  </div>

                  <div className="grid md:grid-cols-3 gap-4 mt-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Due Date</p>
                      <p className="font-medium">{new Date(milestone.dueDate).toLocaleDateString()}</p>
                    </div>
                    {milestone.paidDate && (
                      <div>
                        <p className="text-muted-foreground">Paid Date</p>
                        <p className="font-medium">{new Date(milestone.paidDate).toLocaleDateString()}</p>
                      </div>
                    )}
                    <div className="flex items-end gap-2">
                      {milestone.status === "paid" && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDownloadReceipt(milestone.name)}
                        >
                          <Receipt className="mr-2 h-4 w-4" />
                          Receipt
                        </Button>
                      )}
                      {milestone.status === "pending" && (
                        <Button
                          size="sm"
                          onClick={() => handlePayNow(milestone.name)}
                        >
                          <DollarSign className="mr-2 h-4 w-4" />
                          Pay Now
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default PaymentTracker;
