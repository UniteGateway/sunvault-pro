import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface ProposalOverviewProps {
  data: any;
  onChange: (data: any) => void;
}

export function ProposalOverview({ data, onChange }: ProposalOverviewProps) {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <Label htmlFor="systemCapacity">System Capacity (kW)</Label>
          <Input
            id="systemCapacity"
            type="number"
            value={data.systemCapacity || ""}
            onChange={(e) => onChange({ ...data, systemCapacity: parseFloat(e.target.value) })}
            placeholder="500"
          />
        </div>

        <div>
          <Label htmlFor="location">Project Location</Label>
          <Input
            id="location"
            value={data.location || ""}
            onChange={(e) => onChange({ ...data, location: e.target.value })}
            placeholder="City, State"
          />
        </div>

        <div>
          <Label htmlFor="roofArea">Total Roof Area (sq ft)</Label>
          <Input
            id="roofArea"
            type="number"
            value={data.roofArea || ""}
            onChange={(e) => onChange({ ...data, roofArea: parseFloat(e.target.value) })}
            placeholder="5000"
          />
        </div>

        <div>
          <Label htmlFor="panelCount">Number of Panels</Label>
          <Input
            id="panelCount"
            type="number"
            value={data.panelCount || ""}
            onChange={(e) => onChange({ ...data, panelCount: parseInt(e.target.value) })}
            placeholder="1000"
          />
        </div>

        <div>
          <Label htmlFor="panelWattage">Panel Wattage (W)</Label>
          <Input
            id="panelWattage"
            type="number"
            value={data.panelWattage || ""}
            onChange={(e) => onChange({ ...data, panelWattage: parseInt(e.target.value) })}
            placeholder="540"
          />
        </div>

        <div>
          <Label htmlFor="annualGeneration">Annual Generation (kWh)</Label>
          <Input
            id="annualGeneration"
            type="number"
            value={data.annualGeneration || ""}
            onChange={(e) => onChange({ ...data, annualGeneration: parseFloat(e.target.value) })}
            placeholder="750000"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="projectDescription">Project Description</Label>
        <Textarea
          id="projectDescription"
          value={data.projectDescription || ""}
          onChange={(e) => onChange({ ...data, projectDescription: e.target.value })}
          placeholder="Detailed description of the solar project..."
          rows={6}
        />
      </div>

      <div>
        <Label htmlFor="keyFeatures">Key Features</Label>
        <Textarea
          id="keyFeatures"
          value={data.keyFeatures || ""}
          onChange={(e) => onChange({ ...data, keyFeatures: e.target.value })}
          placeholder="• High-efficiency panels&#10;• 25-year warranty&#10;• Net metering enabled"
          rows={6}
        />
      </div>
    </div>
  );
}
