import { Button } from './ui/button';

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

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from 'react';

import useSWR, { useSWRConfig } from "swr";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectLabel
} from "@/components/ui/select"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Calendar } from "./ui/calendar";
import { CalendarIcon } from "lucide-react";

export default function editButton({ eventId }: any) {

  const { mutate } = useSWRConfig();

  const { data } = useSWR(`/api/mongodb?id=${eventId}`, (url) => fetch(url, { method: "GET" }).then((res) => res.json()));

  const event = data?.data[0];
  const title = event?.event_title;
  const date = event?.date;
  const approved = event?.approved;
  const eventFrom = event?.event_from;

  const [inputTitle, setInputTitle] = useState<string>(title);
  const [inputDate, setInputDate] = useState<Date>(date);
  const [isApproved, setIsApproved] = useState<any>(approved);
  const [eventfrom, setEventFrom] = useState<string>(eventFrom);

  //whenever this is clicked it will revert the input values to original
  const handleEdit = () => {
    setInputTitle(title);
    setInputDate(date);
    setInputTitle(title);
    setIsApproved(approved);
    setEventFrom(eventFrom);
  };

  const handleSubmit = async () => {

    const newData = {
      "approved": `${isApproved}`,
      "date": `${inputDate}`,
      "event_from": `${eventFrom}`,
      "event_title": `${inputTitle}`
    };

    const response = await fetch(`/api/mongodb?id=${eventId}`, 
      {
        method:"PATCH", 
        headers: { 
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify(newData),
      }).then((res)=> res.json());

    console.log(response);

    mutate("api/google");
  };

  const eventTitle = () => {
    return (
      <>
        <Label>Title</Label>
        <Input type='text' value={inputTitle ?? ""} onChange={(e) => setInputTitle(e.target.value)} placeholder='title' />
      </>
    );
  };

  const is_Approved = () => {
    return (
      <>
        <Label>Approved?</Label>
        <Select value={isApproved} onValueChange={(val) => setIsApproved(val)}>
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

  const event_from = () => {
    return (
      <>
        <Label>Event from</Label>
        {/* <Input type='text' value={eventfrom} onChange={(e) => setEventFrom(e.target.value)} placeholder='Event from' /> */}
        <Select value={eventfrom} onValueChange={(val)=> setEventFrom(val)}>
          <SelectTrigger>
            <SelectValue placeholder="Select" /><></>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='DOH'>DOH</SelectItem>
            <SelectItem value='PHO'>PHO</SelectItem>
          </SelectContent>
        </Select>
      </>
    );
  };

  const _date = () => {
    return (
      <>
        <Label>Date</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">
              {inputDate ? new Date(inputDate).toLocaleDateString() : "Date"}
              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="end">
            <Calendar
              mode="single"
              initialFocus
              selected={new Date(inputDate)}
              onSelect={(day) => setInputDate(day ?? new Date())}
            />
          </PopoverContent>
        </Popover>
      </>
    );
  };

  return (
    <Dialog aria-describedby="dialog-description">
      <DialogTrigger asChild>
        <Button onClick={handleEdit}>Edit</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit event</DialogTitle>
          <DialogDescription>
            Make changes to your event here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className='flex flex-col gap-4'>
          {eventTitle()}
          {event_from()}
          {_date()}
          {is_Approved()}
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button onClick={handleSubmit}>
              Save
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
