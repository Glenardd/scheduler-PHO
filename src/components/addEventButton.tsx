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
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    SelectLabel
} from "@/components/ui/select"

import { Label } from "@/components/ui/label"

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
    const [title, setTitle] = useState<string | undefined>();
    const [eventFrom, setEventFrom] = useState<string | undefined>();
    const [approved, setApproved] = useState<any>()

    const { mutate } = useSWRConfig();

    const handleAddEvent = async () => {

        const newData = {
            approved: approved,
            date: date,
            event_from: eventFrom,
            event_title: title,
        };

        const response = await fetch("/api/mongodb",
            {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newData)
            },
        ).then((res) => res.json());

        console.log(response);

        mutate("/api/google");
    };

    const calendarPopover = () => {
        return (
            <>  
                <Label>Date</Label>
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
            </>
        );
    };

    const event_from = () => {
        return (
            <>
                <Label>Event from</Label>
                <Select value={eventFrom} onValueChange={(val) => setEventFrom(val)}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value='DOH'>DOH</SelectItem>
                        <SelectItem value='PHO'>PHO</SelectItem>
                    </SelectContent>
                </Select>
            </>
        );
    };

    const isApproved = () => {
        return (
          <>
            <Label>Approved?</Label>
            <Select value={approved} onValueChange={(val: string) => setApproved(val)}>
              <SelectTrigger>
                <SelectValue placeholder="Select"/>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='true'>True</SelectItem>
                <SelectItem value='false'>False</SelectItem>
              </SelectContent>
            </Select>
          </>
        );
    };

    const eventTitle = () =>{
        return (
            <>
                <Label>Title</Label>
                <Input placeholder="Event title" onChange={(e) => setTitle(e.target.value)} />
            </>
        );
    };

    const handleOpen = () => {
        setApproved(undefined);
        setTitle(undefined);
        setDate(undefined);
        setEventFrom(undefined);
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button onClick={handleOpen}>Add new</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>New event</DialogTitle>
                </DialogHeader>
                {eventTitle()}
                {event_from()}
                {calendarPopover()}
                {isApproved()}
                <DialogFooter>
                    <DialogClose asChild>
                        <Button onClick={handleAddEvent}>Add</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
