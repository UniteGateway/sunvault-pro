import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface BOQItem {
  id: string;
  description: string;
  quantity: number;
  unit: string;
  rate: number;
  amount: number;
}

interface ProposalBOQProps {
  data: any;
  onChange: (data: any) => void;
}

export function ProposalBOQ({ data, onChange }: ProposalBOQProps) {
  const [items, setItems] = useState<BOQItem[]>(data.boqItems || [
    { id: "1", description: "Solar Panels (540W)", quantity: 1000, unit: "Nos", rate: 15000, amount: 15000000 },
    { id: "2", description: "Solar Inverter", quantity: 10, unit: "Nos", rate: 250000, amount: 2500000 },
    { id: "3", description: "Mounting Structure", quantity: 1, unit: "Lot", rate: 5000000, amount: 5000000 },
  ]);

  const addItem = () => {
    const newItem: BOQItem = {
      id: Date.now().toString(),
      description: "",
      quantity: 0,
      unit: "Nos",
      rate: 0,
      amount: 0,
    };
    const updatedItems = [...items, newItem];
    setItems(updatedItems);
    onChange({ ...data, boqItems: updatedItems });
  };

  const removeItem = (id: string) => {
    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems);
    onChange({ ...data, boqItems: updatedItems });
  };

  const updateItem = (id: string, field: keyof BOQItem, value: any) => {
    const updatedItems = items.map((item) => {
      if (item.id === id) {
        const updated = { ...item, [field]: value };
        if (field === "quantity" || field === "rate") {
          updated.amount = updated.quantity * updated.rate;
        }
        return updated;
      }
      return item;
    });
    setItems(updatedItems);
    onChange({ ...data, boqItems: updatedItems });
  };

  const totalAmount = items.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Label className="text-lg font-semibold">Bill of Quantities</Label>
        <Button onClick={addItem} size="sm">
          <Plus className="mr-2 h-4 w-4" />
          Add Item
        </Button>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[40%]">Description</TableHead>
              <TableHead className="w-[15%]">Quantity</TableHead>
              <TableHead className="w-[10%]">Unit</TableHead>
              <TableHead className="w-[15%]">Rate (₹)</TableHead>
              <TableHead className="w-[15%]">Amount (₹)</TableHead>
              <TableHead className="w-[5%]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <Input
                    value={item.description}
                    onChange={(e) => updateItem(item.id, "description", e.target.value)}
                    placeholder="Item description"
                  />
                </TableCell>
                <TableCell>
                  <Input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => updateItem(item.id, "quantity", parseFloat(e.target.value) || 0)}
                  />
                </TableCell>
                <TableCell>
                  <Input
                    value={item.unit}
                    onChange={(e) => updateItem(item.id, "unit", e.target.value)}
                  />
                </TableCell>
                <TableCell>
                  <Input
                    type="number"
                    value={item.rate}
                    onChange={(e) => updateItem(item.id, "rate", parseFloat(e.target.value) || 0)}
                  />
                </TableCell>
                <TableCell className="font-medium">
                  {item.amount.toLocaleString("en-IN")}
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeItem(item.id)}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            <TableRow className="font-bold bg-muted">
              <TableCell colSpan={4} className="text-right">Total Amount:</TableCell>
              <TableCell>₹{totalAmount.toLocaleString("en-IN")}</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
