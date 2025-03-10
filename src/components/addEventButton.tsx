import { Button } from "./ui/button";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose
} from "@/components/ui/dialog";

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
  
import { Calendar } from "./ui/calendar";
import { CalendarIcon } from "lucide-react";
import { Input } from "./ui/input";

import { useState } from "react";

export default function addEventButton() {

    const [date, setDate] = useState<Date | undefined>(new Date());
    
    const handleAddEvent = () => {
        console.log(date);
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Add new</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>New event</DialogTitle>
                </DialogHeader>
                <Input placeholder="Event title"/>
                <Popover>
                    <PopoverTrigger asChild>
                        <Button variant="outline">
                            {date === undefined || date === null ? "Date" : date.toLocaleDateString()}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" /></Button> 
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="end">
                        <Calendar 
                            mode="single" 
                            initialFocus
                            selected={date}
                            onSelect={setDate}
                        />
                    </PopoverContent>
                </Popover>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button onClick={handleAddEvent}>Add</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
