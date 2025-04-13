import { Button } from './ui/button';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";

import useSWR, { useSWRConfig } from "swr";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { object, string } from 'yup';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { Calendar } from "./ui/calendar";
import { CalendarIcon } from "lucide-react";
import { toast } from 'sonner';
import { useEffect } from 'react';

export default function editButton({ eventId }: any) {

  const { mutate } = useSWRConfig();

  const { data } = useSWR(`/api/mongodb?id=${eventId}`, (url) => fetch(url, { method: "GET" }).then((res) => res.json()));

  const event = data?.data[0];
  const title = event?.event_title;
  const date_start = event?.date_start;
  const date_end = event?.date_end;
  const approved = event?.approved;
  const eventFrom = event?.event_from;

  let formSchema = object().shape({
    title: string().required("Don't leave empty"),
    eventFrom: string().required("Please select"),
    approved: string().required("Please select from the choices"),
    date_start: string().required("Select starting date please"),
    date_end: string().required("Select ending date please")
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

  useEffect(() => {
    if (event) {
      form.reset({
        title: title,
        eventFrom: eventFrom,
        approved: approved,
        date_start: date_start,
        date_end: date_end,
      });
    }
  }, [event, form, title, eventFrom, approved, date_start, date_end]);

  const handleSubmit = async () => {

    const newData = {
      "approved": `${form.getValues().approved}`,
      "date_start": `${form.getValues().date_start}`,
      "date_end": `${form.getValues().date_end}`,
      "event_from": `${form.getValues().eventFrom}`,
      "event_title": `${form.getValues().title}`,
    };

    const response = await fetch(`/api/mongodb?id=${eventId}`,
      {
        method: "PATCH",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newData),
      }).then((res) => res.json());

    toast(response?.message);

    console.log(form.getValues());

    mutate("/api/mongodb");
  };

  return (
    <Dialog aria-describedby="dialog-description">
      <DialogTrigger asChild>
        <Button>Edit</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit event</DialogTitle>
          <DialogDescription>
            Make changes to your event here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className='flex flex-col gap-4'>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>

              {/* title */}
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel className="mt-4">Title</FormLabel>
                      <Input placeholder="Enter title" {...field} />
                      <FormMessage>{typeof form.formState.errors.title?.message === 'string' ? form.formState.errors.title.message : ''}</FormMessage>
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
                      <FormMessage>{typeof form.formState.errors.eventFrom?.message === 'string' ? form.formState.errors.eventFrom.message : ''}</FormMessage>
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
                      <FormLabel className="mt-4">Date start</FormLabel>
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
                      <FormMessage>
                        {typeof form.formState.errors.date_start?.message === 'string' ? form.formState.errors.date_start.message : ''}
                      </FormMessage>
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
                      <FormLabel className="mt-4">Date end</FormLabel>
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
                      <FormMessage>
                        {typeof form.formState.errors.date_end?.message === 'string' ? form.formState.errors.date_end.message : ''}
                      </FormMessage>
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
                          <SelectItem value='true'>True</SelectItem>
                          <SelectItem value='false'>False</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage>{typeof form.formState.errors.approved?.message === 'string' ? form.formState.errors.approved.message : ''}</FormMessage>
                    </FormItem>
                  )
                }}
              />

              <DialogFooter className="mt-4">
                <Button type='submit'>
                  Update
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
