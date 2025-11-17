import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

interface ProposalFinancialsProps {
  data: any;
  onChange: (data: any) => void;
}

export function ProposalFinancials({ data, onChange }: ProposalFinancialsProps) {
  const calculateTotals = () => {
    const equipmentCost = parseFloat(data.equipmentCost || 0);
    const installationCost = parseFloat(data.installationCost || 0);
    const tax = parseFloat(data.tax || 0);
    
    const subtotal = equipmentCost + installationCost;
    const taxAmount = (subtotal * tax) / 100;
    const total = subtotal + taxAmount;
    
    return { subtotal, taxAmount, total };
  };

  const { subtotal, taxAmount, total } = calculateTotals();

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <Label htmlFor="equipmentCost">Equipment Cost (₹)</Label>
          <Input
            id="equipmentCost"
            type="number"
            value={data.equipmentCost || ""}
            onChange={(e) => onChange({ ...data, equipmentCost: e.target.value })}
            placeholder="35000000"
          />
        </div>

        <div>
          <Label htmlFor="installationCost">Installation Cost (₹)</Label>
          <Input
            id="installationCost"
            type="number"
            value={data.installationCost || ""}
            onChange={(e) => onChange({ ...data, installationCost: e.target.value })}
            placeholder="10000000"
          />
        </div>

        <div>
          <Label htmlFor="tax">Tax Rate (%)</Label>
          <Input
            id="tax"
            type="number"
            value={data.tax || ""}
            onChange={(e) => onChange({ ...data, tax: e.target.value })}
            placeholder="18"
          />
        </div>

        <div>
          <Label htmlFor="warranty">Warranty Period (Years)</Label>
          <Input
            id="warranty"
            type="number"
            value={data.warranty || ""}
            onChange={(e) => onChange({ ...data, warranty: e.target.value })}
            placeholder="25"
          />
        </div>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="space-y-3">
            <div className="flex justify-between text-lg">
              <span>Subtotal:</span>
              <span className="font-medium">₹{subtotal.toLocaleString("en-IN")}</span>
            </div>
            <div className="flex justify-between text-lg">
              <span>Tax ({data.tax || 0}%):</span>
              <span className="font-medium">₹{taxAmount.toLocaleString("en-IN")}</span>
            </div>
            <div className="h-px bg-border" />
            <div className="flex justify-between text-2xl font-bold text-primary">
              <span>Total Cost:</span>
              <span>₹{total.toLocaleString("en-IN")}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div>
        <Label htmlFor="paymentTerms">Payment Terms</Label>
        <div className="grid gap-4 mt-2 md:grid-cols-3">
          <div>
            <Label htmlFor="advance" className="text-sm">Advance (%)</Label>
            <Input
              id="advance"
              type="number"
              value={data.advance || ""}
              onChange={(e) => onChange({ ...data, advance: e.target.value })}
              placeholder="30"
            />
          </div>
          <div>
            <Label htmlFor="onInstallation" className="text-sm">On Installation (%)</Label>
            <Input
              id="onInstallation"
              type="number"
              value={data.onInstallation || ""}
              onChange={(e) => onChange({ ...data, onInstallation: e.target.value })}
              placeholder="40"
            />
          </div>
          <div>
            <Label htmlFor="onCompletion" className="text-sm">On Completion (%)</Label>
            <Input
              id="onCompletion"
              type="number"
              value={data.onCompletion || ""}
              onChange={(e) => onChange({ ...data, onCompletion: e.target.value })}
              placeholder="30"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
