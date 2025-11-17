import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  CheckCircle2, Circle, Clock, AlertCircle, Users, Calendar, 
  Wrench, FileCheck, Zap 
} from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";

const ProjectStatus = () => {
  const project = {
    name: "Tech Park Solar Installation",
    location: "Bangalore, Karnataka",
    capacity: "500 kW",
    progress: 65,
    startDate: "2024-01-15",
    expectedCompletion: "2024-03-30",
    currentPhase: "Installation",
  };

  const stages = [
    {
      name: "Documentation & Approval",
      status: "completed",
      date: "2024-01-20",
      icon: FileCheck,
      tasks: [
        { name: "Site survey completed", status: "completed" },
        { name: "Permits obtained", status: "completed" },
        { name: "Net metering approval", status: "completed" },
      ],
    },
    {
      name: "Procurement",
      status: "completed",
      date: "2024-02-05",
      icon: Wrench,
      tasks: [
        { name: "Solar panels ordered", status: "completed" },
        { name: "Inverters received", status: "completed" },
        { name: "Mounting structures delivered", status: "completed" },
      ],
    },
    {
      name: "Installation",
      status: "in-progress",
      date: "2024-02-15",
      icon: Zap,
      tasks: [
        { name: "Structure mounting", status: "completed" },
        { name: "Panel installation", status: "in-progress" },
        { name: "Electrical wiring", status: "pending" },
      ],
    },
    {
      name: "Testing & Commissioning",
      status: "pending",
      date: "2024-03-10",
      icon: CheckCircle2,
      tasks: [
        { name: "System testing", status: "pending" },
        { name: "Grid connectivity", status: "pending" },
        { name: "Final inspection", status: "pending" },
      ],
    },
  ];

  const team = [
    { name: "Rajesh Kumar", role: "Project Manager", contact: "+91 98765 43210" },
    { name: "Amit Singh", role: "Lead Engineer", contact: "+91 98765 43211" },
    { name: "Priya Sharma", role: "Site Supervisor", contact: "+91 98765 43212" },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case "in-progress":
        return <Clock className="h-5 w-5 text-blue-500" />;
      case "pending":
        return <Circle className="h-5 w-5 text-muted-foreground" />;
      default:
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
    }
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">{project.name}</h2>
          <p className="text-muted-foreground">{project.location} • {project.capacity} System</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Overall Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-bold text-primary">{project.progress}%</span>
                  <Badge variant="secondary">{project.currentPhase}</Badge>
                </div>
                <Progress value={project.progress} className="h-3" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Calendar className="h-5 w-5 text-accent" />
                Timeline
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Start Date:</span>
                <span className="font-medium">{new Date(project.startDate).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Completion:</span>
                <span className="font-medium">{new Date(project.expectedCompletion).toLocaleDateString()}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Users className="h-5 w-5 text-secondary" />
                Team Members
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-secondary">{team.length}</div>
              <p className="text-sm text-muted-foreground mt-1">Active personnel</p>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Project Stages</CardTitle>
            <CardDescription>Detailed breakdown of installation progress</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {stages.map((stage, index) => {
              const StageIcon = stage.icon;
              return (
                <div key={index} className="space-y-3">
                  <div className="flex items-center gap-4">
                    <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${
                      stage.status === 'completed' ? 'bg-green-500/10' :
                      stage.status === 'in-progress' ? 'bg-blue-500/10' : 'bg-muted'
                    }`}>
                      <StageIcon className={`h-5 w-5 ${
                        stage.status === 'completed' ? 'text-green-500' :
                        stage.status === 'in-progress' ? 'text-blue-500' : 'text-muted-foreground'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold">{stage.name}</h4>
                        <span className="text-sm text-muted-foreground">{stage.date}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        {getStatusIcon(stage.status)}
                        <span className="text-sm text-muted-foreground capitalize">{stage.status.replace('-', ' ')}</span>
                      </div>
                    </div>
                  </div>
                  <div className="ml-14 space-y-2">
                    {stage.tasks.map((task, taskIndex) => (
                      <div key={taskIndex} className="flex items-center gap-2 text-sm">
                        {getStatusIcon(task.status)}
                        <span className={task.status === 'completed' ? 'line-through text-muted-foreground' : ''}>
                          {task.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Project Team</CardTitle>
            <CardDescription>Contact information for key personnel</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              {team.map((member, index) => (
                <div key={index} className="border rounded-lg p-4 space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold">{member.name}</p>
                      <p className="text-sm text-muted-foreground">{member.role}</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="w-full">
                    {member.contact}
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default ProjectStatus;
