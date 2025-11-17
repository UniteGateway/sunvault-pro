import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";

interface ProposalAssessmentProps {
  data: any;
  onChange: (data: any) => void;
}

export function ProposalAssessment({ data, onChange }: ProposalAssessmentProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Site Assessment Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label htmlFor="roofType">Roof Type</Label>
              <Input
                id="roofType"
                value={data.roofType || ""}
                onChange={(e) => onChange({ ...data, roofType: e.target.value })}
                placeholder="RCC / Metal / Asbestos"
              />
            </div>

            <div>
              <Label htmlFor="roofCondition">Roof Condition</Label>
              <Input
                id="roofCondition"
                value={data.roofCondition || ""}
                onChange={(e) => onChange({ ...data, roofCondition: e.target.value })}
                placeholder="Good / Fair / Requires Repair"
              />
            </div>

            <div>
              <Label htmlFor="shadingAnalysis">Shading Analysis</Label>
              <Input
                id="shadingAnalysis"
                value={data.shadingAnalysis || ""}
                onChange={(e) => onChange({ ...data, shadingAnalysis: e.target.value })}
                placeholder="Minimal / Moderate / Significant"
              />
            </div>

            <div>
              <Label htmlFor="orientation">Optimal Orientation</Label>
              <Input
                id="orientation"
                value={data.orientation || ""}
                onChange={(e) => onChange({ ...data, orientation: e.target.value })}
                placeholder="South / South-East / South-West"
              />
            </div>

            <div>
              <Label htmlFor="tiltAngle">Recommended Tilt Angle</Label>
              <Input
                id="tiltAngle"
                value={data.tiltAngle || ""}
                onChange={(e) => onChange({ ...data, tiltAngle: e.target.value })}
                placeholder="15°"
              />
            </div>

            <div>
              <Label htmlFor="gridConnection">Grid Connection Distance</Label>
              <Input
                id="gridConnection"
                value={data.gridConnection || ""}
                onChange={(e) => onChange({ ...data, gridConnection: e.target.value })}
                placeholder="50 meters"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="siteObservations">Site Observations</Label>
            <Textarea
              id="siteObservations"
              value={data.siteObservations || ""}
              onChange={(e) => onChange({ ...data, siteObservations: e.target.value })}
              placeholder="Detailed observations from site visit..."
              rows={6}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Feasibility Report</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            {[
              "Site suitable for solar installation",
              "No major structural modifications required",
              "Adequate space for proposed system capacity",
              "Grid connectivity available",
              "No legal restrictions identified",
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-primary/5 rounded-lg">
                <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>

          <div>
            <Label htmlFor="recommendations">Recommendations</Label>
            <Textarea
              id="recommendations"
              value={data.recommendations || ""}
              onChange={(e) => onChange({ ...data, recommendations: e.target.value })}
              placeholder="Technical recommendations for optimal system performance..."
              rows={6}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
