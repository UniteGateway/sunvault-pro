import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Download, Eye, Upload, Folder, Image } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { toast } from "sonner";

const LayoutsDocuments = () => {
  const documents = [
    {
      id: 1,
      name: "Single Line Diagram (SLD)",
      type: "Technical Drawing",
      size: "2.4 MB",
      date: "2024-01-20",
      status: "Approved",
      category: "Engineering",
    },
    {
      id: 2,
      name: "Bill of Materials (BOM)",
      type: "Excel Sheet",
      size: "156 KB",
      date: "2024-01-22",
      status: "Pending Review",
      category: "Procurement",
    },
    {
      id: 3,
      name: "Panel Layout Design",
      type: "CAD Drawing",
      size: "5.1 MB",
      date: "2024-01-18",
      status: "Approved",
      category: "Engineering",
    },
    {
      id: 4,
      name: "Load Calculation Report",
      type: "PDF Document",
      size: "892 KB",
      date: "2024-01-19",
      status: "Approved",
      category: "Engineering",
    },
    {
      id: 5,
      name: "Structural Assessment",
      type: "PDF Document",
      size: "1.2 MB",
      date: "2024-01-21",
      status: "In Progress",
      category: "Engineering",
    },
    {
      id: 6,
      name: "Installation Manual",
      type: "PDF Document",
      size: "3.8 MB",
      date: "2024-01-15",
      status: "Approved",
      category: "Documentation",
    },
  ];

  const handleDownload = (docName: string) => {
    toast.success(`Downloading ${docName}`);
  };

  const handleView = (docName: string) => {
    toast.success(`Opening ${docName}`);
  };

  const handleUpload = () => {
    toast.success("Document uploaded successfully");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved":
        return "bg-green-500";
      case "Pending Review":
        return "bg-yellow-500";
      case "In Progress":
        return "bg-blue-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-2">Layouts & Documents</h2>
              <p className="text-muted-foreground">Technical drawings, BOMs, and project documentation</p>
            </div>
            <Button onClick={handleUpload}>
              <Upload className="mr-2 h-4 w-4" />
              Upload Document
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-4 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <FileText className="h-5 w-5 text-primary" />
                Total Documents
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">{documents.length}</div>
              <p className="text-sm text-muted-foreground mt-1">Files stored</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Folder className="h-5 w-5 text-accent" />
                Categories
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-accent">4</div>
              <p className="text-sm text-muted-foreground mt-1">Document types</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Image className="h-5 w-5 text-secondary" />
                Drawings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-secondary">8</div>
              <p className="text-sm text-muted-foreground mt-1">Technical layouts</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <FileText className="h-5 w-5 text-primary" />
                Reports
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">12</div>
              <p className="text-sm text-muted-foreground mt-1">Analysis reports</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Document Library</CardTitle>
            <CardDescription>All project documents and technical drawings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {documents.map((doc) => (
                <div
                  key={doc.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <FileText className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold">{doc.name}</h4>
                      <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
                        <span>{doc.type}</span>
                        <span>•</span>
                        <span>{doc.size}</span>
                        <span>•</span>
                        <span>{doc.date}</span>
                        <span>•</span>
                        <Badge variant="secondary">{doc.category}</Badge>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge className={`${getStatusColor(doc.status)} text-white`}>
                      {doc.status}
                    </Badge>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleView(doc.name)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDownload(doc.name)}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
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

export default LayoutsDocuments;
