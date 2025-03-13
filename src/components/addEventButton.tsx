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
import { useSWRConfig } from "swr";

export default function addEventButton() {

    const [date, setDate] = useState<Date | undefined>();
    const [title, setTitle] = useState<string>("");
    
    const {mutate} = useSWRConfig();

    const handleAddEvent = async () => {

        const newData = {
            summary: title,
            start:{
                dateTime: date,
            },
            end:{
                dateTime: date
            }
        };

        const response = await fetch("/api/google", 
            {
                method: "POST",
                headers: { 
                    'Content-Type': 'application/json' 
                  },
                body: JSON.stringify(newData)
            },
        ).then((res)=> res.json());

        console.log(response);

        mutate("/api/google");
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
                <Input placeholder="Event title" onChange={(e)=>setTitle(e.target.value)}/>
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
