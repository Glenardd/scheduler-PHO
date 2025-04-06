import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "./ui/button";
import { set } from "date-fns";

export default function listFilterButton({ setApprove, setMonth, setEventFrom, eventFrom, month_, approved }: any) {

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const eventsFrom = ["DOH", "MHO", "PHO"]

  const handleClearFilter = () =>{
    setApprove(undefined);
    setMonth(undefined);
    setEventFrom(undefined);
  };

  return (
    <div className="w-[40%] flex gap-4">
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
      <Select value={eventFrom || ""} onValueChange={(val) => setEventFrom(val)}>
        <SelectTrigger>
          <SelectValue placeholder="Event from" />
        </SelectTrigger>
        <SelectContent>
          {
            eventsFrom.map((event) => {
              return <SelectItem key={event} value={event}>{event}</SelectItem>
            })
          }
        </SelectContent>
      </Select>
      {(month_ !== undefined  || approved !== undefined || eventFrom !== undefined) && <Button variant="ghost" onClick={handleClearFilter}>Clear</Button>}
    </div>
  );
};
