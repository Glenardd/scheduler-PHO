import { Button } from "./ui/button";
import { object, string } from 'yup';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

import {format} from "date-fns";

import { toast } from "sonner";

import { Calendar } from "./ui/calendar";
import { CalendarIcon } from "lucide-react";
import { Input } from "./ui/input";
import { useSWRConfig } from "swr";

export default function addEventButton() {

    const { mutate } = useSWRConfig();

    let formSchema = object().shape({
        title: string().required("Don't leave empty"),
        eventFrom: string().required("Please select"),
        approved: string().required("Please select from the choices"),
        date_start: string().required("Select starting date please"),
        date_end: string().required("Select ending date please"),
    });

    const form = useForm({
        resolver: yupResolver(formSchema),
        defaultValues: {
            title: "",
            eventFrom: "",
            approved: "",
            date_start: "",
            date_end: "",
        },
    });

    const handleAddEvent = async () => {

        const newData = {
            approved: form.getValues().approved,
            date_start: format(form.getValues().date_start, "yyyy-MM-dd"),
            date_end: format(form.getValues().date_end, "yyyy-MM-dd"),
            event_from: form.getValues().eventFrom,
            event_title: form.getValues().title,
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

        //show alert that the form is submitted successfully
        toast(response?.message);

        form.reset();

        mutate("/api/mongodb");
    };

    const handleOpen = () => {
        form.reset();
    };

    return (
        <>
            <Dialog>
                <DialogTrigger asChild>
                    <Button onClick={handleOpen}>Add new</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>New event</DialogTitle>
                        <DialogDescription>Fill in the required fields to proceed.</DialogDescription>
                    </DialogHeader>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleAddEvent)}>

                            {/* title */}
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => {
                                    return (
                                        <FormItem>
                                            <FormLabel className="mt-4">Title</FormLabel>
                                            <Input placeholder="Enter title" {...field} />
                                            <FormMessage>{form.formState.errors.title?.message}</FormMessage>
                                        </FormItem>
                                    );
                                }}
                            />

                            {/* event from */}
                            <FormField
                                control={form.control}
                                name="eventFrom"
                                render={({ field }) => {
                                    return (
                                        <FormItem>
                                            <FormLabel className="mt-4">Event from</FormLabel>
                                            <Select value={String(field.value)} onValueChange={(value) => field.onChange(value)}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value='DOH'>DOH</SelectItem>
                                                    <SelectItem value='MHO'>MHO</SelectItem>
                                                    <SelectItem value='PHO'>PHO</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage>{form.formState.errors.eventFrom?.message}</FormMessage>
                                        </FormItem>
                                    );
                                }}
                            />

                            {/* date start */}
                            <FormField
                                control={form.control}
                                name="date_start"
                                render={({ field }) => {
                                    return (
                                        <FormItem>
                                            <FormLabel className="mt-4">Date</FormLabel>
                                            <FormControl>
                                                <Popover>
                                                    <PopoverTrigger asChild>
                                                        <Button className="w-full" variant="outline">
                                                            {!form.getValues().date_start ? "Date" : new Date(form.getValues().date_start).toLocaleDateString()}
                                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                        </Button>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-auto p-0" align="end">
                                                        <Calendar
                                                            mode="single"
                                                            initialFocus
                                                            selected={new Date(field.value)}
                                                            onSelect={field.onChange}
                                                        />
                                                    </PopoverContent>
                                                </Popover>
                                            </FormControl>
                                            <FormMessage>{form.formState.errors.date_start?.message}</FormMessage>
                                        </FormItem>
                                    )
                                }}
                            />

                            {/* date end */}
                            <FormField
                                control={form.control}
                                name="date_end"
                                render={({ field }) => {
                                    return (
                                        <FormItem>
                                            <FormLabel className="mt-4">Date</FormLabel>
                                            <FormControl>
                                                <Popover>
                                                    <PopoverTrigger asChild>
                                                        <Button className="w-full" variant="outline">
                                                            {!form.getValues().date_end ? "Date" : new Date(form.getValues().date_end).toLocaleDateString()}
                                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                        </Button>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-auto p-0" align="end">
                                                        <Calendar
                                                            mode="single"
                                                            initialFocus
                                                            selected={new Date(field.value)}
                                                            onSelect={field.onChange}
                                                        />
                                                    </PopoverContent>
                                                </Popover>
                                            </FormControl>
                                            <FormMessage>{form.formState.errors.date_end?.message}</FormMessage>
                                        </FormItem>
                                    )
                                }}
                            />

                            {/* approved */}
                            <FormField
                                control={form.control}
                                name="approved"
                                render={({ field }) => {
                                    return (
                                        <FormItem>
                                            <FormLabel className="mt-4">Approved</FormLabel>
                                            <Select value={field.value} onValueChange={(value) => field.onChange(value)}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value='Yes'>Yes</SelectItem>
                                                    <SelectItem value='No'>No</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage>{form.formState.errors.approved?.message}</FormMessage>
                                        </FormItem>
                                    )
                                }}
                            />
                            <DialogFooter className="mt-4">
                                <Button type="submit">Add</Button>
                            </DialogFooter>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        </>
    );
};
