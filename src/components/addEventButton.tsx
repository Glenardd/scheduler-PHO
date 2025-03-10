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
  

import { CalendarIcon } from "lucide-react";
import { Input } from "./ui/input";

export default function addEventButton() {

    const handleAddEvent = () => {
        console.log("event added");
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
                        <Button variant="outline">Date<CalendarIcon className="ml-auto h-4 w-4 opacity-50" /></Button> 
                    </PopoverTrigger>
                    <PopoverContent>Place content for the popover here.</PopoverContent>
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
