import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface ProposalTermsProps {
  data: any;
  onChange: (data: any) => void;
}

export function ProposalTerms({ data, onChange }: ProposalTermsProps) {
  const defaultTerms = `1. SCOPE OF WORK
   - Supply and installation of solar PV system as per specifications
   - Complete electrical and civil work
   - Net metering setup and grid connectivity
   - System testing and commissioning

2. PAYMENT TERMS
   - 30% advance payment on order confirmation
   - 40% on completion of installation
   - 30% on successful commissioning

3. WARRANTY
   - 25 years performance warranty on solar panels
   - 5 years comprehensive warranty on inverters
   - 10 years warranty on mounting structure

4. EXCLUSIONS
   - Roof strengthening if required
   - Additional electrical panel upgrades beyond scope
   - Government fees and permissions

5. FORCE MAJEURE
   - Neither party shall be liable for delays due to circumstances beyond control

6. GOVERNING LAW
   - This agreement shall be governed by the laws of India`;

  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="terms">Terms and Conditions</Label>
        <Textarea
          id="terms"
          value={data.terms || defaultTerms}
          onChange={(e) => onChange({ ...data, terms: e.target.value })}
          rows={20}
          className="font-mono text-sm"
        />
      </div>

      <div>
        <Label htmlFor="notes">Additional Notes</Label>
        <Textarea
          id="notes"
          value={data.notes || ""}
          onChange={(e) => onChange({ ...data, notes: e.target.value })}
          placeholder="Any additional notes or special conditions..."
          rows={4}
        />
      </div>
    </div>
  );
}
