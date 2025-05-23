import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogClose
} from "@/components/ui/dialog"
import { format } from "date-fns";
import { useState, useEffect } from "react";
import { Button } from "../ui/button";

export default function CalendarDialogBox({ events }: { events: string | any }) {

    const [dialogOpen, setDialogOpen] = useState(false);

    const date = events.date;
    const allEvent = events.events;

    console.log(allEvent);

    useEffect(() => {
        if (allEvent && allEvent.length > 0) {
            setDialogOpen(true);
        };
    }, [events]);

    return (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogContent className="lg:max-w-[800px] sm:max-w-[425px] md: max-w-[800px]">
                <DialogHeader>
                    <DialogTitle>{String(date).toLocaleUpperCase()}</DialogTitle>
                    <DialogDescription>
                        Events for the selected date
                    </DialogDescription>
                </DialogHeader>
                <ul>
                    <div className="font-bold">Program events</div>
                    {
                        allEvent?.map((event: string | any, index: number) => {
                            if(event?.extendedProps.type === "program_events"){
                                return (
                                    <div key={index}>
                                        <div className="flex flex-col gap-2 m-4">
    
                                            {/* title of the event */}
                                            <li>
                                                <div className="text-lg font-bold">{event.title}</div>
                                                <div className="text-sm text-gray-500">{format(new Date(event.startStr), "MMMM dd, yyyy")} - {format(new Date(event.endStr), "MMMM dd, yyyy")}</div>
                                            </li>
                                        </div>
                                    </div>
                                );
                            }
                        })
                    }
                </ul>
                <ul>
                    <div className="font-bold">Holidays</div>
                    {
                        allEvent?.map((event: string | any, index: number) => {
                            if(event?.extendedProps.type === "holiday"){
                                return (
                                    <div key={index}>
                                        <div className="flex flex-col gap-2 m-4">
    
                                            {/* title of the event */}
                                            <li>
                                                <div className="text-lg font-bold">{event.title}</div>
                                                <div className="text-sm text-gray-500">{format(new Date(event.startStr), "MMMM dd, yyyy")} - {format(new Date(event.endStr), "MMMM dd, yyyy")}</div>
                                            </li>
                                        </div>
                                    </div>
                                );
                            }
                        })
                    }
                </ul>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button type="button">Close</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
