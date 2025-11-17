import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Upload, Image as ImageIcon } from "lucide-react";

interface ProposalCoverPageProps {
  data: any;
  onChange: (data: any) => void;
}

export function ProposalCoverPage({ data, onChange }: ProposalCoverPageProps) {
  return (
    <div className="space-y-6">
      <div className="grid gap-4">
        <div>
          <Label htmlFor="clientName">Client Name</Label>
          <Input
            id="clientName"
            value={data.clientName || ""}
            onChange={(e) => onChange({ ...data, clientName: e.target.value })}
            placeholder="Enter client name"
          />
        </div>

        <div>
          <Label htmlFor="projectTitle">Project Title</Label>
          <Input
            id="projectTitle"
            value={data.projectTitle || ""}
            onChange={(e) => onChange({ ...data, projectTitle: e.target.value })}
            placeholder="Solar Installation Project"
          />
        </div>

        <div>
          <Label htmlFor="subtitle">Subtitle</Label>
          <Input
            id="subtitle"
            value={data.subtitle || ""}
            onChange={(e) => onChange({ ...data, subtitle: e.target.value })}
            placeholder="Renewable Energy Solution"
          />
        </div>

        <div>
          <Label htmlFor="coverDescription">Cover Description</Label>
          <Textarea
            id="coverDescription"
            value={data.coverDescription || ""}
            onChange={(e) => onChange({ ...data, coverDescription: e.target.value })}
            placeholder="Brief description for the cover page"
            rows={4}
          />
        </div>

        <div>
          <Label>Cover Image</Label>
          <div className="mt-2 border-2 border-dashed rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
            <ImageIcon className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <Button variant="outline">
              <Upload className="mr-2 h-4 w-4" />
              Upload Cover Image
            </Button>
            <p className="text-sm text-muted-foreground mt-2">
              Recommended size: 1920x1080px
            </p>
          </div>
        </div>

        <div>
          <Label>Company Logo</Label>
          <div className="mt-2 border-2 border-dashed rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
            <ImageIcon className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <Button variant="outline">
              <Upload className="mr-2 h-4 w-4" />
              Upload Logo
            </Button>
            <p className="text-sm text-muted-foreground mt-2">
              Recommended size: 400x200px
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
