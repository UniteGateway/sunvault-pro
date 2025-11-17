import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PenTool } from "lucide-react";

interface ProposalClosingProps {
  data: any;
  onChange: (data: any) => void;
}

export function ProposalClosing({ data, onChange }: ProposalClosingProps) {
  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="closingMessage">Closing Message</Label>
        <Textarea
          id="closingMessage"
          value={data.closingMessage || ""}
          onChange={(e) => onChange({ ...data, closingMessage: e.target.value })}
          placeholder="Thank you for considering our proposal..."
          rows={6}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <Label htmlFor="validityPeriod">Proposal Valid Until</Label>
          <Input
            id="validityPeriod"
            type="date"
            value={data.validityPeriod || ""}
            onChange={(e) => onChange({ ...data, validityPeriod: e.target.value })}
          />
        </div>

        <div>
          <Label htmlFor="proposalDate">Proposal Date</Label>
          <Input
            id="proposalDate"
            type="date"
            value={data.proposalDate || ""}
            onChange={(e) => onChange({ ...data, proposalDate: e.target.value })}
          />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label htmlFor="contactPerson">Contact Person</Label>
              <Input
                id="contactPerson"
                value={data.contactPerson || ""}
                onChange={(e) => onChange({ ...data, contactPerson: e.target.value })}
                placeholder="Sales Manager Name"
              />
            </div>

            <div>
              <Label htmlFor="contactPhone">Phone Number</Label>
              <Input
                id="contactPhone"
                value={data.contactPhone || ""}
                onChange={(e) => onChange({ ...data, contactPhone: e.target.value })}
                placeholder="+91 98765 43210"
              />
            </div>

            <div>
              <Label htmlFor="contactEmail">Email Address</Label>
              <Input
                id="contactEmail"
                type="email"
                value={data.contactEmail || ""}
                onChange={(e) => onChange({ ...data, contactEmail: e.target.value })}
                placeholder="sales@unitesolar.com"
              />
            </div>

            <div>
              <Label htmlFor="website">Website</Label>
              <Input
                id="website"
                value={data.website || ""}
                onChange={(e) => onChange({ ...data, website: e.target.value })}
                placeholder="www.unitesolar.com"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PenTool className="h-5 w-5" />
            Digital Signature
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border-2 border-dashed rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
            <PenTool className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <Button variant="outline">
              Add Digital Signature
            </Button>
            <p className="text-sm text-muted-foreground mt-2">
              Click to add authorized signatory's digital signature
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
