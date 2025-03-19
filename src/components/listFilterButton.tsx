import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "./ui/button";

export default function listFilterButton({ setApprove, setMonth, month_, approved }: any) {

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const handleClearFilter = () =>{
    setApprove(undefined);
    setMonth(undefined);
  };

  return (
    <div className="w-[10%] flex gap-4">
      <Select value={month_ ||""} onValueChange={(val) => setMonth(val)}>
        <SelectTrigger>
          <SelectValue placeholder="Month" />
        </SelectTrigger>
        <SelectContent>
          {
            months.map((month) => {
              return <SelectItem key={month} value={month}>{month}</SelectItem>
            })
          }
        </SelectContent>
      </Select>
      <Select value={approved || ""} onValueChange={(val) => setApprove(val)}>
        <SelectTrigger>
          <SelectValue placeholder="Approved" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="true">true</SelectItem>
          <SelectItem value="false">false</SelectItem>
        </SelectContent>
      </Select>
      {(month_ !== undefined  || approved !== undefined) && <Button variant="ghost" onClick={handleClearFilter}>Clear</Button>}
    </div>
  );
};
