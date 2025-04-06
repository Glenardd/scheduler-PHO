"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import useSWR from "swr";

import { SignedIn } from "@clerk/nextjs";

import DeleteButton from "./deleteButton";
import EditButton from "./editButton";
import AddEventButton from "./addEventButton";
import ListFilterButton from "./listFilterButton";

import { useState } from "react";

export default function adminShowEvents() {

  const [month, setMonth] = useState<string | undefined>(undefined);
  const [approved, setApprove] = useState<string | undefined>(undefined);
  const [eventFrom, setEventFrom] = useState<string | undefined>(undefined);

  const { data } = useSWR("/api/mongodb", (url) => fetch(url, { method: "GET" }).then((res) => res.json()));

  const event = data?.data;

  const isValidDate = (date: any) => {
    return !isNaN(Date.parse(date));
  };

  // date format
  const dateFormat = (time: any) => {
    if (!isValidDate(time)) return "Invalid date";
    const timeShort = new Date(time);
    const shortTime = new Intl.DateTimeFormat("en-US", { dateStyle: "long" }).format(timeShort);
    return shortTime;
  };

  // console.log(data?.calendar?.items);

  // event?.map((data:any)=> console.log(data?.organizer?.displayName))
  
  const filteredData = event?.filter((item: any) => {
    const itemMonth = !month || dateFormat(item.date_start).includes(month);
    const isApproved = !approved || approved === item.approved; 
    const eventFrom_ = !eventFrom || eventFrom === item.event_from; 

    return itemMonth && isApproved && eventFrom_;
  }) || [];

  return (
    <div className="m-4">
      <SignedIn>
        <div className="flex gap-4">
          <AddEventButton />
          <ListFilterButton 
            setApprove={setApprove} 
            setMonth={setMonth} 
            setEventFrom={setEventFrom}
            
            month_={month} 
            approved={approved} 
            eventFrom={eventFrom}
          />
        </div>
      </SignedIn>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Health Celebrations</TableHead>
            <TableHead>Date start</TableHead>
            <TableHead>Date end</TableHead>
            <TableHead>Event from</TableHead>
            <TableHead>Approved</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            filteredData?.map((event: any) => {

              const eventId = event?._id;
              return (
                <TableRow key={eventId}>
                  <TableCell>{event?.event_title}</TableCell>
                  <TableCell>{dateFormat(event?.date_start)}</TableCell>
                  <TableCell>{dateFormat(event?.date_end)}</TableCell>
                  <TableCell>{event?.event_from}</TableCell>
                  <TableCell>{event?.approved}</TableCell>
                  <SignedIn>
                    <TableCell><EditButton eventId={eventId} /></TableCell>
                    <TableCell><DeleteButton eventId={eventId} /></TableCell>
                  </SignedIn>
                </TableRow>
              );
            }).reverse()
          }
        </TableBody>
      </Table>
    </div>
  );
}
