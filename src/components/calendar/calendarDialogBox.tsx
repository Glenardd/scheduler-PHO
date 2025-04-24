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

export default function calendarDialogBox({ events }: { events: string | any }) {
    
    const [dialogOpen, setDialogOpen] = useState(false);
    console.log(events);

    useEffect(() => {
        if (events && events.length > 0) {
            setDialogOpen(true);
        };
    }, [events]);

    return (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogContent className="lg:max-w-[800px] sm:max-w-[425px] md: max-w-[800px]">
                <DialogHeader>
                    <DialogTitle>Events</DialogTitle>
                    <DialogDescription>
                        Make changes to your profile here. Click save when you're done.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button type="button">Close</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
